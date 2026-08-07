const crypto = require('node:crypto');
const express = require('express');
const request = require('supertest');

const authRouter = require('../../backend/routes/auth');
const authService = require('../../backend/services/auth-service');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRouter);
  return app;
}

const app = createApp();
let credentials;

describe('Rutas de autenticación', () => {
  beforeEach(() => {
    authService.resetSessions();
    jest.restoreAllMocks();
    credentials = {
      email: `qa-${crypto.randomUUID()}@example.invalid`,
      password: crypto.randomBytes(32).toString('base64url'),
    };
    process.env.QA_ADMIN_EMAIL = credentials.email;
    process.env.QA_ADMIN_PASSWORD = credentials.password;
  });

  afterAll(() => {
    delete process.env.QA_ADMIN_EMAIL;
    delete process.env.QA_ADMIN_PASSWORD;
  });

  test('debe responder 400 cuando falta el correo', async () => {
    const response = await request(app).post('/api/auth/login').send({ password: credentials.password });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('obligatorios');
  });

  test('debe responder 400 cuando falta la contraseña', async () => {
    const response = await request(app).post('/api/auth/login').send({ email: credentials.email });

    expect(response.status).toBe(400);
  });

  test('debe rechazar un correo que no corresponde a la cuenta autorizada', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'atacante@example.com',
      password: credentials.password,
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Credenciales inválidas');
  });

  test('debe rechazar una contraseña incorrecta', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: credentials.email,
      password: crypto.randomBytes(24).toString('hex'),
    });

    expect(response.status).toBe(401);
  });

  test('debe rechazar el acceso cuando el servidor no tiene credenciales configuradas', async () => {
    delete process.env.QA_ADMIN_EMAIL;
    delete process.env.QA_ADMIN_PASSWORD;

    const response = await request(app).post('/api/auth/login').send(credentials);

    expect(response.status).toBe(401);
  });

  test('debe iniciar sesión con credenciales válidas y devolver un token', async () => {
    const generatedToken = crypto.randomUUID();
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(generatedToken);

    const response = await request(app).post('/api/auth/login').send(credentials);

    expect(response.status).toBe(200);
    expect(response.body.token).toBe(generatedToken);
    expect(response.body.user.role).toBe('bibliotecario');
  });

  test('debe reconocer una sesión válida mediante Bearer token', async () => {
    const login = await request(app).post('/api/auth/login').send(credentials);

    const response = await request(app)
      .get('/api/auth/session')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.authenticated).toBe(true);
  });

  test('debe rechazar una sesión sin token', async () => {
    const response = await request(app).get('/api/auth/session');

    expect(response.status).toBe(401);
  });

  test('debe invalidar el token al cerrar sesión', async () => {
    const login = await request(app).post('/api/auth/login').send(credentials);

    const logout = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${login.body.token}`);
    const session = await request(app)
      .get('/api/auth/session')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(logout.status).toBe(204);
    expect(session.status).toBe(401);
  });

  test('debe permitir un cierre de sesión idempotente sin token', async () => {
    const response = await request(app).post('/api/auth/logout');

    expect(response.status).toBe(204);
  });
});

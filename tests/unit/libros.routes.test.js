const express = require('express');
const request = require('supertest');

jest.mock('../../backend/database/db', () => ({
  prepare: jest.fn(),
}));

const db = require('../../backend/database/db');
const librosRouter = require('../../backend/routes/libros');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/libros', librosRouter);
  return app;
}

const app = createApp();

describe('Rutas de libros', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/libros', () => {
    test('debe devolver todos los libros ordenados por título', async () => {
      const rows = [{ id_libro: 1, titulo: '1984' }, { id_libro: 2, titulo: 'Clean Code' }];
      db.prepare.mockReturnValue({ all: jest.fn().mockReturnValue(rows) });

      const response = await request(app).get('/api/libros');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
      expect(db.prepare.mock.calls[0][0]).toContain('ORDER BY l.titulo ASC');
    });

    test('debe devolver un arreglo vacío cuando no hay resultados', async () => {
      db.prepare.mockReturnValue({ all: jest.fn().mockReturnValue([]) });

      const response = await request(app).get('/api/libros?q=inexistente');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test('debe buscar por título, autor o ISBN con un único término', async () => {
      const all = jest.fn().mockReturnValue([]);
      db.prepare.mockReturnValue({ all });

      await request(app).get('/api/libros?q=Clean');

      expect(db.prepare.mock.calls[0][0]).toContain('l.titulo LIKE ?');
      expect(all).toHaveBeenCalledWith('%Clean%', '%Clean%', '%Clean%');
    });

    test('debe filtrar los libros por categoría', async () => {
      const all = jest.fn().mockReturnValue([{ categoria_nombre: 'Novela' }]);
      db.prepare.mockReturnValue({ all });

      const response = await request(app).get('/api/libros?categoria=Novela');

      expect(response.status).toBe(200);
      expect(db.prepare.mock.calls[0][0]).toContain('c.nombre = ?');
      expect(all).toHaveBeenCalledWith('Novela');
    });

    test('debe filtrar únicamente libros con ejemplares disponibles', async () => {
      db.prepare.mockReturnValue({ all: jest.fn().mockReturnValue([]) });

      await request(app).get('/api/libros?disponibles=true');

      expect(db.prepare.mock.calls[0][0]).toContain('l.ejemplares_disponibles > 0');
    });

    test('debe ignorar el filtro disponibles cuando su valor es false', async () => {
      db.prepare.mockReturnValue({ all: jest.fn().mockReturnValue([]) });

      await request(app).get('/api/libros?disponibles=false');

      expect(db.prepare.mock.calls[0][0]).not.toContain('l.ejemplares_disponibles > 0');
    });

    test('debe combinar búsqueda y categoría sin alterar el orden de parámetros', async () => {
      const all = jest.fn().mockReturnValue([]);
      db.prepare.mockReturnValue({ all });

      await request(app).get('/api/libros?q=Gabriel&categoria=Novela');

      expect(all).toHaveBeenCalledWith('%Gabriel%', '%Gabriel%', '%Gabriel%', 'Novela');
    });
  });

  describe('GET /api/libros/:id', () => {
    test('debe devolver el detalle del libro solicitado', async () => {
      db.prepare.mockReturnValue({ get: jest.fn().mockReturnValue({ id_libro: 7, titulo: 'Dune' }) });

      const response = await request(app).get('/api/libros/7');

      expect(response.status).toBe(200);
      expect(response.body.titulo).toBe('Dune');
    });

    test('debe responder 404 cuando el libro solicitado no existe', async () => {
      db.prepare.mockReturnValue({ get: jest.fn().mockReturnValue(undefined) });

      const response = await request(app).get('/api/libros/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Libro no encontrado');
    });
  });

  describe('POST /api/libros', () => {
    function mockSuccessfulInsert(book = { id_libro: 1, titulo: 'Dune', autor: 'Frank Herbert' }) {
      const run = jest.fn().mockReturnValue({ lastInsertRowid: book.id_libro });
      db.prepare
        .mockReturnValueOnce({ run })
        .mockReturnValueOnce({ get: jest.fn().mockReturnValue(book) });
      return run;
    }

    test('debe crear un libro válido y responder 201', async () => {
      mockSuccessfulInsert();

      const response = await request(app).post('/api/libros').send({
        titulo: 'Dune',
        autor: 'Frank Herbert',
        isbn: '9780441172719',
        ejemplares_totales: 3,
      });

      expect(response.status).toBe(201);
      expect(response.body.titulo).toBe('Dune');
    });

    test('debe rechazar la creación cuando falta el título', async () => {
      const response = await request(app).post('/api/libros').send({ autor: 'Autor' });

      expect(response.status).toBe(400);
      expect(db.prepare).not.toHaveBeenCalled();
    });

    test('debe rechazar la creación cuando falta el autor', async () => {
      const response = await request(app).post('/api/libros').send({ titulo: 'Libro' });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('autor');
    });

    test('debe rechazar un título vacío como caso límite', async () => {
      const response = await request(app).post('/api/libros').send({ titulo: '', autor: 'Autor' });

      expect(response.status).toBe(400);
    });

    test('debe asignar un ejemplar cuando no se indica la cantidad', async () => {
      const run = mockSuccessfulInsert({ id_libro: 2, titulo: 'Libro', autor: 'Autor' });

      await request(app).post('/api/libros').send({ titulo: 'Libro', autor: 'Autor' });

      expect(run).toHaveBeenCalledWith('Libro', 'Autor', null, null, null, null, null, 1, 1);
    });

    test('debe sustituir por un ejemplar una cantidad igual a cero', async () => {
      const run = mockSuccessfulInsert({ id_libro: 3, titulo: 'Libro', autor: 'Autor' });

      await request(app).post('/api/libros').send({
        titulo: 'Libro', autor: 'Autor', ejemplares_totales: 0,
      });

      expect(run.mock.calls[0].slice(-2)).toEqual([1, 1]);
    });

    test('debe respetar una cantidad positiva entera de ejemplares', async () => {
      const run = mockSuccessfulInsert({ id_libro: 4, titulo: 'Libro', autor: 'Autor' });

      await request(app).post('/api/libros').send({
        titulo: 'Libro', autor: 'Autor', ejemplares_totales: 8,
      });

      expect(run.mock.calls[0].slice(-2)).toEqual([8, 8]);
    });

    test('debe guardar ISBN nulo cuando el campo llega vacío', async () => {
      const run = mockSuccessfulInsert({ id_libro: 5, titulo: 'Libro', autor: 'Autor', isbn: null });

      await request(app).post('/api/libros').send({ titulo: 'Libro', autor: 'Autor', isbn: '' });

      expect(run.mock.calls[0][2]).toBeNull();
    });

    test('debe responder 409 cuando el ISBN ya está registrado', async () => {
      db.prepare.mockReturnValue({
        run: jest.fn(() => { throw new Error('UNIQUE constraint failed: libros.isbn'); }),
      });

      const response = await request(app).post('/api/libros').send({
        titulo: 'Libro', autor: 'Autor', isbn: '123',
      });

      expect(response.status).toBe(409);
      expect(response.body.error).toContain('ISBN');
    });

    test('debe responder 500 ante un error inesperado de base de datos', async () => {
      db.prepare.mockReturnValue({
        run: jest.fn(() => { throw new Error('Database offline'); }),
      });

      const response = await request(app).post('/api/libros').send({ titulo: 'Libro', autor: 'Autor' });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Error al crear el libro');
    });
  });

  describe('PUT /api/libros/:id', () => {
    const original = {
      id_libro: 3,
      titulo: 'Original',
      autor: 'Autor',
      isbn: 'ABC',
      anio_publicacion: 2020,
      id_categoria: 1,
      sinopsis: 'Texto',
      portada_url: null,
      ejemplares_totales: 4,
    };

    function mockUpdate(updated = original) {
      const run = jest.fn();
      db.prepare
        .mockReturnValueOnce({ get: jest.fn().mockReturnValue(original) })
        .mockReturnValueOnce({ run })
        .mockReturnValueOnce({ get: jest.fn().mockReturnValue(updated) });
      return run;
    }

    test('debe actualizar un libro existente', async () => {
      mockUpdate({ ...original, titulo: 'Actualizado' });

      const response = await request(app).put('/api/libros/3').send({ titulo: 'Actualizado' });

      expect(response.status).toBe(200);
      expect(response.body.titulo).toBe('Actualizado');
    });

    test('debe responder 404 cuando se intenta actualizar un libro inexistente', async () => {
      db.prepare.mockReturnValue({ get: jest.fn().mockReturnValue(undefined) });

      const response = await request(app).put('/api/libros/404').send({ titulo: 'Nuevo' });

      expect(response.status).toBe(404);
    });

    test('debe conservar los datos que no fueron enviados', async () => {
      const run = mockUpdate(original);

      await request(app).put('/api/libros/3').send({ titulo: 'Original' });

      expect(run.mock.calls[0][1]).toBe('Autor');
      expect(run.mock.calls[0][2]).toBe('ABC');
    });

    test('debe enviar el identificador de la ruta al UPDATE', async () => {
      const run = mockUpdate(original);

      await request(app).put('/api/libros/3').send({ autor: 'Nuevo autor' });

      expect(run.mock.calls[0].at(-1)).toBe('3');
    });
  });

  describe('DELETE /api/libros/:id', () => {
    test('debe eliminar un libro existente y responder 204', async () => {
      db.prepare.mockReturnValue({ run: jest.fn().mockReturnValue({ changes: 1 }) });

      const response = await request(app).delete('/api/libros/1');

      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });

    test('debe responder 404 cuando el libro a eliminar no existe', async () => {
      db.prepare.mockReturnValue({ run: jest.fn().mockReturnValue({ changes: 0 }) });

      const response = await request(app).delete('/api/libros/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Libro no encontrado');
    });

    test('debe enviar el identificador correcto a la base de datos', async () => {
      const run = jest.fn().mockReturnValue({ changes: 1 });
      db.prepare.mockReturnValue({ run });

      await request(app).delete('/api/libros/25');

      expect(run).toHaveBeenCalledWith('25');
    });
  });
});

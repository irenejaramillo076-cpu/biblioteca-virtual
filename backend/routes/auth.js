const express = require('express');
const authService = require('../services/auth-service');

const router = express.Router();

function bearerToken(req) {
  const header = req.get('authorization') || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
}

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  const token = authService.authenticate(email, password);
  if (!token) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  return res.json({
    token,
    user: { email, role: 'bibliotecario' },
  });
});

router.get('/session', (req, res) => {
  if (!authService.isValidToken(bearerToken(req))) {
    return res.status(401).json({ error: 'Sesión inválida o expirada' });
  }

  return res.json({ authenticated: true });
});

router.post('/logout', (req, res) => {
  authService.revokeToken(bearerToken(req));
  return res.status(204).send();
});

module.exports = router;

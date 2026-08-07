const crypto = require('node:crypto');

const activeTokens = new Set();

function secureEquals(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function authenticate(email, password) {
  const expectedEmail = process.env.QA_ADMIN_EMAIL;
  const expectedPassword = process.env.QA_ADMIN_PASSWORD;

  if (!expectedEmail || !expectedPassword) {
    return null;
  }

  if (!secureEquals(email, expectedEmail) || !secureEquals(password, expectedPassword)) {
    return null;
  }

  const token = crypto.randomUUID();
  activeTokens.add(token);
  return token;
}

function isValidToken(token) {
  return Boolean(token && activeTokens.has(token));
}

function revokeToken(token) {
  if (!token) return false;
  return activeTokens.delete(token);
}

function resetSessions() {
  activeTokens.clear();
}

module.exports = {
  authenticate,
  isValidToken,
  revokeToken,
  resetSessions,
};

const crypto = require('node:crypto');
const path = require('node:path');
const { defineConfig } = require('@playwright/test');

const repositoryRoot = path.resolve(__dirname, '../..');

const e2eEmail =
  process.env.QA_ADMIN_EMAIL ||
  `qa-ai-${crypto.randomUUID()}@example.invalid`;

const e2ePassword =
  process.env.QA_ADMIN_PASSWORD ||
  crypto.randomBytes(32).toString('base64url');

process.env.QA_ADMIN_EMAIL = e2eEmail;
process.env.QA_ADMIN_PASSWORD = e2ePassword;

module.exports = defineConfig({
  testDir: __dirname,
  testMatch: '**/*.spec.js',

  fullyParallel: false,
  workers: 1,
  retries: 0,

  timeout: 30_000,
  expect: {
    timeout: 7_000,
  },

  outputDir: path.join(
    repositoryRoot,
    'reports',
    'ai-test-results'
  ),

  use: {
    baseURL: 'http://127.0.0.1:3000',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: path.join(
          repositoryRoot,
          'reports',
          'ai-playwright-report'
        ),
        open: 'never',
      },
    ],
  ],

  webServer: {
    command: 'node backend/server.js',
    url: 'http://127.0.0.1:3000/api/salud',
    cwd: repositoryRoot,

    env: {
      ...process.env,
      QA_ADMIN_EMAIL: e2eEmail,
      QA_ADMIN_PASSWORD: e2ePassword,
    },

    reuseExistingServer: true,
    timeout: 60_000,
  },
});
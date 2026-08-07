const crypto = require('node:crypto');
const path = require('node:path');
const { defineConfig } = require('@playwright/test');

const repositoryRoot = path.resolve(__dirname, '../..');
const customChromium = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const e2eEmail = process.env.QA_ADMIN_EMAIL || `qa-${crypto.randomUUID()}@example.invalid`;
const e2ePassword = process.env.QA_ADMIN_PASSWORD || crypto.randomBytes(32).toString('base64url');

process.env.QA_ADMIN_EMAIL = e2eEmail;
process.env.QA_ADMIN_PASSWORD = e2ePassword;

module.exports = defineConfig({
  testDir: __dirname,
  testMatch: '**/*.spec.js',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  outputDir: path.join(repositoryRoot, 'reports/test-results'),
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000',
    headless: customChromium ? false : true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: customChromium ? 'off' : 'retain-on-failure',
    launchOptions: customChromium
      ? {
          executablePath: customChromium,
          args: [
            '--single-process',
            '--no-zygote',
            "--headless='shell'",
            '--disable-setuid-sandbox',
            '--no-sandbox',
          ],
        }
      : undefined,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join(repositoryRoot, 'reports/playwright-report'), open: 'never' }],
    ['allure-playwright', { resultsDir: path.join(repositoryRoot, 'reports/allure-results') }],
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
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});

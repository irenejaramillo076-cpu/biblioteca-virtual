const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const LoginPage = require('./pages/LoginPage');

test('la vista principal no presenta violaciones Axe serias o críticas', async ({ page }) => {
  await new LoginPage(page).loginAsValidUser();

  const results = await new AxeBuilder({ page }).analyze();
  const blockingViolations = results.violations.filter(({ impact }) =>
    impact === 'serious' || impact === 'critical');

  expect(blockingViolations).toEqual([]);
});

const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const LoginPage = require('./pages/LoginPage');

test('la vista principal no presenta violaciones Axe serias o críticas', async ({ page }) => {
  await new LoginPage(page).loginAsValidUser();

  const activeView = page.locator('.view.active');
  await activeView.waitFor({ state: 'visible' });

  await activeView.evaluate(async (element) => {
    await Promise.all(
      element.getAnimations().map((animation) => animation.finished)
    );
  });

  const results = await new AxeBuilder({ page }).analyze();

  const blockingViolations = results.violations.filter(
    ({ impact }) => impact === 'serious' || impact === 'critical'
  );

  expect(blockingViolations).toEqual([]);
});
const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;

    this.panelTab = page.getByRole('button', {
      name: 'Panel',
    });

    this.panelView = page.locator('#view-panel');

    this.heading = this.panelView.getByRole('heading', {
      name: 'Panel general',
    });

    this.statsGrid = this.panelView.locator('#stat-grid');
  }

  async open() {
    await this.page.goto('/');

    await this.panelTab.click();

    await expect(this.panelView).toBeVisible();
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.statsGrid).toBeVisible();
  }

  async expectStatisticsLoaded() {
    await expect(
      this.statsGrid.locator(':scope > *').first()
    ).toBeVisible();
  }
}

module.exports = DashboardPage;
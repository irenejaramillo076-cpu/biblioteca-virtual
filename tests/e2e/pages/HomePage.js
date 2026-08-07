const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.catalogTab = page.getByRole('button', { name: 'Catálogo' });
    this.loansTab = page.getByRole('button', { name: 'Préstamos' });
    this.readersTab = page.getByRole('button', { name: 'Lectores' });
    this.dashboardTab = page.getByRole('button', { name: 'Panel' });
    this.catalogTitle = page.getByRole('heading', { name: 'El catálogo' });
  }

  async open() {
    await this.page.goto('/');
    await this.expectCatalogLoaded();
  }

  async expectCatalogLoaded() {
    await expect(this.catalogTitle).toBeVisible();
  }

  async goToCatalog() {
    await this.catalogTab.click();
  }

  async goToLoans() {
    await this.loansTab.click();
  }

  async goToReaders() {
    await this.readersTab.click();
  }

  async goToDashboard() {
    await this.dashboardTab.click();
  }
}

module.exports = HomePage;

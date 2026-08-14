const { expect } = require('@playwright/test');

class CatalogSearchPage {
  constructor(page) {
    this.page = page;

    this.catalogTab = page.getByRole('button', {
      name: 'Catálogo',
    });

    this.searchInput = page.getByPlaceholder(
      'Buscar por título, autor o ISBN…'
    );

    this.categoryFilter = page.getByLabel(
      'Filtrar por categoría'
    );

    this.availableOnly = page.getByLabel(
      'Solo disponibles'
    );

    this.bookCards = page.locator('.libro-card');

    this.emptyState = page.locator('#catalogo-vacio');
  }

  async open() {
    await this.page.goto('/');

    await this.catalogTab.click();

    await expect(
      this.page.getByRole('heading', {
        name: 'El catálogo',
      })
    ).toBeVisible();
  }

  async search(term) {
    await this.searchInput.fill(term);
  }

  async searchByTitle(title) {
    await this.search(title);
  }

  async searchByAuthor(author) {
    await this.search(author);
  }

  async searchByISBN(isbn) {
    await this.search(isbn);
  }

  async expectResult(text) {
    await expect(
      this.bookCards.filter({
        hasText: text,
      }).first()
    ).toBeVisible();
  }

  async expectResultsContain(text) {
    await this.expectResult(text);
  }

  async expectEmptyState() {
    await expect(this.emptyState).toBeVisible();
  }

  async expectNoResults() {
    await this.expectEmptyState();
  }

  async filterByCategory(category) {
    await this.categoryFilter.selectOption({
      label: category,
    });
  }

  async showOnlyAvailable() {
    await this.availableOnly.check();
  }
}

module.exports = CatalogSearchPage;
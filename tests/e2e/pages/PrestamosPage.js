const { expect } = require('@playwright/test');

class PrestamosPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Registrar préstamo' });
    this.modal = page.locator('#modal');
    this.bookSelect = this.modal.getByLabel('Libro');
    this.readerSelect = this.modal.getByLabel('Lector');
    this.activeFilter = page.getByRole('button', { name: 'Activos' });
  }

  row(bookTitle) {
    return this.page.locator('#tabla-prestamos tbody tr').filter({ hasText: bookTitle });
  }

  async selectByVisibleText(select, visibleText) {
    const value = await select.locator('option').filter({ hasText: visibleText }).first().getAttribute('value');
    await select.selectOption(value);
  }

  async createLoan(bookTitle, readerName) {
    await this.addButton.click();
    await this.selectByVisibleText(this.bookSelect, bookTitle);
    await this.selectByVisibleText(this.readerSelect, readerName);
    await this.modal.getByRole('button', { name: 'Confirmar préstamo' }).click();
    await expect(this.row(bookTitle)).toBeVisible();
  }

  async expectLoanStatus(bookTitle, status) {
    await expect(this.row(bookTitle)).toContainText(status);
  }

  async returnLoan(bookTitle) {
    await this.row(bookTitle).getByRole('button', { name: 'Registrar devolución' }).click();
    await expect(this.row(bookTitle)).toContainText('Devuelto');
  }

  async filterActiveLoans() {
    await this.activeFilter.click();
  }
}

module.exports = PrestamosPage;

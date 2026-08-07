const { expect } = require('@playwright/test');

class LibrosPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Añadir libro' });
    this.search = page.getByPlaceholder('Buscar por título, autor o ISBN…');
    this.modal = page.locator('#modal');
    this.title = this.modal.getByLabel('Título');
    this.author = this.modal.getByLabel('Autor');
    this.isbn = this.modal.getByLabel('ISBN');
    this.copies = this.modal.getByLabel('Ejemplares');
    this.emptyMessage = page.locator('#catalogo-vacio');
  }

  card(title) {
    return this.page.locator('.libro-card').filter({ hasText: title });
  }

  async createBook({ title, author, isbn, copies = 1 }) {
    await this.addButton.click();
    await this.title.fill(title);
    await this.author.fill(author);
    await this.isbn.fill(isbn);
    await this.copies.fill(String(copies));
    await this.modal.getByRole('button', { name: 'Añadir al catálogo' }).click();
    await expect(this.card(title)).toBeVisible();
  }

  async searchBook(term) {
    await this.search.fill(term);
  }

  async expectBook(title) {
    await expect(this.card(title)).toBeVisible();
  }

  async expectNoResults() {
    await expect(this.emptyMessage).toBeVisible();
  }

  async editBook(currentTitle, newTitle) {
    const card = this.card(currentTitle);
    await card.getByRole('button', { name: 'Editar' }).click();
    await this.title.fill(newTitle);
    await this.modal.getByRole('button', { name: 'Guardar cambios' }).click();
    await expect(this.card(newTitle)).toBeVisible();
  }

  async deleteBook(title) {
    this.page.once('dialog', dialog => dialog.accept());
    await this.card(title).getByRole('button', { name: 'Quitar' }).click();
    await expect(this.card(title)).toHaveCount(0);
  }
}

module.exports = LibrosPage;

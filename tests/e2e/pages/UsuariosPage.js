const { expect } = require('@playwright/test');

class UsuariosPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Registrar lector' });
    this.modal = page.locator('#modal');
    this.name = this.modal.getByLabel('Nombre completo');
    this.email = this.modal.getByLabel('Correo');
    this.phone = this.modal.getByLabel('Teléfono');
  }

  readerCard(name) {
    return this.page.locator('.reader-card').filter({ hasText: name });
  }

  async createReader({ name, email, phone }) {
    await this.addButton.click();
    await this.name.fill(name);
    await this.email.fill(email);
    await this.phone.fill(phone);
    await this.modal.getByRole('button', { name: 'Registrar', exact: true }).click();
    await expect(this.readerCard(name)).toBeVisible();
  }
}

module.exports = UsuariosPage;

const { expect } = require('@playwright/test');

module.exports = class CatalogSearchPage {
  /**
   * Page object centrado exclusivamente en búsqueda y filtrado del catálogo.
   * No duplica la interacción con detalles/selección de libros que deberían estar en LibrosPage.js
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Candidatos de localizadores (etiquetas/placeholder/role). Usamos regex para tolerancia.
    this.titleCandidates = [
      page.getByLabel(/títul|título|title/i),
      page.getByPlaceholder(/títul|título|title/i),
      page.getByRole('searchbox', { name: /títul|título|title/i }),
    ];

    this.authorCandidates = [
      page.getByLabel(/autor|author/i),
      page.getByPlaceholder(/autor|author/i),
    ];

    this.isbnCandidates = [
      page.getByLabel(/isbn/i),
      page.getByPlaceholder(/isbn/i),
      // a veces el ISBN está en el mismo searchbox con etiqueta "Buscar"
      page.getByRole('textbox', { name: /isbn|buscar/i }),
    ];

    this.searchButton = page.getByRole('button', { name: /buscar|search|filtrar|go/i });
    this.clearButton = page.getByRole('button', { name: /limpiar|clear|reset/i });

    // Resultados: preferimos usar role=list y listitem para accesibilidad; si no existe, quien integre puede completar
    this.resultsList = page.getByRole('list', { name: /resultado|libros|catalogo|results|books/i });
    this.resultItemsFallback = page.locator('.book-item, .result-item, .catalog-item'); // fallback no accesible
    this.noResultsMessage = page.getByText(/no se han encontrado resultados|no results found|no hay resultados/i);
  }

  async _visibleLocator(...candidates) {
    // Devuelve el primer locator visible entre los candidatos
    for (const loc of candidates) {
      try {
        if (await loc.count() > 0 && await loc.first().isVisible()) return loc.first();
      } catch (e) {
        // ignorar y seguir probando candidatos
      }
    }
    throw new Error('No se encontró un locator visible entre los candidatos proporcionados');
  }

  async open() {
    await this.page.goto('/catalog' /* o /catalogo según la app */);
  }

  async searchByTitle(title) {
    const input = await this._visibleLocator(...this.titleCandidates);
    await input.fill(title);
    if (await this.searchButton.count() && await this.searchButton.isVisible()) {
      await this.searchButton.click();
    } else {
      await input.press('Enter');
    }
  }

  async searchByAuthor(author) {
    const input = await this._visibleLocator(...this.authorCandidates);
    await input.fill(author);
    if (await this.searchButton.count() && await this.searchButton.isVisible()) {
      await this.searchButton.click();
    } else {
      await input.press('Enter');
    }
  }

  async searchByISBN(isbn) {
    const input = await this._visibleLocator(...this.isbnCandidates);
    await input.fill(isbn);
    if (await this.searchButton.count() && await this.searchButton.isVisible()) {
      await this.searchButton.click();
    } else {
      await input.press('Enter');
    }
  }

  async clearSearch() {
    if (await this.clearButton.count() && await this.clearButton.isVisible()) {
      await this.clearButton.click();
    } else {
      // fallback: limpiar los inputs si existe alguno visible
      try {
        const titleInput = await this._visibleLocator(...this.titleCandidates);
        await titleInput.fill('');
      } catch (e) {}
      try {
        const authorInput = await this._visibleLocator(...this.authorCandidates);
        await authorInput.fill('');
      } catch (e) {}
    }
  }

  async expectResultsContain(textOrRegex) {
    // Preferimos localizar por link con el nombre del título/autor accesible
    const candidate = this.page.getByRole('link', { name: new RegExp(textOrRegex, 'i') });
    if (await candidate.count() > 0) {
      await expect(candidate.first()).toBeVisible();
      return;
    }

    // fallback a items en lista accesible
    if (await this.resultsList.count() > 0) {
      const items = this.resultsList.locator('li');
      const count = await items.count();
      for (let i = 0; i < count; i++) {
        const text = await items.nth(i).innerText();
        if (new RegExp(textOrRegex, 'i').test(text)) {
          await expect(items.nth(i)).toBeVisible();
          return;
        }
      }
    }

    // último recurso: fallback por selector no accesible
    if (await this.resultItemsFallback.count() > 0) {
      const rb = this.resultItemsFallback.filter({ hasText: new RegExp(textOrRegex, 'i') });
      await expect(rb.first()).toBeVisible();
      return;
    }

    throw new Error('No se encontró resultado que contenga: ' + textOrRegex);
  }

  async expectNoResults() {
    if (await this.noResultsMessage.count() > 0) {
      await expect(this.noResultsMessage.first()).toBeVisible();
      return;
    }

    // si no hay message, validar que la lista de resultados esté vacía
    if (await this.resultsList.count() > 0) {
      const items = this.resultsList.locator('li');
      const count = await items.count();
      await expect(count).toBe(0);
      return;
    }

    // fallback: si hay fallback items, validar count = 0
    const fallbackCount = await this.resultItemsFallback.count();
    await expect(fallbackCount).toBe(0);
  }

  async expectResultsCountGreaterThan(n) {
    if (await this.resultsList.count() > 0) {
      const items = this.resultsList.locator('li');
      const count = await items.count();
      await expect(count).toBeGreaterThan(n);
      return;
    }

    const fallbackCount = await this.resultItemsFallback.count();
    await expect(fallbackCount).toBeGreaterThan(n);
  }
};
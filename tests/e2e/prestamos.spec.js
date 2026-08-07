const { test } = require('@playwright/test');
const LoginPage = require('./pages/LoginPage');
const HomePage = require('./pages/HomePage');
const PrestamosPage = require('./pages/PrestamosPage');
const { createBook, createReader, createLoan } = require('./support/api-fixtures');

async function loanData(request, suffix) {
  const book = await createBook(request, {
    titulo: `Libro préstamo ${suffix}`,
    isbn: `E2E-LOAN-${suffix}`,
    ejemplares_totales: 2,
  });
  const reader = await createReader(request, {
    nombre_completo: `Lector préstamo ${suffix}`,
    correo: `prestamo-${suffix}@example.test`,
  });
  return { book, reader };
}

test.describe('Gestión de préstamos', () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).loginAsValidUser();
  });

  test('permite registrar un préstamo para un libro disponible', async ({ page, request }, testInfo) => {
    const suffix = `${testInfo.workerIndex}-${Date.now()}`;
    const { book, reader } = await loanData(request, suffix);
    const home = new HomePage(page);
    await page.reload();
    await home.goToLoans();

    await new PrestamosPage(page).createLoan(book.titulo, reader.nombre_completo);
  });

  test('permite registrar la devolución de un préstamo activo', async ({ page, request }, testInfo) => {
    const suffix = `${testInfo.workerIndex}-${Date.now()}`;
    const { book, reader } = await loanData(request, suffix);
    await createLoan(request, book, reader);
    await page.reload();
    await new HomePage(page).goToLoans();
    const loans = new PrestamosPage(page);

    await loans.returnLoan(book.titulo);
  });

  test('permite filtrar y conservar visibles los préstamos activos', async ({ page, request }, testInfo) => {
    const suffix = `${testInfo.workerIndex}-${Date.now()}`;
    const { book, reader } = await loanData(request, suffix);
    await createLoan(request, book, reader);
    await page.reload();
    await new HomePage(page).goToLoans();
    const loans = new PrestamosPage(page);

    await loans.filterActiveLoans();

    await loans.expectLoanStatus(book.titulo, 'Activo');
  });
});

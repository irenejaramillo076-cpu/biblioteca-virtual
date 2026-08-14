const { test, expect } = require('@playwright/test');

async function createBook(request, suffix, copies = 1) {
  const response = await request.post('/api/libros', {
    data: {
      titulo: `Libro IA préstamos ${suffix}`,
      autor: 'Equipo QA IA',
      isbn: `AI-LOAN-${suffix}`,
      ejemplares_totales: copies,
    },
  });

  expect(response.status()).toBe(201);
  return response.json();
}

async function createReader(request, suffix) {
  const response = await request.post('/api/usuarios', {
    data: {
      nombre_completo: `Lector IA ${suffix}`,
      correo: `lector-ia-${suffix}@example.test`,
      telefono: '6000-0000',
    },
  });

  expect(response.status()).toBe(201);
  return response.json();
}

test.describe('IA - Análisis de riesgos del módulo Préstamos', () => {

  test('LOAN-AI-01 - rechaza préstamo con datos incompletos', async ({ request }) => {
    const response = await request.post('/api/prestamos', {
      data: {},
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toContain(
      'id_libro e id_usuario son obligatorios'
    );
  });


  test('LOAN-AI-02 - rechaza préstamo para libro inexistente', async ({ request }) => {
    const suffix = Date.now();

    const reader = await createReader(
      request,
      `book-not-found-${suffix}`
    );

    const response = await request.post('/api/prestamos', {
      data: {
        id_libro: 999999999,
        id_usuario: reader.id_usuario,
      },
    });

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.error).toContain('Libro no encontrado');
  });


  test('LOAN-AI-03 - rechaza préstamo para lector inexistente', async ({ request }) => {
    const suffix = Date.now();

    const book = await createBook(
      request,
      `reader-not-found-${suffix}`,
      1
    );

    const response = await request.post('/api/prestamos', {
      data: {
        id_libro: book.id_libro,
        id_usuario: 999999999,
      },
    });

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.error).toContain('Usuario no encontrado');
  });


  test('LOAN-AI-04 - solo un préstamo obtiene el último ejemplar disponible', async ({ request }) => {
    const suffix = Date.now();

    const book = await createBook(
      request,
      `last-copy-${suffix}`,
      1
    );

    const reader1 = await createReader(
      request,
      `last-copy-a-${suffix}`
    );

    const reader2 = await createReader(
      request,
      `last-copy-b-${suffix}`
    );

    const [response1, response2] = await Promise.all([
      request.post('/api/prestamos', {
        data: {
          id_libro: book.id_libro,
          id_usuario: reader1.id_usuario,
        },
      }),

      request.post('/api/prestamos', {
        data: {
          id_libro: book.id_libro,
          id_usuario: reader2.id_usuario,
        },
      }),
    ]);

    const statuses = [
      response1.status(),
      response2.status(),
    ].sort();

    expect(statuses).toEqual([201, 409]);

    const updatedBookResponse = await request.get(
      `/api/libros/${book.id_libro}`
    );

    expect(updatedBookResponse.status()).toBe(200);

    const updatedBook = await updatedBookResponse.json();

    expect(updatedBook.ejemplares_disponibles).toBe(0);
  });


  test('LOAN-AI-05 - impide devolución doble y conserva disponibilidad correcta', async ({ request }) => {
    const suffix = Date.now();

    const book = await createBook(
      request,
      `double-return-${suffix}`,
      1
    );

    const reader = await createReader(
      request,
      `double-return-${suffix}`
    );

    const loanResponse = await request.post('/api/prestamos', {
      data: {
        id_libro: book.id_libro,
        id_usuario: reader.id_usuario,
      },
    });

    expect(loanResponse.status()).toBe(201);

    const loan = await loanResponse.json();

    const firstReturn = await request.put(
      `/api/prestamos/${loan.id_prestamo}/devolver`
    );

    expect(firstReturn.status()).toBe(200);

    const secondReturn = await request.put(
      `/api/prestamos/${loan.id_prestamo}/devolver`
    );

    expect(secondReturn.status()).toBe(409);

    const error = await secondReturn.json();

    expect(error.error).toContain(
      'Este préstamo ya fue devuelto'
    );

    const bookResponse = await request.get(
      `/api/libros/${book.id_libro}`
    );

    const updatedBook = await bookResponse.json();

    expect(updatedBook.ejemplares_disponibles).toBe(1);
    expect(updatedBook.ejemplares_totales).toBe(1);
  });

});
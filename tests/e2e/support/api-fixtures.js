async function responseJson(response, operation) {
  if (!response.ok()) {
    throw new Error(`${operation} falló con ${response.status()}: ${await response.text()}`);
  }
  return response.json();
}

async function createBook(request, overrides = {}) {
  const response = await request.post('/api/libros', {
    data: {
      titulo: 'Libro QA',
      autor: 'Equipo QA',
      isbn: `QA-${Date.now()}-${Math.random()}`,
      ejemplares_totales: 3,
      ...overrides,
    },
  });
  return responseJson(response, 'Crear libro');
}

async function createReader(request, overrides = {}) {
  const response = await request.post('/api/usuarios', {
    data: {
      nombre_completo: 'Lector QA',
      correo: `lector-${Date.now()}-${Math.random()}@example.test`,
      telefono: '6000-0000',
      ...overrides,
    },
  });
  return responseJson(response, 'Crear lector');
}

async function createLoan(request, book, reader) {
  const response = await request.post('/api/prestamos', {
    data: { id_libro: book.id_libro, id_usuario: reader.id_usuario },
  });
  return responseJson(response, 'Crear préstamo');
}

module.exports = { createBook, createReader, createLoan };

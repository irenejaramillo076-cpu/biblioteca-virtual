Actúa como Senior QA Engineer especializado en análisis basado en riesgos, reglas de negocio y automatización E2E con Playwright.

Estoy evaluando el módulo de Préstamos de una aplicación llamada Biblioteca Virtual.

Actualmente la suite E2E ya valida:
1. Registrar un préstamo para un libro disponible.
2. Registrar la devolución de un préstamo activo.
3. Filtrar y conservar visibles los préstamos activos.

El sistema trabaja con libros, lectores y préstamos. Los libros tienen una cantidad de ejemplares disponibles.

Necesito diseñar 10 escenarios NUEVOS de prueba para detectar riesgos funcionales, de concurrencia y consistencia de datos.

Considera especialmente:
- intentar prestar un libro sin ejemplares disponibles;
- intentar utilizar un lector inexistente;
- intentar utilizar un libro inexistente;
- realizar dos solicitudes sobre el último ejemplar disponible;
- registrar una devolución dos veces;
- comprobar el aumento de disponibilidad después de devolver un libro;
- datos incompletos;
- operaciones repetidas rápidamente;
- consistencia entre la interfaz y la API;
- estados inválidos o transiciones de estado incorrectas.

Para cada escenario proporciona:

1. ID.
2. Riesgo identificado.
3. Objetivo del test.
4. Precondición.
5. Pasos resumidos.
6. Datos de prueba.
7. Resultado esperado.
8. Probabilidad del riesgo: Baja / Media / Alta.
9. Impacto: Bajo / Medio / Alto / Crítico.
10. Prioridad.
11. Tipo recomendado: Playwright E2E / API / integración / manual.

No inventes reglas de negocio cuya existencia no se haya indicado.

Cuando un comportamiento no pueda determinarse con la información proporcionada, marca el escenario como "requiere revisión de requisitos".

Finalmente:
- clasifica los escenarios por nivel de riesgo;
- selecciona los 5 escenarios que aportarían mayor valor a la automatización;
- explica brevemente por qué priorizaste esos cinco.
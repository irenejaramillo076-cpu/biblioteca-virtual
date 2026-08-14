Actúa como QA Automation Lead especializado en técnicas de diseño de pruebas, análisis de valores límite, partición de equivalencia y automatización con Playwright.

Estoy evaluando el módulo Catálogo de una aplicación llamada Biblioteca Virtual.

Actualmente la suite E2E ya cubre:
1. Registrar un libro con datos válidos.
2. Buscar un libro existente por título.
3. Buscar un libro inexistente.
4. Editar el título de un libro.
5. Eliminar un libro sin préstamos asociados.

Al crear un libro se utilizan los siguientes datos:
- title
- author
- isbn
- copies

Necesito 10 casos de prueba NUEVOS que no repitan los cinco escenarios existentes.

Aplica principalmente:
- análisis de valores límite;
- partición de equivalencia;
- pruebas negativas.

Considera escenarios relacionados con:
- título vacío;
- autor vacío;
- ISBN vacío;
- ISBN duplicado;
- cero ejemplares;
- cantidad negativa de ejemplares;
- cantidades extremadamente grandes;
- cadenas extremadamente largas;
- caracteres especiales;
- Unicode y caracteres internacionales.

Para cada caso proporciona:

1. ID.
2. Objetivo.
3. Técnica de diseño de prueba utilizada.
4. Precondición.
5. Datos de prueba.
6. Pasos resumidos.
7. Resultado esperado.
8. Prioridad.
9. Riesgo.
10. Recomendación: Automatizar con Playwright / Automatizar mediante API / Verificación manual.

No inventes límites máximos o reglas de negocio que no hayan sido proporcionados.

Cuando una regla de validación no pueda determinarse con la información disponible, indícalo explícitamente como "requiere revisión de requisitos" en lugar de asumir el comportamiento esperado.

Finalmente, selecciona los 5 casos que consideres de mayor valor para automatización y explica brevemente por qué.
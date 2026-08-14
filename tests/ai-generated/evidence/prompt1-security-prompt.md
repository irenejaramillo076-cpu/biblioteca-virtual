Actúa como Senior QA Security Engineer especializado en aplicaciones web Node.js, Express y Playwright.

Estoy evaluando el módulo de autenticación de una aplicación llamada Biblioteca Virtual.

Actualmente la aplicación posee estas pruebas:
1. Inicio de sesión correcto con credenciales válidas.
2. Rechazo de contraseña incorrecta.
3. Cierre de sesión.

El formulario contiene:
- Campo "Correo electrónico".
- Campo "Contraseña".
- Botón "Iniciar sesión".
- Los errores aparecen mediante un elemento role="alert".
- Una autenticación correcta redirige a "/".
- Una autenticación incorrecta permanece en "/login.html".

Diseña 10 casos de prueba adicionales enfocados en seguridad y robustez.

Considera:
- campos vacíos;
- formato de correo;
- SQL Injection;
- XSS;
- credenciales extremadamente largas;
- intentos repetidos de autenticación;
- acceso directo a rutas protegidas;
- persistencia de sesión después del logout;
- exposición de información mediante mensajes de error;
- manipulación de sesión.

Para cada caso proporciona:
ID, objetivo, precondición, pasos, datos de prueba, resultado esperado, prioridad y riesgo.

No inventes funcionalidades que no estén descritas. Marca como "requiere verificación manual" cualquier control de seguridad cuya implementación no pueda deducirse de la información proporcionada.
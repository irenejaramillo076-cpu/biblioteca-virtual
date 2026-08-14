# Catálogo de Casos de Prueba — Biblioteca Virtual

## 1. Objetivo

El presente catálogo documenta treinta casos de prueba asociados a los módulos críticos de Biblioteca Virtual, de acuerdo con la estrategia establecida en el Plan de Pruebas basado en ISO/IEC/IEEE 29119.

Los casos se concentran en autenticación, catálogo de libros y gestión de préstamos, debido a que estos procesos representan las operaciones con mayor impacto funcional, de seguridad y de integridad de datos.

Se utilizan pruebas positivas, negativas, valores límite, particiones de equivalencia, seguridad, transición de estados y pruebas basadas en riesgos.

---

# 2. Casos de prueba de autenticación

## CP-AUTH-01 — Inicio de sesión con credenciales válidas

**Prioridad:** Alta  
**Tipo:** Funcional / Positiva  
**Automatización:** Sí — Playwright  

**Precondición:** Existe una cuenta de bibliotecario válida.

**Pasos:**
1. Abrir la pantalla de inicio de sesión.
2. Ingresar correo válido.
3. Ingresar contraseña válida.
4. Presionar "Iniciar sesión".

**Resultado esperado:**  
El sistema autentica al bibliotecario y permite acceder al catálogo.

---

## CP-AUTH-02 — Contraseña incorrecta

**Prioridad:** Alta  
**Tipo:** Negativa / Seguridad  
**Automatización:** Sí — Playwright  

**Pasos:**
1. Ingresar correo válido.
2. Ingresar contraseña incorrecta.
3. Intentar iniciar sesión.

**Resultado esperado:**  
El sistema rechaza el acceso y muestra un mensaje de credenciales inválidas.

---

## CP-AUTH-03 — Credenciales vacías

**Prioridad:** Alta  
**Tipo:** Negativa / Validación  
**Automatización:** Sí — Playwright IA  

**Pasos:**
1. Abrir login.
2. No introducir correo ni contraseña.
3. Presionar iniciar sesión.

**Resultado esperado:**  
El sistema informa que el correo y la contraseña son obligatorios y permanece en login.

---

## CP-AUTH-04 — SQL Injection en correo

**Prioridad:** Crítica  
**Tipo:** Seguridad  
**Automatización:** Sí — Playwright IA  

**Dato:** `' OR '1'='1' --`

**Resultado esperado:**  
El sistema no autentica al usuario y responde con credenciales inválidas.

---

## CP-AUTH-05 — SQL Injection en contraseña

**Prioridad:** Crítica  
**Tipo:** Seguridad  
**Automatización:** Sí — Playwright IA  

**Dato:** `' OR '1'='1' --`

**Resultado esperado:**  
La entrada no altera la consulta ni permite acceso al sistema.

---

## CP-AUTH-06 — Payload XSS en login

**Prioridad:** Crítica  
**Tipo:** Seguridad  
**Automatización:** Sí — Playwright IA  

**Dato:** `<script>alert("XSS")</script>`

**Resultado esperado:**  
El contenido no se ejecuta como JavaScript, no aparece ningún diálogo y el acceso es rechazado.

---

## CP-AUTH-07 — Credenciales excesivamente largas

**Prioridad:** Media  
**Tipo:** Valores límite / Seguridad  
**Automatización:** Sí — Playwright IA  

**Dato:** Cadena de aproximadamente 5000 caracteres.

**Resultado esperado:**  
El sistema procesa la solicitud de manera segura, rechaza las credenciales y no presenta fallos.

---

## CP-AUTH-08 — Cierre de sesión

**Prioridad:** Alta  
**Tipo:** Funcional / Transición de estados  
**Automatización:** Sí — Playwright  

**Precondición:** Existe una sesión activa.

**Pasos:**
1. Iniciar sesión.
2. Cerrar sesión.
3. Intentar regresar a la página principal.

**Resultado esperado:**  
El usuario es redirigido a la pantalla de login.

---

## CP-AUTH-09 — Acceso a sesión sin token

**Prioridad:** Crítica  
**Tipo:** Seguridad / API  
**Automatización:** Sí — Jest / Supertest  

**Pasos:**
1. Solicitar GET `/api/auth/session`.
2. No enviar Bearer Token.

**Resultado esperado:**  
El servidor devuelve HTTP 401.

---

## CP-AUTH-10 — Token invalidado después del logout

**Prioridad:** Crítica  
**Tipo:** Seguridad / Sesión  
**Automatización:** Sí — Jest / Supertest  

**Pasos:**
1. Iniciar sesión.
2. Obtener token.
3. Ejecutar logout.
4. Intentar reutilizar el mismo token.

**Resultado esperado:**  
El logout devuelve 204 y el token anterior deja de ser válido.

---

# 3. Casos de prueba del catálogo

## CP-CAT-01 — Registrar libro válido

**Prioridad:** Alta  
**Tipo:** Funcional / Positiva  
**Automatización:** Sí — Playwright  

**Datos:** Título, autor, ISBN y 2 ejemplares válidos.

**Resultado esperado:**  
El libro se registra y aparece en el catálogo.

---

## CP-CAT-02 — Buscar libro existente

**Prioridad:** Alta  
**Tipo:** Funcional  
**Automatización:** Sí — Playwright  

**Precondición:** Existe el libro en el catálogo.

**Resultado esperado:**  
La búsqueda muestra el libro solicitado.

---

## CP-CAT-03 — Buscar libro inexistente

**Prioridad:** Media  
**Tipo:** Negativa  
**Automatización:** Sí — Playwright  

**Resultado esperado:**  
El sistema muestra un estado de "sin resultados" y no genera errores.

---

## CP-CAT-04 — Editar título de libro

**Prioridad:** Alta  
**Tipo:** Funcional  
**Automatización:** Sí — Playwright  

**Precondición:** Existe un libro previamente registrado.

**Resultado esperado:**  
El nuevo título queda almacenado y se muestra correctamente en la interfaz.

---

## CP-CAT-05 — Eliminar libro sin préstamos

**Prioridad:** Alta  
**Tipo:** Funcional  
**Automatización:** Sí — Playwright  

**Precondición:** El libro no posee préstamos asociados.

**Resultado esperado:**  
El libro es eliminado correctamente del catálogo.

---

## CP-CAT-06 — Título vacío

**Prioridad:** Alta  
**Tipo:** Negativa / Valor límite  
**Automatización:** Sí — Playwright IA  

**Pasos:**
1. Abrir formulario de nuevo libro.
2. Dejar título vacío.
3. Completar los demás campos.
4. Intentar registrar.

**Resultado esperado:**  
La validación impide enviar el formulario.

---

## CP-CAT-07 — Autor vacío

**Prioridad:** Alta  
**Tipo:** Negativa  
**Automatización:** Sí — Playwright IA  

**Resultado esperado:**  
El libro no se registra y el formulario permanece abierto.

---

## CP-CAT-08 — ISBN duplicado

**Prioridad:** Alta  
**Tipo:** Integridad / Negativa  
**Automatización:** Sí — Playwright IA  

**Precondición:** Existe un libro con el ISBN utilizado.

**Resultado esperado:**  
El sistema rechaza el nuevo registro e informa que el ISBN ya existe.

---

## CP-CAT-09 — Cero ejemplares

**Prioridad:** Alta  
**Tipo:** Valor límite  
**Automatización:** Sí — Playwright IA  

**Dato:** `ejemplares = 0`

**Resultado esperado:**  
El formulario considera inválido el valor y no permite registrar el libro.

---

## CP-CAT-10 — Caracteres Unicode

**Prioridad:** Media  
**Tipo:** Compatibilidad de datos  
**Automatización:** Sí — Playwright IA  

**Datos de ejemplo:**  
Título: `Cien años de soledad 日本語 📚`  
Autor: `Gabriel García Márquez — 李小龍`

**Resultado esperado:**  
Los caracteres se almacenan y muestran correctamente sin corrupción de texto.

---

# 4. Casos de prueba de préstamos

## CP-PRE-01 — Registrar préstamo válido

**Prioridad:** Crítica  
**Tipo:** Funcional / Positiva  
**Automatización:** Sí — Playwright  

**Precondiciones:**
- Libro existente.
- Ejemplar disponible.
- Lector existente.

**Resultado esperado:**  
El préstamo se registra correctamente.

---

## CP-PRE-02 — Registrar devolución

**Prioridad:** Crítica  
**Tipo:** Funcional / Transición de estado  
**Automatización:** Sí — Playwright  

**Precondición:** Existe un préstamo activo.

**Resultado esperado:**  
El préstamo cambia a devuelto y se actualiza la disponibilidad del libro.

---

## CP-PRE-03 — Filtrar préstamos activos

**Prioridad:** Media  
**Tipo:** Funcional  
**Automatización:** Sí — Playwright  

**Resultado esperado:**  
Al seleccionar el filtro de activos solo permanecen visibles los préstamos activos.

---

## CP-PRE-04 — Datos de préstamo incompletos

**Prioridad:** Alta  
**Tipo:** Negativa / API  
**Automatización:** Sí — Playwright API IA  

**Petición:**  
POST `/api/prestamos` sin `id_libro` ni `id_usuario`.

**Resultado esperado:**  
HTTP 400 indicando que ambos identificadores son obligatorios.

---

## CP-PRE-05 — Libro inexistente

**Prioridad:** Alta  
**Tipo:** Negativa / API  
**Automatización:** Sí — Playwright API IA  

**Dato:** `id_libro` inexistente.

**Resultado esperado:**  
HTTP 404 con mensaje "Libro no encontrado".

---

## CP-PRE-06 — Lector inexistente

**Prioridad:** Alta  
**Tipo:** Negativa / API  
**Automatización:** Sí — Playwright API IA  

**Dato:** `id_usuario` inexistente.

**Resultado esperado:**  
HTTP 404 con mensaje "Usuario no encontrado".

---

## CP-PRE-07 — Dos solicitudes sobre el último ejemplar

**Prioridad:** Crítica  
**Tipo:** Concurrencia / Integridad  
**Automatización:** Sí — Playwright API IA  

**Precondiciones:**
- Libro con exactamente un ejemplar disponible.
- Dos lectores válidos.

**Pasos:**
1. Enviar dos solicitudes de préstamo simultáneas.
2. Consultar las respuestas.
3. Consultar disponibilidad final.

**Resultado esperado:**  
Una solicitud devuelve HTTP 201 y la otra HTTP 409; la disponibilidad final debe ser cero.

---

## CP-PRE-08 — Devolución duplicada

**Prioridad:** Crítica  
**Tipo:** Transición de estados / Integridad  
**Automatización:** Sí — Playwright API IA  

**Pasos:**
1. Crear un préstamo.
2. Devolverlo.
3. Intentar devolverlo nuevamente.

**Resultado esperado:**  
La primera devolución es exitosa; la segunda devuelve HTTP 409 y no incrementa nuevamente la disponibilidad.

---

## CP-PRE-09 — Préstamo sin ejemplares disponibles

**Prioridad:** Crítica  
**Tipo:** Negativa / Regla de negocio  
**Automatización:** Pendiente  

**Precondición:** El libro posee cero ejemplares disponibles.

**Pasos:**
1. Seleccionar el libro sin disponibilidad.
2. Seleccionar un lector válido.
3. Intentar registrar préstamo.

**Resultado esperado:**  
El sistema impide registrar el préstamo y conserva la disponibilidad en cero.

---

## CP-PRE-10 — Consistencia entre API e interfaz después de devolución

**Prioridad:** Alta  
**Tipo:** Integración / Consistencia  
**Automatización:** Pendiente  

**Precondición:** Existe un préstamo activo.

**Pasos:**
1. Registrar devolución desde la interfaz.
2. Consultar el libro mediante API.
3. Consultar nuevamente el catálogo.
4. Comparar disponibilidad.

**Resultado esperado:**  
La disponibilidad mostrada en la interfaz coincide exactamente con la registrada en la API.

---

# 5. Resumen de cobertura de casos

| Módulo | Casos | Automatizados | Pendientes |
|---|---:|---:|---:|
| Autenticación | 10 | 10 | 0 |
| Catálogo | 10 | 10 | 0 |
| Préstamos | 10 | 8 | 2 |
| **Total** | **30** | **28** | **2** |

El catálogo supera el alcance mínimo solicitado de treinta casos de prueba y presenta un alto grado de automatización.

Los dos escenarios pendientes fueron seleccionados deliberadamente porque representan riesgos adicionales de integridad y consistencia identificados durante el análisis ISO/IEC 25010 y forman parte del plan de mejora continua.

# 6. Técnicas utilizadas

| Técnica | Casos representativos |
|---|---|
| Pruebas positivas | CP-AUTH-01, CP-CAT-01, CP-PRE-01 |
| Pruebas negativas | CP-AUTH-02, CP-CAT-06, CP-PRE-04 |
| Valores límite | CP-AUTH-07, CP-CAT-09 |
| Partición de equivalencia | Credenciales válidas e inválidas |
| Seguridad | CP-AUTH-04, CP-AUTH-05, CP-AUTH-06 |
| Transición de estados | CP-AUTH-08, CP-PRE-02, CP-PRE-08 |
| Concurrencia | CP-PRE-07 |
| Integridad | CP-CAT-08, CP-PRE-07, CP-PRE-08 |
| Compatibilidad de datos | CP-CAT-10 |
| Integración | CP-PRE-10 |

# 7. Criterio general de aprobación

Un caso será considerado aprobado cuando el resultado obtenido coincida con el resultado esperado y no produzca efectos secundarios que comprometan otros datos o funcionalidades del sistema.

Un caso será considerado fallido cuando exista diferencia entre comportamiento esperado y observado, se produzca una excepción no controlada, exista corrupción de información o el sistema permita una operación prohibida por las reglas de negocio.
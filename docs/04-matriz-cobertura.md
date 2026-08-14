# Matriz de Cobertura y Trazabilidad — Biblioteca Virtual

## 1. Objetivo

La presente matriz relaciona los requisitos funcionales y no funcionales de Biblioteca Virtual con los casos de prueba, herramientas de automatización, evidencias y características de calidad de ISO/IEC 25010.

Su propósito es demostrar que las funciones críticas del producto cuentan con mecanismos de verificación y permitir identificar áreas cuya cobertura debe ser ampliada.

---

## 2. Requisitos funcionales

| ID | Requisito | Prioridad |
|---|---|---|
| RF-01 | El sistema debe permitir al bibliotecario iniciar sesión con credenciales válidas | Alta |
| RF-02 | El sistema debe rechazar credenciales incorrectas o incompletas | Alta |
| RF-03 | El sistema debe procesar de forma segura entradas maliciosas o anormales en autenticación | Crítica |
| RF-04 | El sistema debe administrar correctamente el ciclo de vida de la sesión y sus tokens | Crítica |
| RF-05 | El sistema debe permitir registrar libros válidos | Alta |
| RF-06 | El sistema debe permitir consultar y buscar libros del catálogo | Alta |
| RF-07 | El sistema debe permitir editar y eliminar libros cuando corresponda | Alta |
| RF-08 | El sistema debe preservar la integridad de los datos del catálogo | Alta |
| RF-09 | El sistema debe permitir registrar lectores | Alta |
| RF-10 | El sistema debe registrar préstamos únicamente cuando libro y lector sean válidos y exista disponibilidad | Crítica |
| RF-11 | El sistema debe permitir identificar y filtrar préstamos activos | Media |
| RF-12 | El sistema debe procesar devoluciones y actualizar correctamente la disponibilidad | Crítica |
| RF-13 | El sistema debe impedir estados inválidos, préstamos concurrentes incorrectos y devoluciones duplicadas | Crítica |

---

## 3. Requisitos no funcionales

| ID | Requisito | Característica ISO 25010 |
|---|---|---|
| RNF-01 | Las dependencias productivas y la aplicación deben ser sometidas a controles de seguridad | Seguridad |
| RNF-02 | Las operaciones principales deben mantener tiempos de respuesta aceptables bajo carga | Eficiencia del desempeño |
| RNF-03 | La interfaz no debe presentar incidencias de accesibilidad critical o serious en las vistas evaluadas | Capacidad de interacción |
| RNF-04 | El código debe mantener niveles definidos de cobertura y análisis estático de calidad | Mantenibilidad |
| RNF-05 | La aplicación debe conservar correctamente los datos y funcionar mediante tecnologías web compatibles | Compatibilidad / Flexibilidad |

---

# 4. Matriz de trazabilidad funcional

| Requisito | Casos asociados | Automatización | Evidencia | ISO 25010 | Estado |
|---|---|---|---|---|---|
| RF-01 | CP-AUTH-01 | Playwright | `tests/e2e/auth.spec.js` | Adecuación funcional | Cubierto |
| RF-02 | CP-AUTH-02, CP-AUTH-03 | Playwright | `auth.spec.js`, `ai-login-security.spec.js` | Adecuación funcional / Seguridad | Cubierto |
| RF-03 | CP-AUTH-04, CP-AUTH-05, CP-AUTH-06, CP-AUTH-07 | Playwright | `tests/ai-generated/ai-login-security.spec.js` | Seguridad | Cubierto |
| RF-04 | CP-AUTH-08, CP-AUTH-09, CP-AUTH-10 | Playwright / Jest / Supertest | `auth.spec.js`, `auth.routes.test.js` | Seguridad / Fiabilidad | Cubierto |
| RF-05 | CP-CAT-01 | Playwright | `tests/e2e/libros.spec.js` | Adecuación funcional | Cubierto |
| RF-06 | CP-CAT-02, CP-CAT-03 | Playwright | `tests/e2e/libros.spec.js` | Adecuación funcional | Cubierto |
| RF-07 | CP-CAT-04, CP-CAT-05 | Playwright | `tests/e2e/libros.spec.js` | Adecuación funcional | Cubierto |
| RF-08 | CP-CAT-06, CP-CAT-07, CP-CAT-08, CP-CAT-09, CP-CAT-10 | Playwright | `tests/ai-generated/ai-catalog-boundary.spec.js` | Fiabilidad / Adecuación funcional | Cubierto |
| RF-09 | E2E registro de lector | Playwright | `tests/e2e/usuarios.spec.js` | Adecuación funcional | Cubierto |
| RF-10 | CP-PRE-01, CP-PRE-04, CP-PRE-05, CP-PRE-06, CP-PRE-09 | Playwright UI/API | `prestamos.spec.js`, `ai-loans-risk.spec.js` | Adecuación funcional / Fiabilidad | Parcial: CP-PRE-09 pendiente |
| RF-11 | CP-PRE-03 | Playwright | `tests/e2e/prestamos.spec.js` | Adecuación funcional | Cubierto |
| RF-12 | CP-PRE-02, CP-PRE-08, CP-PRE-10 | Playwright UI/API | `prestamos.spec.js`, `ai-loans-risk.spec.js` | Fiabilidad | Parcial: CP-PRE-10 pendiente |
| RF-13 | CP-PRE-07, CP-PRE-08 | Playwright API | `tests/ai-generated/ai-loans-risk.spec.js` | Fiabilidad / Safety | Cubierto |

---

# 5. Matriz de trazabilidad no funcional

| Requisito | Control | Herramienta | Evidencia | Criterio | Estado |
|---|---|---|---|---|---|
| RNF-01 | Seguridad de dependencias productivas | npm audit | GitHub Actions | 0 vulnerabilidades High/Critical | Automatizado |
| RNF-01 | Seguridad dinámica | OWASP ZAP | `zap-results` | Escaneo baseline generado | Automatizado |
| RNF-01 | Seguridad de autenticación | Playwright / Supertest | Casos CP-AUTH-02 a CP-AUTH-10 | Acceso no autorizado rechazado | Automatizado |
| RNF-02 | Carga sobre API | k6 | `k6-results` | p95 < 500 ms | Automatizado |
| RNF-02 | Tasa de errores | k6 | `k6-results` | Solicitudes fallidas < 1 % | Automatizado |
| RNF-03 | Accesibilidad | Axe + Playwright | `accessibility.spec.js` | 0 impactos critical/serious | Automatizado |
| RNF-04 | Cobertura | Jest / Istanbul | `coverage-report` | ≥ 70 % en métricas configuradas | Automatizado |
| RNF-04 | Calidad estática | SonarQube Cloud | Quality Gate | Quality Gate satisfactorio | Automatizado en main/PR |
| RNF-05 | Caracteres internacionales | Playwright | CP-CAT-10 | Unicode almacenado correctamente | Automatizado |
| RNF-05 | Navegador | Playwright Chromium | Pipeline CI/CD | Ejecución E2E satisfactoria | Parcial |

---

# 6. Relación de los 30 casos con los requisitos

| Caso | Requisito |
|---|---|
| CP-AUTH-01 | RF-01 |
| CP-AUTH-02 | RF-02 |
| CP-AUTH-03 | RF-02 |
| CP-AUTH-04 | RF-03 |
| CP-AUTH-05 | RF-03 |
| CP-AUTH-06 | RF-03 |
| CP-AUTH-07 | RF-03 |
| CP-AUTH-08 | RF-04 |
| CP-AUTH-09 | RF-04 |
| CP-AUTH-10 | RF-04 |
| CP-CAT-01 | RF-05 |
| CP-CAT-02 | RF-06 |
| CP-CAT-03 | RF-06 |
| CP-CAT-04 | RF-07 |
| CP-CAT-05 | RF-07 |
| CP-CAT-06 | RF-08 |
| CP-CAT-07 | RF-08 |
| CP-CAT-08 | RF-08 |
| CP-CAT-09 | RF-08 |
| CP-CAT-10 | RF-08 / RNF-05 |
| CP-PRE-01 | RF-10 |
| CP-PRE-02 | RF-12 |
| CP-PRE-03 | RF-11 |
| CP-PRE-04 | RF-10 |
| CP-PRE-05 | RF-10 |
| CP-PRE-06 | RF-10 |
| CP-PRE-07 | RF-13 |
| CP-PRE-08 | RF-12 / RF-13 |
| CP-PRE-09 | RF-10 |
| CP-PRE-10 | RF-12 |

---

# 7. Cobertura por módulo

| Área | Requisitos | Evidencia automatizada | Nivel |
|---|---:|---:|---|
| Autenticación | 4 | 4 | Alta |
| Catálogo | 4 | 4 | Alta |
| Lectores | 1 | 1 | Media |
| Préstamos | 4 | 4 | Alta |
| Seguridad no funcional | 1 | 1 | Alta |
| Rendimiento | 1 | 1 | Alta |
| Accesibilidad | 1 | 1 | Media |
| Mantenibilidad | 1 | 1 | Alta |
| Compatibilidad | 1 | 1 parcial | Media |

---

# 8. Análisis de brechas

La matriz demuestra cobertura sobre todos los requisitos críticos identificados para el proyecto; sin embargo, la existencia de un caso asociado no significa que una característica se encuentre completamente agotada desde el punto de vista de pruebas.

Se identifican como principales brechas la ejecución multibrowser, la ampliación de accesibilidad hacia todas las pantallas, la incorporación formal del escenario de préstamo sin disponibilidad desde la interfaz y una prueba completa de consistencia entre API e interfaz después de una devolución.

Estas brechas no impiden la evaluación del proyecto final, pero constituyen acciones concretas para el proceso de mejora continua.

---

# 9. Indicadores de cobertura

Total de requisitos identificados: 18.

Requisitos con al menos una evidencia de prueba: 18.

Cobertura de requisitos:

**18 / 18 = 100 %**

La cobertura del 100 % indica que todos los requisitos identificados poseen al menos una prueba, control o mecanismo de verificación asociado; no significa que todos los riesgos posibles estén completamente eliminados.

Dentro del catálogo obligatorio de treinta casos existen:

- 30 casos documentados.
- 28 casos automatizados.
- 2 casos pendientes de automatización.

Porcentaje de automatización del catálogo:

**28 / 30 = 93.33 %**

---

# 10. Conclusión

La trazabilidad entre requisitos y pruebas demuestra que Biblioteca Virtual dispone de cobertura para las funciones críticas relacionadas con autenticación, catálogo, lectores, préstamos, devoluciones, seguridad, rendimiento, accesibilidad y mantenibilidad.

La matriz también permite identificar claramente qué controles son ejecutados automáticamente dentro del pipeline CI/CD y qué escenarios deben incorporarse posteriormente.

Con esta documentación se establece una relación verificable entre requisitos, riesgos, casos de prueba, automatización y características de calidad ISO/IEC 25010, proporcionando evidencia objetiva para la evaluación del producto y para la decisión final de liberación.
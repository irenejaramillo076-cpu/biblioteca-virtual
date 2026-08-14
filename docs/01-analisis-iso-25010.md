# Análisis de Calidad del Producto según ISO/IEC 25010:2023

## 1. Objetivo

El presente análisis tiene como objetivo evaluar la calidad del sistema Biblioteca Virtual mediante el modelo de calidad definido por ISO/IEC 25010:2023, considerando las características que pueden ser verificadas mediante pruebas funcionales, automatización, análisis estático, seguridad, rendimiento y evaluación de la interacción con el usuario.

Biblioteca Virtual es una aplicación web orientada a la administración de libros, lectores y préstamos, permitiendo realizar operaciones de autenticación, consulta y mantenimiento del catálogo, registro de lectores, generación de préstamos y procesamiento de devoluciones.

La evaluación se apoya en evidencias obtenidas mediante Jest, Playwright, Axe, k6, OWASP ZAP, npm audit, SonarQube Cloud, Allure y GitHub Actions.

## 2. Modelo ISO/IEC 25010:2023

La edición 2023 de ISO/IEC 25010 establece nueve características para evaluar la calidad de un producto de software:

1. Adecuación funcional.
2. Eficiencia del desempeño.
3. Compatibilidad.
4. Capacidad de interacción.
5. Fiabilidad.
6. Seguridad.
7. Mantenibilidad.
8. Flexibilidad.
9. Seguridad operacional o Safety.

## 3. Evaluación de Biblioteca Virtual

| Característica | Evidencia en Biblioteca Virtual | Evaluación preliminar |
|---|---|---|
| Adecuación funcional | El sistema permite autenticación, administración del catálogo, registro de lectores, préstamos y devoluciones; la funcionalidad se valida mediante 36 pruebas unitarias y 13 escenarios E2E | Alta |
| Eficiencia del desempeño | Se utiliza k6 para validar GET /api/libros bajo carga de hasta 50 usuarios virtuales, con umbrales definidos para tiempo de respuesta, errores y checks | Alta |
| Compatibilidad | La aplicación utiliza tecnologías web estándar y se ejecuta mediante navegador; la automatización principal se ejecuta actualmente sobre Chromium | Media |
| Capacidad de interacción | La interfaz utiliza elementos accesibles y existe una prueba Axe que verifica ausencia de impactos critical y serious en la pantalla principal | Media-Alta |
| Fiabilidad | Las pruebas automatizadas validan operaciones críticas y el pipeline ejecuta verificaciones independientes en cada cambio; todavía deben ampliarse escenarios de concurrencia y recuperación | Media-Alta |
| Seguridad | Existe autenticación mediante token, auditoría de dependencias de producción, OWASP ZAP y análisis con SonarQube Cloud; npm audit sobre producción reporta cero vulnerabilidades conocidas | Alta |
| Mantenibilidad | El backend está separado por rutas y servicios; las pruebas utilizan Page Object Model, fixtures y mocks; además se utiliza análisis estático con SonarQube Cloud | Alta |
| Flexibilidad | La solución utiliza Node.js, Express, SQLite y tecnologías web estándar; puede ejecutarse localmente y en CI, aunque todavía no posee una estrategia completa de despliegue multiplataforma | Media |
| Safety | La aplicación no pertenece a un dominio de seguridad crítica; sin embargo, deben evitarse operaciones que puedan producir inconsistencias de inventario, préstamos duplicados o devoluciones repetidas | Media |

## 4. Características prioritarias

Para Biblioteca Virtual se consideran prioritarias las siguientes características:

| Prioridad | Característica | Justificación |
|---|---|---|
| 1 | Adecuación funcional | Los procesos de préstamo, devolución, catálogo y lectores constituyen el núcleo del sistema y cualquier error afecta directamente la operación de la biblioteca |
| 2 | Fiabilidad | El sistema debe mantener consistencia entre libros disponibles, préstamos activos y devoluciones, incluyendo operaciones repetidas y concurrentes |
| 3 | Seguridad | La aplicación administra sesiones y datos de usuarios, por lo que requiere protección frente a accesos no autorizados, vulnerabilidades y manipulación de información |
| 4 | Eficiencia del desempeño | Las consultas y operaciones principales deben mantener tiempos de respuesta aceptables incluso con múltiples usuarios |
| 5 | Mantenibilidad | El proyecto debe permitir incorporar pruebas, corregir defectos y extender funcionalidades sin introducir regresiones |

La capacidad de interacción también se considera relevante, especialmente en accesibilidad, prevención de errores y claridad de las acciones presentadas al usuario, aunque para este proyecto su prioridad es secundaria respecto de los procesos funcionales y de consistencia de datos.

## 5. Hallazgos principales

La evaluación evidencia una base sólida de automatización y control de calidad, especialmente en adecuación funcional, rendimiento, seguridad y mantenibilidad.

La suite unitaria supera el mínimo requerido para el proyecto y alcanza 36 pruebas automatizadas con una cobertura de 100 % en statements, 100 % en functions, 100 % en lines y 98.33 % en branches para los módulos incluidos en el alcance.

Las pruebas E2E validan 13 flujos completos mediante Playwright y generan reportes de ejecución con Allure.

El pipeline de GitHub Actions integra pruebas unitarias, pruebas E2E, análisis de dependencias, rendimiento con k6, seguridad dinámica con OWASP ZAP y análisis estático mediante SonarQube Cloud.

Sin embargo, se identifican oportunidades de mejora en concurrencia de préstamos, consistencia entre interfaz y API, recuperación ante errores, compatibilidad con múltiples navegadores y ampliación de las pruebas de accesibilidad.

## 6. Plan de mejora

| Acción de mejora | Característica ISO 25010 | Prioridad | Evidencia esperada |
|---|---|---|---|
| Incorporar escenarios de concurrencia sobre el último ejemplar disponible | Fiabilidad / Adecuación funcional | Alta | Solo una solicitud debe registrar correctamente el préstamo |
| Validar devolución duplicada | Fiabilidad | Alta | El inventario no debe incrementarse dos veces |
| Comprobar consistencia entre API e interfaz | Adecuación funcional | Alta | Los valores mostrados en UI deben coincidir con la API |
| Ampliar pruebas de seguridad sobre autenticación y sesiones | Seguridad | Alta | Casos negativos y manipulación de sesión controlados |
| Mantener auditoría de dependencias de producción en CI | Seguridad | Alta | Cero vulnerabilidades high o critical |
| Ejecutar pruebas en más de un navegador | Compatibilidad | Media | Evidencia Chrome/Chromium y otro navegador |
| Ampliar Axe a login, catálogo y préstamos | Capacidad de interacción | Media | Cero impactos critical y serious |
| Mantener umbral p95 inferior a 500 ms en k6 | Eficiencia del desempeño | Media | Resultados k6 dentro de los umbrales |
| Mantener Quality Gate de SonarQube Cloud | Mantenibilidad | Media | Quality Gate aprobado |
| Incorporar pruebas de estados inválidos y operaciones repetidas | Fiabilidad / Safety | Alta | El sistema conserva integridad de los datos |

## 7. Conclusión

Biblioteca Virtual presenta un nivel de calidad favorable para continuar con el proceso de aseguramiento de calidad, debido a que dispone de automatización funcional, análisis de código, controles de seguridad, pruebas de rendimiento y ejecución continua mediante GitHub Actions.

El análisis basado en ISO/IEC 25010 permite determinar que las áreas con mayor prioridad para el proyecto final son adecuación funcional, fiabilidad, seguridad, eficiencia del desempeño y mantenibilidad.

Las siguientes fases del proyecto se concentrarán en fortalecer los riesgos identificados mediante un plan de pruebas basado en IEEE 29119, una matriz de trazabilidad y un conjunto de al menos treinta casos de prueba, complementando la automatización ya disponible.
# Biblioteca Virtual | Suite profesional de QA

[![QA Pipeline](https://github.com/irenejaramillo076-cpu/biblioteca-virtual/actions/workflows/qa-pipeline.yml/badge.svg)](https://github.com/irenejaramillo076-cpu/biblioteca-virtual/actions/workflows/qa-pipeline.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=irenejaramillo076-cpu_biblioteca-virtual&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=irenejaramillo076-cpu_biblioteca-virtual)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=irenejaramillo076-cpu_biblioteca-virtual&metric=coverage)](https://sonarcloud.io/summary/new_code?id=irenejaramillo076-cpu_biblioteca-virtual)

Biblioteca Virtual es un sistema web para administrar el catálogo, los lectores y el ciclo completo de préstamo y devolución de libros; este repositorio incorpora una suite automatizada con Jest, Playwright, Gherkin, Axe, Allure, k6, SonarQube Cloud, npm audit y OWASP ZAP.

## Resultados verificados

| Control de calidad | Implementación | Resultado local |
|---|---|---|
| Pruebas unitarias | Jest y Supertest | 36 de 36 aprobadas |
| Cobertura | Istanbul integrado en Jest | 100% statements, 98.33% branches, 100% functions y 100% lines |
| Mocks | Base de datos y generador externo de UUID | Más de 6 pruebas con dependencias simuladas |
| Pruebas E2E | Playwright en modo headless | 13 escenarios |
| BDD | Features Gherkin | 10 escenarios en 3 features |
| Page Object Model | 5 Page Objects | Selectores centralizados fuera de los archivos spec |
| Accesibilidad | Axe para reglas WCAG | Sin impactos critical ni serious en la pantalla principal |
| Dependencias productivas | npm audit --omit=dev | 0 vulnerabilidades High o Critical |
| Reportes | Coverage, HTML de Playwright y Allure | Generación automática |

La cobertura se calcula solamente sobre los módulos críticos incluidos en `collectCoverageFrom`; el pipeline falla automáticamente si cualquiera de las cuatro métricas baja de 70%.

## Estructura obligatoria

```text
biblioteca-virtual/
├── README.md
├── .github/
│   └── workflows/
│       └── qa-pipeline.yml
├── tests/
│   ├── unit/
│   ├── e2e/
│   │   ├── pages/
│   │   └── features/
│   └── performance/
├── reports/
└── test-data/
```

El código de la aplicación permanece separado en `backend/` y `frontend/`; los reportes generados no se versionan, excepto `reports/README.md`, porque GitHub Actions los publica como artefactos de cada ejecución.

## Tecnologías

- Backend: Node.js 22, Express y SQLite con `better-sqlite3`
- Frontend: HTML, CSS y JavaScript nativo
- Unitarias: Jest, Supertest e Istanbul
- E2E: Playwright, Page Object Model y Allure
- BDD: Cucumber/Gherkin
- Accesibilidad: `@axe-core/playwright`
- CI/CD: GitHub Actions
- Calidad y seguridad: SonarQube Cloud, npm audit y OWASP ZAP
- Rendimiento: k6

## Instalación y ejecución

Requisito: Node.js 22 o superior.

```bash
cd backend
npm ci
npm run seed
npm start
```

La aplicación estará disponible en `http://localhost:3000`; el correo y la contraseña no se almacenan en el repositorio, antes de iniciar el servidor deben definirse `QA_ADMIN_EMAIL` y `QA_ADMIN_PASSWORD` con valores privados.

```powershell
$env:QA_ADMIN_EMAIL = Read-Host "Correo de demostración"
$env:QA_ADMIN_PASSWORD = Read-Host "Contraseña de demostración"
npm start
```

Playwright genera credenciales efímeras y aleatorias durante cada ejecución automatizada; así el pipeline continúa siendo reproducible sin publicar secretos funcionales.

## Ejecución de las pruebas

Todas las instrucciones se ejecutan desde `backend/`.

### Pruebas unitarias y cobertura

```bash
npm run test:unit
```

El reporte HTML queda en `backend/coverage/lcov-report/index.html`; `jest.config.js` exige un mínimo global de 70% en statements, branches, functions y lines.

### Pruebas E2E headless

La primera vez se instala el navegador de Playwright y después se ejecutan los escenarios:

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

Los 13 escenarios cubren inicio de sesión válido, inicio inválido, cierre de sesión, creación, búsqueda, edición y eliminación de libros, registro de lectores, registro y devolución de préstamos, filtro de préstamos activos y una auditoría de accesibilidad con Axe.

### Reporte Allure

```bash
npm run allure:generate
npx allure open ../reports/allure-report
```

En GitHub se descarga desde `Actions > QA Pipeline > ejecución > Artifacts > allure-report`; las capturas, trazas y videos de fallos se publican en `e2e-failure-evidence`.

### Publicación de Allure en GitHub Pages

El workflow manual `Publish Allure Report` vuelve a ejecutar los escenarios, genera el sitio y lo publica sin modificar el pipeline obligatorio; antes de utilizarlo, la persona administradora activa `Settings > Pages > Build and deployment > Source > GitHub Actions`, después abre `Actions > Publish Allure Report > Run workflow`. El enlace permanente resultante es `https://irenejaramillo076-cpu.github.io/biblioteca-virtual/`.

### Prueba de rendimiento k6

Con el servidor iniciado en otra terminal:

```bash
k6 run --out json=../reports/k6-results.json ../tests/performance/load-test.js
```

El script prueba `GET /api/libros`, incrementa la carga hasta 50 usuarios virtuales y exige p(95) menor de 500 ms, menos de 1% de solicitudes fallidas y más de 99% de checks aprobados.

## Diseño de las pruebas

### Pruebas unitarias

Los nombres describen la conducta esperada; cada prueba restablece sus mocks, no depende del orden de ejecución e incluye valores vacíos, nulos, recursos inexistentes, credenciales inválidas, cantidades límite y errores inesperados de base de datos. La base SQLite no se utiliza en estas pruebas; su interfaz se simula para mantenerlas rápidas e independientes.

### Page Object Model

Los selectores y las acciones reutilizables están en `tests/e2e/pages/`; los archivos `*.spec.js` expresan solamente el flujo y las verificaciones de cada escenario. Los datos se crean mediante fixtures de API para evitar que una prueba dependa de otra.

### Features BDD

Las features ubicadas en `tests/e2e/features/` describen autenticación, catálogo y préstamos desde la perspectiva de la persona bibliotecaria; contienen 10 escenarios Gherkin, superando el mínimo solicitado de 6.

## Pipeline CI/CD

`.github/workflows/qa-pipeline.yml`  se activa en push y pull_request sobre las ramas configuradas para QA, incluyendo main y proyecto-final-qa:

| Job | Responsabilidad | Condición de fallo |
|---|---|---|
| `unit-tests` | Instala dependencias, ejecuta 36 tests y publica coverage | Cobertura menor de 70% o test fallido |
| `e2e-tests` | Depende de unitarias, instala Chromium, ejecuta 13 escenarios headless y genera Allure | Escenario E2E o auditoría Axe fallida |
| `security-scan` | Ejecuta `npm audit` en paralelo | Vulnerabilidad high o critical |
| `sonarcloud-scan` | Publica cobertura y espera el Quality Gate | Quality Gate rechazado |
| `load-tests` | Ejecuta k6 y publica JSON, resumen HTML y log del servidor | Umbral de rendimiento incumplido |
| `zap-scan` | Ejecuta OWASP ZAP Baseline y publica los reportes | El escaneo queda documentado como capa adicional |

Los artefactos disponibles son `coverage-report`, `allure-report`, `e2e-failure-evidence` cuando existe un fallo, `k6-results` y `zap-results`.

## Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/login` | Inicia una sesión de bibliotecario |
| GET | `/api/auth/session` | Valida el Bearer token |
| POST | `/api/auth/logout` | Revoca la sesión |
| GET, POST | `/api/libros` | Consulta o registra libros |
| GET, PUT, DELETE | `/api/libros/:id` | Consulta, edita o elimina un libro |
| GET, POST | `/api/usuarios` | Consulta o registra lectores |
| GET, POST | `/api/prestamos` | Consulta o registra préstamos |
| PUT | `/api/prestamos/:id/devolver` | Registra una devolución |

## IA en el proyecto

La inteligencia artificial se integró al flujo de QA como herramienta de apoyo para diseño de casos, generación de automatización y construcción de Page Objects; todos los resultados generados fueron revisados y ejecutados antes de incorporarse a la suite.

### Compilación cronológica del uso de Inteligencia Artificial

Durante el semestre se utilizaron herramientas de inteligencia artificial como apoyo al proceso de Quality Assurance de Biblioteca Virtual. Las herramientas de IA formalmente documentadas fueron **ChatGPT** y **GitHub Copilot**.

La IA no fue utilizada para aceptar automáticamente resultados ni para sustituir la revisión del QA Engineer. Cada propuesta fue contrastada con los requisitos, el código, el DOM de la aplicación y los resultados reales de ejecución.

Los tiempos ahorrados presentados a continuación son estimaciones retrospectivas del equipo, debido a que al inicio del semestre no se utilizó un sistema formal de time tracking.

| Etapa | Herramienta | Problema que ayudó a resolver | Resultado | Efectividad | Tiempo estimado ahorrado |
|---|---|---|---|---|---:|
| Diseño de pruebas de autenticación | ChatGPT | Identificar riesgos de seguridad en Login | Se seleccionaron 5 casos de seguridad | Alta, 5/5 tests aprobados | ≈ 30 min |
| Diseño de pruebas del catálogo | ChatGPT | Identificar valores límite y entradas inválidas | Se seleccionaron 5 casos de frontera | Alta, 5/5 tests aprobados | ≈ 25 min |
| Análisis de riesgos de préstamos | ChatGPT | Diseñar escenarios de concurrencia, consistencia y estados inválidos | Se seleccionaron 5 casos adicionales | Alta, 5/5 tests aprobados | ≈ 30 min |
| Automatización con Page Objects | GitHub Copilot | Generar una base inicial para nuevos Page Objects y pruebas E2E | Generó 2 Page Objects y 4 tests | Media inicialmente; requirió revisión humana | ≈ 15 min |
| Corrección de pruebas generadas por Copilot | GitHub Copilot + revisión humana | Adaptar rutas, selectores, autenticación y datos al sistema real | Resultado final 4/4 aprobado | Alta después de corrección | ≈ 10 min netos |
| Investigación del fallo de Axe | ChatGPT | Analizar una aparente violación de contraste | Se identificó que el problema estaba relacionado con la animación CSS y sincronización del test | Alta | ≈ 20 min |
| Diseño de pruebas negativas y de consistencia | ChatGPT | Ampliar escenarios sobre datos incompletos, inexistentes y operaciones repetidas | Casos incorporados al análisis de riesgos | Alta | ≈ 25 min |
| Análisis y documentación del proceso QA | ChatGPT | Organizar evidencias, métricas y resultados obtenidos durante las pruebas | Facilitó la consolidación técnica del proyecto | Alta con validación humana | ≈ 45 min |

**Tiempo estimado total ahorrado: aproximadamente 200 minutos, equivalente a 3 horas y 20 minutos de trabajo.**

Esta estimación representa tiempo de análisis y creación inicial que habría requerido mayor trabajo manual. No significa que la IA eliminara la necesidad de revisión; parte del tiempo ahorrado fue utilizado posteriormente en validar, corregir y mejorar las propuestas generadas.

### Evidencia cuantitativa de efectividad

#### ChatGPT

Se utilizaron tres grupos principales de prompts para generar escenarios de prueba:

| Área | Tests seleccionados | Resultado |
|---|---:|---:|
| Seguridad del Login | 5 | 5/5 aprobados |
| Valores límite del Catálogo | 5 | 5/5 aprobados |
| Riesgos de Préstamos | 5 | 5/5 aprobados |
| **Total** | **15** | **15/15 aprobados** |

Esto representa:

**100 % de aprobación de los 15 tests seleccionados después de la revisión del QA Engineer.**

La revisión humana permitió además rechazar recomendaciones incorrectas. Un ejemplo fue la propuesta de considerar un ISBN vacío como un error obligatorio; después de revisar las reglas reales del sistema se determinó que dicho campo era opcional y la prueba no fue incorporada con una expectativa incorrecta.

#### GitHub Copilot

GitHub Copilot fue utilizado para generar una base de automatización mediante Page Object Model.

La primera ejecución produjo:

| Resultado inicial | Cantidad |
|---|---:|
| Aprobados | 0 |
| Fallidos | 3 |
| Omitidos | 1 |
| Total | 4 |

Los principales problemas detectados fueron:

- ruta `/dashboard` inexistente;
- locators que no correspondían al DOM real;
- mecanismo incorrecto de autenticación;
- datos de prueba incompatibles con Biblioteca Virtual.

Después de la revisión humana se conservaron las partes útiles de la propuesta y se corrigieron las suposiciones incorrectas.

Resultado final:

| Resultado final | Cantidad |
|---|---:|
| Aprobados | 4 |
| Fallidos | 0 |
| Omitidos | 0 |
| Total | 4 |

**Resultado BEFORE: 0/4 aprobadas.**

**Resultado AFTER: 4/4 aprobadas.**

Este caso representa una de las principales evidencias del proyecto sobre la necesidad de utilizar un modelo **Human-in-the-Loop**.

### Flujo Human-in-the-Loop utilizado

El proceso aplicado durante el proyecto fue:

`Problema → Prompt → Propuesta IA → Revisión humana → Adaptación → Ejecución → Evidencia → Aceptación o rechazo`

Una prueba solamente se incorporó cuando su comportamiento pudo justificarse mediante los requisitos y verificarse mediante ejecución real.

### Herramientas complementarias

Percy fue utilizado para Visual Regression Testing y permitió detectar una diferencia visual controlada de **11.21 %**.

Sin embargo, Percy **no se contabiliza como una de las herramientas de inteligencia artificial del proyecto**. Se documenta como herramienta complementaria de automatización visual.

Las dos herramientas de IA utilizadas formalmente fueron:

- **ChatGPT**
- **GitHub Copilot**

### Reflexión crítica grupal

La utilización de inteligencia artificial modificó la manera de abordar las actividades de QA porque permitió comenzar el análisis desde una base más amplia de riesgos y escenarios posibles. Antes de incorporar IA, gran parte del tiempo debía dedicarse a elaborar manualmente variaciones de casos positivos, negativos, valores límite y situaciones poco frecuentes; con el apoyo de estas herramientas fue posible generar rápidamente una primera propuesta y dedicar una mayor proporción del esfuerzo a analizar si realmente representaba el comportamiento esperado del sistema.

La experiencia también demostró que una respuesta técnicamente convincente puede estar equivocada respecto al producto real. GitHub Copilot generó pruebas con rutas y selectores inexistentes, mientras ChatGPT produjo propuestas que tuvieron que compararse con reglas reales del negocio antes de aceptarse. Por ello, el equipo no considera adecuado utilizar IA como mecanismo autónomo de aprobación de calidad.

El principal beneficio observado fue la reducción del tiempo utilizado para generar ideas iniciales, ampliar escenarios y analizar problemas. La principal limitación fue la tendencia de estas herramientas a completar información faltante mediante supuestos que pueden no coincidir con la implementación.

El equipo **sí recomendaría utilizar IA en futuros proyectos de QA**, especialmente para análisis de riesgos, generación inicial de casos, revisión de escenarios negativos, documentación y apoyo durante investigaciones técnicas; sin embargo, siempre debe mantenerse una revisión humana antes de incorporar código, pruebas o conclusiones al producto.

La principal lección obtenida es que:

**la IA acelera el QA, pero la responsabilidad sobre la calidad continúa siendo humana.**

### Requisito A — Prompt Engineering para QA

Se diseñaron tres prompts estratégicos orientados a diferentes riesgos del sistema.

| Prompt | Área evaluada | Casos seleccionados para automatización | Primera ejecución | Tiempo |
|---|---|---:|---:|---:|
| Prompt 1 | Seguridad del Login | 5 | 5/5 aprobados | 13.1 s |
| Prompt 2 | Valores límite del Catálogo | 5 | 5/5 aprobados | 7.8 s |
| Prompt 3 | Riesgos y consistencia de Préstamos | 5 | 5/5 aprobados | 1.0 s |
| Total | — | 15 | 15/15 aprobados | 21.9 s |

Los tests generados se almacenaron en `tests/ai-generated/`.

La revisión humana fue necesaria incluso cuando los tests seleccionados funcionaron correctamente; por ejemplo, la IA propuso evaluar el ISBN vacío como posible escenario negativo, pero al revisar la implementación se confirmó que el ISBN es opcional, por lo que no se creó una prueba con una expectativa incorrecta.

También se identificaron escenarios duplicados respecto de la suite existente y casos que requerían revisión de requisitos antes de ser automatizados.

### Requisito A — GitHub Copilot y Page Object Model

GitHub Copilot fue utilizado para generar dos Page Objects adicionales:

- `DashboardPage.js`
- `CatalogSearchPage.js`

También generó `tests/ai-generated/copilot-e2e.spec.js` con cuatro pruebas E2E.

La primera propuesta de Copilot no funcionó correctamente en el proyecto real.

| Estado primera ejecución | Cantidad |
|---|---:|
| Aprobados | 0 |
| Fallidos | 3 |
| Omitidos | 1 |
| Total | 4 |

Durante la revisión se detectó que Copilot asumió una ruta `/dashboard` inexistente, utilizó locators genéricos que no correspondían al DOM real y propuso un mecanismo de credenciales diferente al utilizado por Biblioteca Virtual.

Se conservaron la arquitectura Page Object Model, CommonJS y el uso de locators accesibles; se modificaron la navegación, los selectores, los datos de prueba y el flujo de autenticación.

Después de la revisión humana:

| Estado final | Cantidad |
|---|---:|
| Aprobados | 4 |
| Fallidos | 0 |
| Omitidos | 0 |
| Total | 4 |

El resultado final fue 4/4 pruebas aprobadas en 14.6 segundos.

El código original propuesto por Copilot se conserva en `tests/ai-generated/evidence/` para documentar la comparación BEFORE/AFTER.

### Requisito B — Visual Regression Testing con Percy

Se integró Percy con Playwright mediante `@percy/cli` y `@percy/playwright`.

Se creó un snapshot visual denominado `Biblioteca Virtual - Catalogo`.

El primer build fue utilizado como baseline; posteriormente se aplicó un cambio visual temporal en el título y botón principal del catálogo y se ejecutó nuevamente el mismo snapshot.

Percy detectó correctamente una diferencia visual de **11.21 %** entre el baseline y el nuevo build.

Después de obtener la evidencia, el cambio CSS temporal fue eliminado para conservar el diseño original de la aplicación.

Las capturas de esta evaluación se almacenan en `reports/visual-regression/`.

### Evaluación crítica del uso de IA

La IA permitió ampliar rápidamente la cobertura de pruebas y proponer escenarios que incluyen seguridad, valores límite, integridad de datos y concurrencia; sin embargo, los resultados demostraron que la generación automática no reemplaza la revisión del QA Engineer.

Los 15 tests seleccionados a partir de los prompts funcionaron en su primera ejecución, pero fue necesario descartar o reinterpretar otras recomendaciones de acuerdo con las reglas reales del sistema.

El caso de GitHub Copilot mostró de manera más evidente esta necesidad; ninguna de las cuatro pruebas propuestas inicialmente pudo considerarse aprobada en la primera ejecución, mientras que después de revisar el DOM, las rutas, los Page Objects existentes y los datos de prueba, las cuatro pruebas fueron ejecutadas satisfactoriamente.

Por lo tanto, el mayor beneficio de la IA fue acelerar el diseño y proporcionar una base de trabajo; la validación humana continuó siendo indispensable para garantizar que las pruebas representaran el comportamiento real de Biblioteca Virtual.

## Evidencias para la entrega

1. URL del repositorio: `https://github.com/irenejaramillo076-cpu/biblioteca-virtual`
2. Pipeline: `https://github.com/irenejaramillo076-cpu/biblioteca-virtual/actions/workflows/qa-pipeline.yml`
3. Dashboard de SonarQube Cloud: `https://sonarcloud.io/summary/new_code?id=irenejaramillo076-cpu_biblioteca-virtual`
4. Coverage: descargar `coverage-report` y abrir `lcov-report/index.html`
5. Allure publicado: `https://irenejaramillo076-cpu.github.io/biblioteca-virtual/`; como respaldo, descargar `allure-report` desde la ejecución verde
6. k6: descargar `k6-results` y abrir `k6-summary.html`
7. ZAP: descargar `zap-results` y abrir `zap-report.html`

Para la presentación final de 20 minutos se realizarán 15 minutos de exposición y se reservarán 5 minutos para preguntas. La demostración en vivo incluirá la ejecución de al menos 3 pruebas E2E y la visualización del pipeline CI/CD con sus jobs y evidencias principales.
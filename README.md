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
| Dependencias | npm audit | 0 vulnerabilidades conocidas |
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

`.github/workflows/qa-pipeline.yml` se activa en cada `push` y `pull_request` dirigido a `main`; contiene los siguientes jobs:

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

## Uso de IA en este Proyecto

| Herramienta IA | Tarea | Prompt utilizado | Resultado | Correcciones aplicadas |
|---|---|---|---|---|
| GitHub Copilot | Generar una base para Page Objects | `Create a Page Object for the login page with Playwright, using accessible locators and reusable actions` | Propuso la clase inicial y acciones de autenticación | Se adaptaron nombres al español, se corrigieron localizadores, se trasladaron todos los selectores fuera de los specs y se agregaron verificaciones explícitas |
| ChatGPT Codex | Auditar y completar la suite profesional | `Actúa como QA Engineer, revisa este repositorio contra la rúbrica, crea al menos 25 pruebas unitarias, 12 E2E con POM, 6 escenarios Gherkin, Axe, Allure y el pipeline obligatorio` | Detectó faltantes y generó pruebas, fixtures, configuración y documentación | El equipo validó cada flujo contra la interfaz real, eliminó duplicados, corrigió una etiqueta de accesibilidad, endureció el umbral de cobertura y comprobó los comandos localmente |

La IA se utilizó como apoyo para acelerar el diseño y la revisión; la aceptación final se basó en ejecuciones reproducibles de Jest, Playwright, Axe, Allure y npm audit, no solamente en el contenido generado.

## Evidencias para la entrega

1. URL del repositorio: `https://github.com/irenejaramillo076-cpu/biblioteca-virtual`
2. Pipeline: `https://github.com/irenejaramillo076-cpu/biblioteca-virtual/actions/workflows/qa-pipeline.yml`
3. Dashboard de SonarQube Cloud: `https://sonarcloud.io/summary/new_code?id=irenejaramillo076-cpu_biblioteca-virtual`
4. Coverage: descargar `coverage-report` y abrir `lcov-report/index.html`
5. Allure publicado: `https://irenejaramillo076-cpu.github.io/biblioteca-virtual/`; como respaldo, descargar `allure-report` desde la ejecución verde
6. k6: descargar `k6-results` y abrir `k6-summary.html`
7. ZAP: descargar `zap-results` y abrir `zap-report.html`

Para la demostración de 10 minutos se recomienda mostrar primero el login, ejecutar `npm run test:unit`, ejecutar una selección de Playwright con `npm run test:e2e`, abrir Allure y finalizar mostrando todos los jobs verdes del pipeline.

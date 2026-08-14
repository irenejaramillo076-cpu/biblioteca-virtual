# Suite de Automatización — Biblioteca Virtual

## 1. Objetivo

El presente documento describe la suite de automatización implementada para Biblioteca Virtual y las evidencias utilizadas para cumplir los requisitos técnicos del proyecto final de Quality Assurance.

La estrategia automatizada cubre pruebas unitarias, pruebas End-to-End, cobertura de código, integración continua, análisis estático, reportes de ejecución, seguridad, accesibilidad y rendimiento.

La automatización fue diseñada para que los controles principales puedan ejecutarse localmente y también de forma reproducible mediante GitHub Actions.

## 2. Resumen de cumplimiento

| Requisito del proyecto | Mínimo solicitado | Implementado | Estado |
|---|---:|---:|---|
| Pruebas unitarias | 20 | 36 | Cumplido |
| Pruebas E2E | 10 | 13 | Cumplido |
| CI/CD | GitHub Actions | Pipeline automatizado | Cumplido |
| Análisis de código | SonarQube / SonarCloud | SonarQube Cloud | Cumplido |
| Reporte de ejecución | Allure o equivalente | Allure | Cumplido |

Adicionalmente se integraron controles de accesibilidad con Axe, rendimiento con k6, seguridad dinámica con OWASP ZAP, auditoría de dependencias con npm audit y regresión visual con Percy.

## 3. Arquitectura de la automatización

La estructura principal utilizada es:

```text
biblioteca-virtual/
├── backend/
│   ├── routes/
│   ├── services/
│   ├── database/
│   ├── jest.config.js
│   └── package.json
│
├── tests/
│   ├── unit/
│   │   ├── auth.routes.test.js
│   │   └── libros.routes.test.js
│   │
│   ├── e2e/
│   │   ├── auth.spec.js
│   │   ├── libros.spec.js
│   │   ├── prestamos.spec.js
│   │   ├── usuarios.spec.js
│   │   ├── accessibility.spec.js
│   │   ├── pages/
│   │   └── support/
│   │
│   ├── performance/
│   └── ai-generated/
│
├── reports/
├── .github/workflows/
├── sonar-project.properties
└── README.md
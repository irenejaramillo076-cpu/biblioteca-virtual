# ENTREGABLE 2 — SUITE DE PRUEBAS FINAL

## Biblioteca Virtual

## 1. Objetivo

El presente documento resume las mejoras incorporadas a la suite de Quality Assurance de Biblioteca Virtual respecto al proyecto parcial y consolida las evidencias técnicas utilizadas para el Proyecto Final.

La versión final integra pruebas funcionales, unitarias, end-to-end, seguridad, accesibilidad, rendimiento, análisis estático, cobertura, reportes automáticos e integración continua.

---

# 2. Mejoras incorporadas respecto al proyecto parcial

Durante la evolución del proyecto se incorporaron mejoras orientadas a ampliar cobertura, estabilidad y capacidad de detección de riesgos.

Entre las mejoras realizadas se encuentran:

- ampliación de las pruebas unitarias;
- ampliación de escenarios E2E;
- pruebas negativas de autenticación;
- pruebas de SQL Injection;
- pruebas de XSS;
- valores límite;
- pruebas sobre datos incompletos;
- pruebas sobre libros inexistentes;
- pruebas sobre lectores inexistentes;
- análisis de concurrencia;
- doble devolución;
- consistencia de disponibilidad;
- integración de Axe;
- integración de OWASP ZAP;
- integración de k6;
- integración de SonarQube Cloud;
- generación de Allure;
- regresión visual mediante Percy;
- utilización documentada de inteligencia artificial;
- fortalecimiento del pipeline GitHub Actions.

---

# 3. Pruebas unitarias

La suite final contiene:

**36 pruebas unitarias**

Resultado:

**36/36 aprobadas**

Herramientas:

- Jest;
- Supertest;
- mocks de dependencias.

Las pruebas cubren principalmente autenticación y operaciones relacionadas con libros.

---

# 4. Pruebas End-to-End

La suite principal contiene:

**13 pruebas E2E**

Resultado final:

**13/13 aprobadas**

Pass Rate:

**100 %**

Los escenarios principales cubren:

- login válido;
- login inválido;
- logout;
- creación de libros;
- búsqueda;
- edición;
- eliminación;
- registro de lectores;
- préstamos;
- devoluciones;
- filtro de préstamos activos;
- accesibilidad mediante Axe.

---

# 5. Casos de prueba documentados

El Proyecto Final contiene:

**30 casos de prueba formales**

Distribución:

- 10 de autenticación;
- 10 de catálogo;
- 10 de préstamos.

De estos casos:

**28 de 30 poseen automatización total o parcial**

Porcentaje:

**93.33 %**

---

# 6. Coverage

Los resultados finales fueron:

| Métrica | Resultado |
|---|---:|
| Statements | 100 % |
| Branches | 98.33 % |
| Functions | 100 % |
| Lines | 100 % |

El requisito del Proyecto Final establece:

**Coverage mínimo = 70 %**

Resultado:

**✅ Cumplido ampliamente**

---

# 7. Accesibilidad

Se incorporó:

`@axe-core/playwright`

La ejecución final obtuvo:

- Critical: 0;
- Serious: 0.

Durante la evaluación se investigó una alerta temporal de contraste provocada por una animación CSS.

Después de corregir la sincronización:

**13/13 E2E aprobadas**

---

# 8. Seguridad

## npm audit

Se utiliza:

`npm audit --omit=dev --audit-level=high`

Resultado:

**0 vulnerabilidades High o Critical en dependencias productivas**

## OWASP ZAP

Resultado:

| Severidad | Cantidad |
|---|---:|
| High | 0 |
| Medium | 5 |
| Low | 5 |
| Informational | 3 |

Los hallazgos se encuentran documentados y priorizados dentro del Reporte Ejecutivo.

El pipeline interpreta las advertencias esperadas de ZAP como `warning` documentado y mantiene el job en estado Success, mientras que errores reales del escaneo continúan configurados para provocar fallo del job.

---

# 9. Rendimiento

La evaluación mediante k6 obtuvo:

| Métrica | Resultado |
|---|---:|
| P95 | 1.45 ms |
| Error Rate | 0 % |
| Requests | 2,707 |
| Checks | 8,121 |
| Checks aprobados | 8,121 |

Resultado:

**✅ Todos los thresholds definidos fueron cumplidos**

---

# 10. CI/CD

La automatización utiliza:

**GitHub Actions**

El pipeline contiene los siguientes controles:

- Unit Tests + Coverage;
- E2E Playwright + Axe + Allure;
- Dependency Security Scan;
- OWASP ZAP Baseline Scan;
- k6 Load Test;
- SonarQube Cloud.

Los resultados son publicados mediante artefactos automáticos.

La validación final se realizó en dos niveles: primero mediante el Pull Request #1 hacia `main`, donde SonarQube Cloud ejecutó el análisis y aprobó el Quality Gate; posteriormente mediante el pipeline #28 sobre la rama `main` después del merge.

---

# 11. Allure

La suite E2E genera automáticamente un reporte Allure.

El reporte permite consultar:

- pruebas ejecutadas;
- pruebas aprobadas;
- pruebas fallidas;
- tiempos;
- historial;
- evidencias de ejecución.

El pipeline publica el artefacto:

`allure-report`

---

# 12. SonarQube Cloud

SonarQube Cloud se utiliza como herramienta de análisis estático y Quality Gate.

Durante el Pull Request final hacia `main`, el análisis de SonarQube Cloud obtuvo:

- **Quality Gate Passed**;
- **0 New Issues**;
- **0 Security Hotspots** en el análisis del PR.

El job también se ejecutó satisfactoriamente en el pipeline final sobre `main`.

---

# 13. Inteligencia Artificial

Las herramientas de IA utilizadas formalmente fueron:

- ChatGPT;
- GitHub Copilot.

Resultados destacados:

### ChatGPT

**15/15 pruebas seleccionadas aprobadas**

### GitHub Copilot

Primera versión:

**0/4 aprobadas**

Después de revisión humana:

**4/4 aprobadas**

La evidencia demuestra la utilización de un enfoque Human-in-the-Loop.

---

# 14. Regresión visual

Percy fue integrado como herramienta complementaria de Visual Regression Testing.

Durante una modificación visual controlada detectó:

**11.21 % de diferencia**

El cambio utilizado para producir la evidencia fue eliminado después de completar la prueba.

---

# 15. Evidencias del pipeline

Los artefactos generados incluyen:

- `coverage-report`;
- `allure-report`;
- `k6-results`;
- `zap-results`;
- evidencias E2E cuando existe un fallo.

El pipeline #28 ejecutado sobre `main` generó cuatro artefactos principales y finalizó en estado **Success**.

---

# 16. Validación final en main

El Pull Request #1, titulado **Proyecto Final QA — consolidación y validación final**, fue fusionado correctamente a `main` después de completar el pipeline del PR con todos los jobs aprobados.

El merge generó el commit final:

`0be9bec30cc01acb03e758eb2fa1653f7f5b115f`

Posteriormente se ejecutó automáticamente:

**QA Pipeline #28 — Merge PR #1: Proyecto Final QA**

Resultado:

# **SUCCESS**

Los jobs finales fueron:

| Job | Resultado |
|---|---|
| Unit Tests + Coverage | ✅ Success |
| Dependency Security Scan | ✅ Success |
| SonarQube Cloud Scan | ✅ Success |
| k6 Load Test | ✅ Success |
| OWASP ZAP Baseline Scan | ✅ Success |
| E2E Playwright + Axe + Allure | ✅ Success |

Por lo tanto, la versión integrada en la rama principal quedó validada mediante el pipeline CI/CD completo.

---

# 17. Resultado del Entregable 2

| Requisito | Resultado |
|---|---|
| Proyecto parcial mejorado | ✅ |
| Correcciones y mejoras incorporadas | ✅ |
| Tests adicionales | ✅ |
| Coverage ≥ 70 % | ✅ |
| 36 unitarias | ✅ |
| 13 E2E | ✅ |
| Pipeline CI/CD final en `main` | ✅ Success |
| Security Scan | ✅ |
| OWASP ZAP | ✅ |
| k6 | ✅ |
| Axe | ✅ |
| Allure | ✅ |
| SonarQube Cloud | ✅ |
| Quality Gate | ✅ Passed |
| IA actualizada | ✅ |
| Evidencias automáticas | ✅ |
| PR final fusionado a `main` | ✅ |

## Estado

# ✅ CUMPLIMIENTO TÉCNICO COMPLETO

El Entregable 2 quedó validado definitivamente mediante el Pull Request final, el Quality Gate aprobado en SonarQube Cloud y el pipeline #28 ejecutado sobre `main` en estado Success.
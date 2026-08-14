# Score de Calidad ISO/IEC 25010 — Biblioteca Virtual

## 1. Objetivo

El presente documento consolida los resultados obtenidos durante la evaluación de calidad de Biblioteca Virtual y asigna un nivel cuantitativo de cumplimiento a las principales características evaluadas bajo ISO/IEC 25010.

Para efectos de la rúbrica del proyecto se presentan ocho características principales. La característica Safety de ISO/IEC 25010:2023 no se evalúa como dimensión independiente debido a que Biblioteca Virtual no controla procesos físicos, médicos, industriales o de seguridad humana donde un fallo pueda causar daño físico directo.

La escala utilizada es de 0 a 100 puntos.

## 2. Escala de evaluación

| Rango | Semáforo | Interpretación |
|---|---|---|
| 90 – 100 | 🟢 | Nivel alto de calidad |
| 75 – 89 | 🟡 | Cumple, pero requiere mejoras |
| 0 – 74 | 🔴 | Requiere intervención prioritaria |

---

# 3. Evaluación general

| Característica | Score | Semáforo |
|---|---:|---|
| Adecuación funcional | 96/100 | 🟢 |
| Eficiencia del desempeño | 95/100 | 🟢 |
| Compatibilidad | 78/100 | 🟡 |
| Capacidad de interacción | 93/100 provisional | 🟢 |
| Fiabilidad | 92/100 | 🟢 |
| Seguridad | 78/100 | 🟡 |
| Mantenibilidad | 96/100 | 🟢 |
| Flexibilidad | 85/100 | 🟡 |

**Score general provisional: 89.1/100**

**Resultado provisional: 🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN**

El score de Capacidad de Interacción será actualizado cuando se incorpore el resultado de la encuesta SUS.

---

# 4. Adecuación funcional — 96/100 🟢

## Evidencias

- 36 pruebas unitarias aprobadas.
- 13 pruebas E2E aprobadas.
- 30 casos de prueba documentados.
- Matriz de cobertura de requisitos.
- Pruebas sobre autenticación, catálogo, lectores, préstamos y devoluciones.
- Casos positivos, negativos y de reglas de negocio.

## Resultado

La aplicación cumple satisfactoriamente con las principales funciones para las cuales fue diseñada.

La suite automatizada verificó los flujos críticos de autenticación, administración del catálogo y gestión de préstamos.

## Hallazgo

Se identifican oportunidades de ampliar la automatización de escenarios relacionados con consistencia completa entre interfaz y API y operaciones sobre disponibilidad cero.

## Score

**96/100**

---

# 5. Eficiencia del desempeño — 95/100 🟢

## Evidencias k6

- P95: 1.45 ms.
- Error Rate: 0 %.
- 2,707 solicitudes procesadas.
- 8,121 checks aprobados.
- 100 % de checks satisfactorios.

## Evidencia Lighthouse

- Performance: 90/100.

## Resultado

Los resultados muestran un comportamiento estable bajo la carga utilizada durante las pruebas.

El tiempo P95 se mantiene ampliamente por debajo del umbral establecido de 500 ms.

## Hallazgo

Las pruebas fueron realizadas en un ambiente controlado y deben ampliarse con mayor volumen de usuarios y condiciones equivalentes a producción.

## Score

**95/100**

---

# 6. Compatibilidad — 78/100 🟡

## Evidencias

La aplicación funciona correctamente como solución web utilizando:

- Node.js.
- Express.
- SQLite.
- HTML.
- CSS.
- JavaScript.
- Chromium mediante Playwright.

## Resultado

No se identificaron problemas relevantes durante las pruebas realizadas en Chromium.

## Hallazgo

La suite principal no posee una matriz multibrowser completa para Firefox y WebKit.

Tampoco se ha realizado una validación extensa en múltiples sistemas operativos y dispositivos reales.

## Recomendación

Incorporar Playwright con:

- Chromium.
- Firefox.
- WebKit.

## Score

**78/100**

---

# 7. Capacidad de interacción — 93/100 provisional 🟢

## Evidencia Lighthouse

- Accessibility: 93/100.

## Evidencia Axe

La auditoría automatizada Axe finalizó sin impactos:

- Critical: 0.
- Serious: 0.

Durante la evaluación se identificó inicialmente un supuesto fallo de contraste en el botón `#btn-nuevo-libro`.

La investigación demostró que el contraste real era correcto y que el falso positivo era causado por la ejecución de Axe durante una animación CSS.

Después de sincronizar correctamente la prueba:

- 13 E2E aprobados.
- 0 fallidos.
- 0 flaky.
- 0 skipped.

## SUS

**Resultado pendiente.**

Cuando se obtenga el resultado SUS, esta característica será recalculada utilizando la evaluación técnica y la percepción de usuarios.

## Score provisional

**93/100**

---

# 8. Fiabilidad — 92/100 🟢

## Evidencias

Se evaluaron escenarios relacionados con:

- registro de préstamos;
- devolución;
- doble devolución;
- libro inexistente;
- lector inexistente;
- datos incompletos;
- concurrencia sobre el último ejemplar;
- mantenimiento de disponibilidad;
- filtrado de préstamos activos.

## Resultado

La aplicación conserva adecuadamente los estados principales del ciclo de préstamos y utiliza operaciones transaccionales para procesos críticos.

## Hallazgo

La validación de concurrencia debe ampliarse en ambientes con mayor cantidad de solicitudes simultáneas.

## Score

**92/100**

---

# 9. Seguridad — 78/100 🟡

## Evidencias positivas

### npm audit

Dependencias de producción:

**0 vulnerabilidades detectadas.**

### OWASP ZAP

| Severidad | Hallazgos |
|---|---:|
| High | 0 |
| Medium | 5 |
| Low | 5 |
| Informational | 3 |

### Pruebas automatizadas

Se evaluaron:

- credenciales incorrectas;
- credenciales vacías;
- SQL Injection;
- XSS;
- entradas extremadamente largas;
- sesión sin token;
- revocación de token.

## Principales hallazgos

- Content Security Policy ausente o incompleta.
- CORS demasiado permisivo.
- Protección anti-clickjacking ausente.
- Subresource Integrity ausente.
- Security headers incompletos.

## Resultado

No se identificaron vulnerabilidades High y las dependencias productivas no presentan vulnerabilidades conocidas en el análisis realizado.

Sin embargo, existen cinco hallazgos Medium que deben ser atendidos antes de considerar el sistema endurecido para producción.

## Score

**78/100**

---

# 10. Mantenibilidad — 96/100 🟢

## Evidencias

### Pruebas unitarias

- 36/36 aprobadas.

### Cobertura

| Métrica | Resultado |
|---|---:|
| Statements | 100 % |
| Branches | 98.33 % |
| Functions | 100 % |
| Lines | 100 % |

### Herramientas adicionales

- Jest.
- Supertest.
- Playwright.
- Page Object Model.
- SonarQube Cloud.
- GitHub Actions.
- Allure.

## Resultado

El proyecto posee una estructura de pruebas organizada y una cobertura superior al mínimo requerido del 70 %.

La automatización continua reduce el riesgo de introducir regresiones durante modificaciones futuras.

## Hallazgo

Debe mantenerse la cobertura evitando que el crecimiento del proyecto produzca una reducción progresiva de los controles actuales.

## Score

**96/100**

---

# 11. Flexibilidad — 85/100 🟡

## Evidencias

La solución se ejecuta mediante tecnologías web ampliamente compatibles y puede desplegarse utilizando Node.js 22 o superior.

La separación entre frontend y backend facilita modificaciones independientes.

Las pruebas pueden ejecutarse:

- localmente;
- en GitHub Actions;
- en modo headless.

## Resultado

La arquitectura facilita la ejecución en diferentes ambientes.

## Hallazgo

No se ha validado formalmente el comportamiento del producto en múltiples configuraciones de infraestructura y navegadores.

## Score

**85/100**

---

# 12. Dashboard ISO provisional

| Característica | Resultado |
|---|---:|
| Adecuación funcional | 🟢 96 |
| Eficiencia del desempeño | 🟢 95 |
| Compatibilidad | 🟡 78 |
| Capacidad de interacción | 🟢 93 provisional |
| Fiabilidad | 🟢 92 |
| Seguridad | 🟡 78 |
| Mantenibilidad | 🟢 96 |
| Flexibilidad | 🟡 85 |

## Score global provisional

**89.1/100**

---

# 13. Fortalezas principales

Las principales fortalezas identificadas son:

1. Alta cobertura de pruebas automatizadas.
2. Excelente comportamiento de rendimiento.
3. Pipeline CI/CD funcional.
4. Cobertura de código superior al 98 % en todas las métricas evaluadas.
5. Ausencia de vulnerabilidades High en OWASP ZAP.
6. Ausencia de vulnerabilidades conocidas en dependencias de producción.
7. Suite E2E completamente aprobada.

---

# 14. Áreas de mejora

Las principales áreas que requieren atención son:

1. Security headers.
2. Configuración CORS.
3. Content Security Policy.
4. Compatibilidad multibrowser.
5. Validación en dispositivos reales.
6. Ampliación de pruebas de concurrencia.
7. Mejorar Best Practices de Lighthouse, actualmente en 77.

---

# 15. Decisión preliminar de QA

## 🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN

Biblioteca Virtual presenta un nivel alto de calidad funcional, rendimiento, fiabilidad y mantenibilidad.

No obstante, el equipo de QA recomienda corregir los hallazgos Medium identificados por OWASP ZAP antes de una liberación productiva.

También se recomienda ampliar la validación multibrowser y completar la evaluación de usabilidad mediante SUS.

La decisión definitiva será actualizada después de incorporar el resultado SUS.
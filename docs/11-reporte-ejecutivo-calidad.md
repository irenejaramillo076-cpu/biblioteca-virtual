# ENTREGABLE 3 — REPORTE EJECUTIVO DE CALIDAD

## Biblioteca Virtual

**Resultado general de QA:** 🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN

**Score de calidad ISO/IEC 25010:** 88.6/100

---

# 1. Executive Summary

El presente reporte ejecutivo consolida los resultados obtenidos durante la evaluación de calidad de Biblioteca Virtual. La aplicación fue sometida a pruebas funcionales, unitarias, end-to-end, rendimiento, seguridad, accesibilidad, usabilidad, cobertura de código y análisis automatizado dentro de un pipeline de integración continua.

Biblioteca Virtual es una solución web para la administración de libros, lectores y préstamos. Los procesos principales evaluados incluyen autenticación, registro y búsqueda de libros, registro de lectores, generación de préstamos, devoluciones y actualización de disponibilidad.

La evaluación general obtuvo un score interno de calidad de **88.6/100**, resultado que ubica el producto dentro de un nivel favorable, aunque todavía existen mejoras necesarias antes de recomendar una liberación productiva sin restricciones.

Las principales fortalezas se encuentran en funcionalidad, rendimiento, fiabilidad y mantenibilidad. La suite principal obtuvo **36 de 36 pruebas unitarias aprobadas** y **13 de 13 pruebas E2E aprobadas**, representando un Pass Rate del **100 %**.

La cobertura de código alcanzó **100 % de Statements**, **98.33 % de Branches**, **100 % de Functions** y **100 % de Lines**, superando ampliamente el mínimo de 70 % requerido por el proyecto.

En rendimiento, k6 registró un **P95 de 1.45 ms** y un **Error Rate de 0 %** dentro del escenario evaluado. Los **8,121 checks ejecutados finalizaron satisfactoriamente**.

La evaluación de experiencia de usuario obtuvo un resultado **SUS de 85/100**, mientras que Lighthouse obtuvo **93/100 en Accessibility**.

El principal riesgo actual se encuentra en la configuración defensiva del servidor. OWASP ZAP no identificó vulnerabilidades High, pero registró **5 hallazgos Medium y 5 Low**.

Por esta razón la recomendación final de QA es:

# 🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN

---

# 2. Semáforo ejecutivo de calidad

| Área | Resultado | Estado | Interpretación |
|---|---:|---|---|
| Funcionalidad | 96/100 | 🟢 | Los procesos principales funcionan correctamente |
| Rendimiento | 95/100 | 🟢 | Tiempos de respuesta altamente favorables |
| Usabilidad e interacción | 89/100 | 🟡 | Resultado favorable con oportunidades de mejora |
| Seguridad | 78/100 | 🟡 | Sin High, pero existen 5 hallazgos Medium |
| Fiabilidad | 92/100 | 🟢 | Suite estable y reglas principales verificadas |
| Mantenibilidad | 96/100 | 🟢 | Cobertura elevada y automatización |
| Compatibilidad | 78/100 | 🟡 | Falta ampliar pruebas multibrowser |
| Flexibilidad | 85/100 | 🟡 | Arquitectura adaptable con validación limitada de ambientes |

## Estado global

# 🟡 88.6/100

La aplicación presenta un nivel favorable de calidad, aunque se recomienda completar acciones de hardening antes de una liberación productiva.

---

# 3. Top 3 hallazgos prioritarios

El análisis no identificó vulnerabilidades clasificadas como High o Critical. Por esta razón, los siguientes elementos representan los tres hallazgos de mayor prioridad dentro de los resultados encontrados.

## 3.1 Configuración CORS demasiado permisiva

**Severidad:** Medium

El servidor permite solicitudes CORS desde cualquier origen mediante una configuración abierta.

### Impacto

Una política excesivamente permisiva incrementa la superficie de exposición del sistema y permite que aplicaciones externas realicen solicitudes desde navegadores de usuarios.

### Recomendación

Configurar una lista explícita de orígenes permitidos según el ambiente.

### Prioridad

🔴 Alta

---

## 3.2 Content Security Policy ausente o incompleta

**Severidad:** Medium

OWASP ZAP identificó que la aplicación no posee una Content Security Policy completa en las respuestas evaluadas.

### Impacto

La ausencia de CSP reduce una de las capas de defensa del navegador frente a inyección de contenido y determinados ataques Cross-Site Scripting.

### Recomendación

Definir una política Content Security Policy que controle explícitamente:

- scripts;
- estilos;
- imágenes;
- fuentes;
- formularios;
- frames;
- recursos externos.

### Prioridad

🔴 Alta

---

## 3.3 Protección anti-clickjacking ausente

**Severidad:** Medium

El servidor no establece una protección completa mediante `frame-ancestors` o un mecanismo equivalente.

### Impacto

La aplicación podría ser cargada dentro de un iframe perteneciente a un sitio externo y utilizada como parte de un intento de engaño al usuario.

### Recomendación

Implementar una directiva CSP:

`frame-ancestors 'none'`

o una configuración equivalente.

### Prioridad

🔴 Alta

---

# 4. Recomendación principal del equipo de QA

La recomendación principal consiste en realizar un ciclo corto de hardening antes de la liberación productiva.

Este ciclo debe atender prioritariamente:

1. CORS.
2. Content Security Policy.
3. Protección anti-clickjacking.
4. Security headers faltantes.
5. Configuración de recursos externos.

Después de aplicar las correcciones debe ejecutarse nuevamente OWASP ZAP.

La meta recomendada es:

- High = 0;
- Medium = 0;
- mantener la suite funcional en 100 %;
- mantener Coverage superior al 90 %;
- mantener k6 Error Rate inferior al 1 %.

---

# 5. Dashboard de métricas

## 5.1 Indicadores principales

| Indicador | Resultado | Estado |
|---|---:|---|
| Score ISO 25010 | **88.6/100** | 🟡 |
| SUS | **85/100** | 🟢 |
| Lighthouse Performance | **90/100** | 🟢 |
| Lighthouse Accessibility | **93/100** | 🟢 |
| Lighthouse Best Practices | **77/100** | 🟡 |
| Lighthouse SEO | **90/100** | 🟢 |
| Test Pass Rate E2E | **100 %** | 🟢 |
| Unit Tests | **36/36** | 🟢 |
| E2E Tests | **13/13** | 🟢 |
| Coverage Statements | **100 %** | 🟢 |
| Coverage Branches | **98.33 %** | 🟢 |
| Coverage Functions | **100 %** | 🟢 |
| Coverage Lines | **100 %** | 🟢 |
| ZAP High | **0** | 🟢 |
| ZAP Medium | **5** | 🟡 |
| ZAP Low | **5** | 🟡 |
| k6 P95 | **1.45 ms** | 🟢 |
| k6 Error Rate | **0 %** | 🟢 |

---

# 5.2 Score de calidad general

El modelo interno de evaluación basado en ISO/IEC 25010 obtuvo:

# 88.6/100

Representación ejecutiva:

**█████████████████░░░ 88.6 %**

La puntuación evidencia una calidad general favorable.

Los principales factores que reducen el score son:

- seguridad;
- compatibilidad;
- amplitud de pruebas multibrowser;
- Best Practices de Lighthouse.

---

# 5.3 Usabilidad — SUS

La encuesta System Usability Scale fue aplicada a tres personas.

| Participante | SUS |
|---|---:|
| Persona 1 | 95/100 |
| Persona 2 | 70/100 |
| Persona 3 | 90/100 |
| **Promedio** | **85/100** |

# SUS = 85/100

El resultado refleja una percepción favorable de facilidad de uso.

La evaluación debe interpretarse considerando que la muestra fue de tres participantes. En futuras versiones se recomienda ampliar la cantidad de usuarios evaluados.

---

# 5.4 Lighthouse

Los resultados obtenidos fueron:

| Categoría | Score |
|---|---:|
| Performance | 90 |
| Accessibility | 93 |
| Best Practices | 77 |
| SEO | 90 |

## Interpretación

Performance y Accessibility presentan resultados altos.

SEO también obtiene un resultado favorable.

Best Practices representa el indicador con mayor oportunidad de mejora dentro de Lighthouse y coincide con varios hallazgos relacionados con configuración defensiva HTTP.

---

# 5.5 Test Pass Rate

La suite E2E principal obtuvo:

**13 pruebas aprobadas de 13 ejecutadas**

Cálculo:

`13 / 13 × 100 = 100 %`

# Test Pass Rate = 100 %

Las pruebas unitarias también finalizaron satisfactoriamente:

# 36/36

---

# 5.6 Coverage

Los resultados de cobertura fueron:

| Métrica | Resultado |
|---|---:|
| Statements | 100 % |
| Branches | 98.33 % |
| Functions | 100 % |
| Lines | 100 % |

El requisito académico establece un mínimo de:

**70 %**

La aplicación supera ampliamente este objetivo.

---

# 5.7 Defect Density

Durante el análisis se utilizaron como referencia los 10 hallazgos de seguridad registrados por OWASP ZAP.

El código fuente analizado contiene aproximadamente:

**1,394 líneas**

Esto equivale a:

**1.39 KLOC**

Cálculo:

`10 / 1.39 = 7.19`

# Defect Density = 7.19 hallazgos/KLOC

Este indicador debe interpretarse como una aproximación académica basada en los hallazgos de seguridad registrados y no como una densidad histórica completa de todos los defectos funcionales del producto.

---

# 5.8 OWASP ZAP

La auditoría dinámica obtuvo:

| Severidad | Resultado |
|---|---:|
| High | 0 |
| Medium | 5 |
| Low | 5 |
| Informational | 3 |

## Interpretación

La ausencia de vulnerabilidades High representa un resultado favorable.

Sin embargo, los cinco hallazgos Medium requieren corrección antes de recomendar una liberación productiva sin restricciones.

---

# 5.9 k6

Los resultados principales fueron:

| Métrica | Resultado |
|---|---:|
| P95 | 1.45 ms |
| Error Rate | 0 % |
| Requests | 2,707 |
| Checks | 8,121 |
| Checks exitosos | 8,121 |

# k6 P95 = 1.45 ms

# Error Rate = 0 %

El rendimiento constituye una de las principales fortalezas observadas durante la evaluación.

---

# 6. Análisis de los Top 10 hallazgos

## H-01 — Content Security Policy incompleta

**Severidad:** Medium

### Descripción técnica

La configuración CSP no define completamente directivas necesarias para restringir determinados comportamientos del navegador.

### Impacto en el usuario

Reduce la protección frente a inyección de contenido y utilización no autorizada de recursos.

### Reproducción

Ejecutar OWASP ZAP contra Biblioteca Virtual y revisar las alertas relacionadas con Content Security Policy.

### Corrección recomendada

Implementar una política CSP completa y adaptada a los recursos utilizados.

---

## H-02 — Content Security Policy ausente

**Severidad:** Medium

### Descripción técnica

Determinadas respuestas no incluyen el encabezado `Content-Security-Policy`.

### Impacto

Reduce la capacidad del navegador para bloquear contenido no autorizado.

### Reproducción

Revisar los encabezados HTTP o ejecutar ZAP.

### Corrección

Incorporar CSP a las respuestas principales.

---

## H-03 — Configuración CORS permisiva

**Severidad:** Medium

### Descripción técnica

La aplicación utiliza una política CORS demasiado abierta.

### Impacto

Permite solicitudes desde orígenes que no necesariamente pertenecen a Biblioteca Virtual.

### Reproducción

Ejecutar ZAP o revisar:

`Access-Control-Allow-Origin`

### Corrección

Configurar explícitamente los dominios permitidos.

---

## H-04 — Protección anti-clickjacking ausente

**Severidad:** Medium

### Descripción técnica

La aplicación no impide explícitamente su carga dentro de frames pertenecientes a terceros.

### Impacto

Puede aumentar la exposición frente a ataques de clickjacking.

### Reproducción

Revisar los security headers mediante ZAP.

### Corrección

Implementar `frame-ancestors` o una configuración equivalente.

---

## H-05 — Subresource Integrity ausente

**Severidad:** Medium

### Descripción técnica

Determinados recursos externos no disponen de mecanismos adicionales de integridad.

### Impacto

Una alteración de recursos externos puede incrementar el riesgo para la interfaz.

### Reproducción

Ejecutar ZAP y revisar las alertas asociadas a SRI.

### Corrección

Evaluar recursos locales o incorporar mecanismos de integridad cuando sean técnicamente aplicables.

---

## H-06 — Cross-Origin-Embedder-Policy ausente

**Severidad:** Low

### Impacto

Existe un menor aislamiento entre determinados recursos de diferentes orígenes.

### Corrección

Evaluar la configuración adecuada de Cross-Origin-Embedder-Policy.

---

## H-07 — Cross-Origin-Opener-Policy ausente

**Severidad:** Low

### Impacto

Existe menor aislamiento entre contextos de navegación.

### Corrección

Evaluar la incorporación de:

`Cross-Origin-Opener-Policy: same-origin`

---

## H-08 — Permissions Policy ausente

**Severidad:** Low

### Impacto

El sistema no define explícitamente qué capacidades del navegador pueden utilizarse.

### Corrección

Deshabilitar funcionalidades innecesarias como cámara, micrófono o geolocalización cuando no sean requeridas.

---

## H-09 — X-Powered-By expuesto

**Severidad:** Low

### Descripción

El servidor puede informar que utiliza Express.

### Impacto

Facilita el reconocimiento de la tecnología utilizada.

### Corrección

Deshabilitar la exposición de `X-Powered-By`.

---

## H-10 — X-Content-Type-Options ausente

**Severidad:** Low

### Impacto

El navegador podría realizar MIME sniffing en determinadas respuestas.

### Corrección

Agregar:

`X-Content-Type-Options: nosniff`

---

# 7. Distribución de hallazgos

Los 10 hallazgos utilizados en la evaluación se distribuyen de la siguiente manera:

**High:** 0 %

**Medium:** 50 %

**Low:** 50 %

Por tanto:

# 0 hallazgos High

# 5 hallazgos Medium

# 5 hallazgos Low

La prioridad inmediata debe concentrarse en los cinco Medium.

---

# 8. Análisis de riesgo para negocio

Desde la perspectiva de gerencia, los resultados no muestran actualmente un problema funcional generalizado.

Los principales procesos operativos del sistema presentan resultados positivos.

El principal riesgo se encuentra en seguridad preventiva.

Esto significa que la mayor necesidad actual no consiste en rediseñar las funciones de préstamos o catálogo, sino en reforzar la configuración del servidor antes de una exposición productiva.

El rendimiento tampoco representa actualmente una limitación dentro del escenario probado.

La accesibilidad y usabilidad presentan resultados favorables, aunque se recomienda ampliar las evaluaciones con mayor diversidad y número de participantes.

---

# 9. Roadmap de mejora

## 9.1 Quick Wins — 1 a 2 semanas

Las siguientes acciones presentan bajo esfuerzo y alto impacto.

### Restringir CORS

Configurar exclusivamente los orígenes autorizados.

### Implementar Content Security Policy

Establecer reglas explícitas para scripts, estilos, fuentes, imágenes, formularios y frames.

### Incorporar protección anti-clickjacking

Agregar `frame-ancestors` o mecanismo equivalente.

### Deshabilitar X-Powered-By

Reducir exposición innecesaria de información técnica.

### Incorporar X-Content-Type-Options

Agregar:

`nosniff`

### Configurar Permissions Policy

Deshabilitar capacidades del navegador que la aplicación no necesita.

### Mejorar Lighthouse Best Practices

Objetivo:

**77 → mínimo 90**

---

# 9.2 Mejoras de mediano plazo — 1 a 3 meses

## Multibrowser

Ejecutar las pruebas E2E en:

- Chromium;
- Firefox;
- WebKit.

## Ampliar accesibilidad

Ejecutar Axe sobre todas las vistas principales.

## Ampliar concurrencia

Incrementar las pruebas simultáneas sobre préstamos y devoluciones.

## Lighthouse automatizado

Incorporar controles de Lighthouse dentro del CI/CD.

## Dispositivos y resoluciones

Validar escritorio, tablet y móvil.

## Mayor muestra SUS

Incrementar el número de personas participantes en futuras evaluaciones.

---

# 9.3 Inversiones estratégicas — 3 a 12 meses

## Ambiente QA equivalente a producción

Crear un ambiente independiente con configuración cercana a producción.

## Observabilidad

Incorporar monitoreo de:

- errores;
- tiempos de respuesta;
- disponibilidad;
- recursos;
- eventos relevantes.

## Performance continuo

Ampliar k6 hacia:

- stress;
- spike;
- endurance.

## DevSecOps

Integrar controles de seguridad continuos dentro del pipeline.

## Respaldo y recuperación

Formalizar procedimientos de respaldo de la base de datos y recuperación ante incidentes.

## Quality Gate de liberación

Una versión no debe liberarse cuando exista:

- test crítico fallido;
- vulnerabilidad High;
- Coverage menor al mínimo;
- Error Rate fuera del umbral;
- Quality Gate fallido.

---

# 10. Meta esperada después del roadmap

| Indicador | Actual | Objetivo |
|---|---:|---:|
| Score ISO | 88.6 | ≥ 92 |
| ZAP High | 0 | 0 |
| ZAP Medium | 5 | 0 |
| Lighthouse Performance | 90 | ≥ 90 |
| Lighthouse Accessibility | 93 | ≥ 95 |
| Lighthouse Best Practices | 77 | ≥ 90 |
| SUS | 85 | ≥ 85 |
| E2E Pass Rate | 100 % | 100 % |
| Coverage | >98 % | ≥ 90 % |
| k6 Error Rate | 0 % | <1 % |
| k6 P95 | 1.45 ms | <500 ms |

---

# 11. Decisión de liberación

La pregunta ejecutiva principal es:

# ¿Podemos publicar Biblioteca Virtual?

## Respuesta de QA

# 🟡 NO TODAVÍA SIN CORRECCIONES PREVIAS

El sistema presenta una calidad funcional alta y un rendimiento excelente dentro del escenario probado.

No existen vulnerabilidades High identificadas.

Sin embargo, permanecen cinco hallazgos Medium relacionados principalmente con la configuración defensiva HTTP.

La recomendación consiste en aplicar primero los Quick Wins de seguridad.

Después de corregirlos debe ejecutarse nuevamente:

- pruebas unitarias;
- pruebas E2E;
- OWASP ZAP;
- Lighthouse;
- pipeline CI/CD.

Si estas verificaciones permanecen satisfactorias y ZAP reduce los hallazgos Medium, el estado puede modificarse a:

# 🟢 APROBADO PARA PRODUCCIÓN

---

# 12. Conclusión ejecutiva

Biblioteca Virtual demuestra un nivel favorable de madurez para un proyecto académico de Quality Assurance.

El sistema obtuvo un score general de calidad de **88.6/100**.

Las 36 pruebas unitarias y las 13 pruebas E2E principales finalizaron satisfactoriamente, alcanzando un Pass Rate de 100 %.

La cobertura de código supera ampliamente el mínimo requerido, con valores superiores al 98 % en todas las métricas analizadas.

El desempeño constituye una fortaleza, con un P95 de 1.45 ms y Error Rate de 0 % durante la ejecución de k6.

La percepción de usabilidad también fue favorable, alcanzando un SUS de 85/100, mientras Lighthouse Accessibility obtuvo 93/100.

Desde la perspectiva de seguridad, OWASP ZAP no identificó vulnerabilidades High, lo cual constituye un resultado positivo. Sin embargo, los cinco hallazgos Medium deben ser corregidos antes de la liberación productiva.

Por esta razón el equipo de QA clasifica actualmente Biblioteca Virtual como:

# 🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN

La mayoría de las acciones prioritarias identificadas corresponden a cambios de configuración y hardening que pueden implementarse sin rediseñar las funciones principales del sistema.

Una vez completadas estas acciones y repetidas las auditorías, Biblioteca Virtual puede evolucionar hacia una recomendación favorable de liberación.
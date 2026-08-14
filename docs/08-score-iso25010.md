# Score de Calidad ISO/IEC 25010 — Biblioteca Virtual

## 1. Objetivo

El presente documento consolida los resultados obtenidos durante la evaluación de calidad de Biblioteca Virtual y asigna un nivel cuantitativo de cumplimiento a las principales características evaluadas bajo ISO/IEC 25010.

La evaluación utiliza evidencias obtenidas mediante pruebas unitarias, pruebas end-to-end, análisis de rendimiento, auditorías de seguridad, pruebas de accesibilidad, cobertura de código, integración continua y evaluación de usabilidad mediante System Usability Scale, SUS.

Los porcentajes presentados representan una valoración técnica del producto dentro del alcance académico del Proyecto Final y no constituyen una certificación formal de cumplimiento ISO.

Para efectos de la rúbrica del proyecto se presentan ocho características principales. La característica Safety de ISO/IEC 25010:2023 no se evalúa como dimensión independiente debido a que Biblioteca Virtual no controla procesos médicos, industriales, físicos o de seguridad humana donde una falla del software pueda ocasionar directamente daño físico.

---

# 2. Escala de evaluación

Para facilitar la interpretación ejecutiva de los resultados se utilizó la siguiente escala:

| Rango | Semáforo | Interpretación |
|---|---|---|
| 90 – 100 | 🟢 | Nivel alto de calidad |
| 75 – 89 | 🟡 | Cumple, pero requiere mejoras |
| 0 – 74 | 🔴 | Requiere intervención prioritaria |

---

# 3. Evaluación general ISO/IEC 25010

| Característica | Score | Semáforo |
|---|---:|---|
| Adecuación funcional | 96/100 | 🟢 |
| Eficiencia del desempeño | 95/100 | 🟢 |
| Compatibilidad | 78/100 | 🟡 |
| Capacidad de interacción | 89/100 | 🟡 |
| Fiabilidad | 92/100 | 🟢 |
| Seguridad | 78/100 | 🟡 |
| Mantenibilidad | 96/100 | 🟢 |
| Flexibilidad | 85/100 | 🟡 |

## Score general final

**88.6/100**

## Resultado general

**🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN**

El sistema presenta resultados sólidos en funcionalidad, rendimiento, fiabilidad y mantenibilidad.

Las principales oportunidades de mejora se concentran en seguridad defensiva, compatibilidad multibrowser, amplitud de las pruebas de accesibilidad y validación en ambientes más cercanos a producción.

---

# 4. Adecuación funcional — 96/100 🟢

## 4.1 Objetivo de evaluación

La adecuación funcional analiza si Biblioteca Virtual proporciona las funciones necesarias para satisfacer las necesidades para las cuales fue desarrollada.

Se consideraron principalmente la completitud funcional, corrección funcional y pertinencia funcional.

## 4.2 Evidencias

Las principales evidencias utilizadas fueron:

- 36 pruebas unitarias aprobadas;
- 13 pruebas E2E aprobadas;
- 30 casos de prueba formalmente documentados;
- matriz de cobertura de requisitos;
- pruebas de autenticación;
- pruebas del catálogo de libros;
- pruebas de registro de lectores;
- pruebas de préstamos;
- pruebas de devolución;
- escenarios positivos;
- escenarios negativos;
- reglas de negocio;
- validaciones de datos;
- condiciones de frontera.

## 4.3 Resultados

| Subcaracterística | Score | Evidencia | Hallazgo |
|---|---:|---|---|
| Completitud funcional | 95 % | Cobertura de autenticación, catálogo, lectores y préstamos | Los principales flujos están cubiertos |
| Corrección funcional | 98 % | 36 unitarias y 13 E2E aprobadas | No existen fallos críticos en la ejecución final |
| Pertinencia funcional | 95 % | Casos orientados a reglas reales del negocio | Existen escenarios adicionales que pueden automatizarse |

## 4.4 Hallazgos

Los flujos principales de Biblioteca Virtual funcionan de manera satisfactoria.

La suite permite verificar autenticación, administración de libros, usuarios, préstamos y devoluciones.

También fueron evaluados escenarios relacionados con datos incompletos, usuarios inexistentes, libros inexistentes y operaciones repetidas.

Como oportunidad de mejora se identificó la necesidad de ampliar aún más la automatización de determinados escenarios extremos de consistencia entre interfaz y API.

## Score final

**96/100 🟢**

---

# 5. Eficiencia del desempeño — 95/100 🟢

## 5.1 Objetivo de evaluación

La eficiencia del desempeño analiza el comportamiento temporal del sistema, su capacidad de procesamiento y el uso de recursos durante la ejecución.

## 5.2 Evidencias de k6

La prueba de rendimiento realizada mediante k6 produjo los siguientes resultados:

| Métrica | Resultado |
|---|---:|
| P95 | 1.45 ms |
| Error Rate | 0 % |
| Requests | 2,707 |
| Checks | 8,121 |
| Checks aprobados | 8,121 |
| Pass Rate de checks | 100 % |

## 5.3 Evidencia Lighthouse

El análisis Lighthouse obtuvo:

**Performance: 90/100**

## 5.4 Evaluación por subcaracterística

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Comportamiento temporal | 98 % | P95 de 1.45 ms |
| Utilización de recursos | 92 % | Ejecución estable durante pruebas |
| Capacidad | 95 % | 2,707 solicitudes y 8,121 checks |

## 5.5 Hallazgos

Los resultados obtenidos evidencian un comportamiento eficiente dentro del ambiente de pruebas.

El tiempo P95 se encuentra ampliamente por debajo del límite de 500 ms utilizado como referencia del proyecto.

La tasa de errores fue de 0 %, lo que significa que las solicitudes evaluadas pudieron completarse correctamente durante la prueba.

La principal limitación es que los resultados provienen de un ambiente controlado.

Antes de una implementación productiva se recomienda ampliar las pruebas hacia mayores volúmenes de usuarios y diferentes tipos de carga.

## Score final

**95/100 🟢**

---

# 6. Compatibilidad — 78/100 🟡

## 6.1 Objetivo de evaluación

La compatibilidad determina la capacidad de Biblioteca Virtual para operar correctamente dentro de diferentes ambientes tecnológicos e interactuar adecuadamente con sus componentes.

## 6.2 Evidencias

La aplicación utiliza:

- Node.js;
- Express;
- SQLite;
- HTML;
- CSS;
- JavaScript;
- API REST;
- Playwright;
- Chromium.

## 6.3 Evaluación

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Coexistencia | 80 % | Aplicación y herramientas ejecutadas simultáneamente |
| Interoperabilidad | 76 % | Comunicación frontend y API REST |

## 6.4 Hallazgos

Durante las pruebas realizadas en Chromium no se identificaron problemas críticos de compatibilidad.

Sin embargo, la suite E2E principal no dispone todavía de una matriz completa que ejecute automáticamente los mismos escenarios en:

- Chromium;
- Firefox;
- WebKit.

Tampoco se ha realizado una evaluación extensa utilizando diferentes sistemas operativos y dispositivos reales.

## 6.5 Recomendación

Se recomienda habilitar ejecución multibrowser mediante Playwright e incorporar estos navegadores al pipeline de integración continua.

## Score final

**78/100 🟡**

---

# 7. Capacidad de interacción — 89/100 🟡

## 7.1 Objetivo de evaluación

La capacidad de interacción analiza qué tan sencillo resulta para una persona reconocer las funciones del sistema, aprender a utilizarlo, operar sus componentes y completar las tareas previstas.

Para esta característica se utilizaron dos fuentes principales de evidencia:

- Lighthouse Accessibility;
- System Usability Scale, SUS.

También se utilizaron resultados de Axe y las pruebas E2E.

---

# 7.2 Resultado Lighthouse

La evaluación Lighthouse obtuvo:

| Categoría | Resultado |
|---|---:|
| Performance | 90 |
| Accessibility | 93 |
| Best Practices | 77 |
| SEO | 90 |

Para la evaluación de interacción se utilizó principalmente:

**Accessibility: 93/100**

---

# 7.3 Evaluación Axe

La herramienta `@axe-core/playwright` fue incorporada dentro de la suite E2E.

Durante una ejecución inicial se detectó una supuesta violación seria de contraste sobre el botón:

`#btn-nuevo-libro`

Axe informó un contraste aproximado de:

**3.21:1**

La investigación posterior permitió determinar que los colores definidos en el CSS poseían realmente un contraste adecuado.

El resultado incorrecto se producía porque la herramienta analizaba el elemento mientras todavía se encontraba activa una animación CSS.

La prueba fue modificada para esperar la finalización de las animaciones antes de ejecutar Axe.

Después de la corrección:

- 13 pruebas E2E aprobadas;
- 0 fallidas;
- 0 flaky;
- 0 skipped;
- 0 violaciones Serious o Critical en la prueba Axe final.

Este incidente demostró que los resultados producidos por una herramienta automática deben ser interpretados y comprobados antes de modificar el producto.

---

# 7.4 Evaluación System Usability Scale — SUS

La evaluación SUS fue realizada con tres personas después de interactuar con Biblioteca Virtual.

La escala SUS utiliza diez preguntas con valores de 1 a 5.

Para calcular el resultado:

- en las preguntas impares se resta 1 a la respuesta;
- en las preguntas pares se resta la respuesta a 5;
- las contribuciones se suman;
- el resultado se multiplica por 2.5.

## Resultados individuales

| Participante | Resultado SUS |
|---|---:|
| Persona 1 | 95/100 |
| Persona 2 | 70/100 |
| Persona 3 | 90/100 |
| **Promedio SUS** | **85/100** |

## Interpretación

El resultado promedio obtenido fue:

**SUS = 85/100**

Este resultado evidencia una percepción favorable de la usabilidad de Biblioteca Virtual.

Las respuestas muestran que, en términos generales, las personas lograron identificar y utilizar las principales funciones del sistema con un nivel elevado de satisfacción.

La diferencia observada en la Persona 2 también demuestra la importancia de considerar múltiples participantes, ya que la percepción de usabilidad puede variar entre usuarios.

---

# 7.5 Cálculo del score de interacción

Para obtener una valoración integrada se utilizaron:

**Lighthouse Accessibility = 93**

**SUS = 85**

Cálculo:

`(93 + 85) / 2 = 89`

Por lo tanto:

**Capacidad de interacción = 89/100**

---

# 7.6 Evaluación por subcaracterísticas

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Reconocibilidad | 92 % | Navegación e interfaz |
| Aprendizaje | 87 % | SUS 85 |
| Operabilidad | 92 % | Flujos E2E |
| Protección frente a errores | 90 % | Casos negativos |
| Participación del usuario | 88 % | SUS |
| Inclusividad | 91 % | Lighthouse y Axe |
| Asistencia al usuario | 86 % | Formularios y mensajes |
| Autodescripción | 86 % | Etiquetas y controles |

## Score final

**89/100 🟡**

La clasificación amarilla no representa una deficiencia grave.

El resultado se encuentra muy cercano al nivel alto y muestra una experiencia favorable, aunque todavía existen oportunidades de mejorar determinadas prácticas y realizar estudios con una muestra mayor de usuarios.

---

# 8. Fiabilidad — 92/100 🟢

## 8.1 Objetivo

La fiabilidad analiza si Biblioteca Virtual mantiene su funcionamiento y la consistencia de los datos frente a diferentes situaciones de operación.

## 8.2 Evidencias

Se evaluaron escenarios relacionados con:

- préstamo válido;
- devolución válida;
- filtrado de préstamos activos;
- datos incompletos;
- libro inexistente;
- lector inexistente;
- dos solicitudes sobre el último ejemplar;
- doble devolución;
- disponibilidad de ejemplares;
- consistencia de estados;
- operaciones repetidas.

## 8.3 Evaluación

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Ausencia de fallos | 94 % | Suite final completamente aprobada |
| Disponibilidad | 92 % | Servicio estable durante las ejecuciones |
| Tolerancia a fallos | 88 % | Casos negativos |
| Recuperabilidad | 94 % | Gestión de estados y datos |

## 8.4 Hallazgos

La aplicación mantiene correctamente los principales estados relacionados con libros, lectores y préstamos dentro de los escenarios automatizados.

El módulo de préstamos recibió especial atención debido al riesgo de inconsistencias en la cantidad de ejemplares disponibles.

Como mejora futura se recomienda aumentar las pruebas de concurrencia y realizar pruebas de recuperación de la base de datos.

## Score final

**92/100 🟢**

---

# 9. Seguridad — 78/100 🟡

## 9.1 Objetivo de evaluación

La seguridad analiza la capacidad del producto para proteger información, operaciones y recursos frente a accesos o modificaciones no autorizadas.

## 9.2 npm audit

Se ejecutó:

`npm audit --omit=dev --audit-level=high`

Resultado:

**0 vulnerabilidades detectadas en dependencias productivas.**

Esto permite afirmar específicamente que las dependencias utilizadas en producción no presentaron vulnerabilidades conocidas de nivel High o Critical dentro del análisis realizado.

---

# 9.3 OWASP ZAP

El análisis dinámico realizado con OWASP ZAP produjo:

| Severidad | Cantidad |
|---|---:|
| High | 0 |
| Medium | 5 |
| Low | 5 |
| Informational | 3 |

## Principales hallazgos

Se identificaron riesgos relacionados con:

- Content Security Policy ausente o incompleta;
- CORS demasiado permisivo;
- protección anti-clickjacking;
- Subresource Integrity;
- Cross-Origin policies;
- Permissions Policy;
- exposición mediante X-Powered-By;
- X-Content-Type-Options.

No se detectaron vulnerabilidades clasificadas como High.

---

# 9.4 Pruebas de seguridad funcional

La suite también evaluó:

- credenciales incorrectas;
- credenciales vacías;
- SQL Injection;
- XSS;
- entradas extremadamente largas;
- sesiones sin token;
- token inválido;
- cierre de sesión.

---

# 9.5 Evaluación por subcaracterística

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Confidencialidad | 80 % | Autenticación y controles de acceso |
| Integridad | 86 % | Validaciones y reglas de negocio |
| No repudio | 70 % | Auditoría limitada |
| Responsabilidad | 72 % | Trazabilidad limitada de acciones |
| Autenticidad | 86 % | Autenticación |
| Resistencia | 74 % | ZAP, XSS, SQL Injection y npm audit |

## Hallazgo principal

Aunque el sistema no presentó vulnerabilidades High, existen cinco hallazgos Medium que requieren corrección antes de considerar la configuración de seguridad suficientemente endurecida para producción.

## Score final

**78/100 🟡**

---

# 10. Mantenibilidad — 96/100 🟢

## 10.1 Objetivo

La mantenibilidad analiza qué tan sencillo resulta comprender, modificar, probar y evolucionar el software.

## 10.2 Arquitectura de pruebas

Biblioteca Virtual utiliza:

- Jest;
- Supertest;
- Playwright;
- Page Object Model;
- SonarQube Cloud;
- GitHub Actions;
- Allure;
- Axe;
- k6;
- OWASP ZAP.

---

# 10.3 Pruebas unitarias

Resultado:

**36/36 aprobadas**

---

# 10.4 Cobertura de código

| Métrica | Resultado |
|---|---:|
| Statements | 100 % |
| Branches | 98.33 % |
| Functions | 100 % |
| Lines | 100 % |

El mínimo solicitado por el Proyecto Final es:

**70 %**

La cobertura obtenida supera ampliamente ese requisito.

---

# 10.5 Evaluación

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Modularidad | 95 % | Separación de rutas, servicios y frontend |
| Reutilización | 92 % | Page Objects |
| Analizabilidad | 96 % | Sonar y cobertura |
| Modificabilidad | 97 % | Cambios sin regresiones |
| Testabilidad | 100 % | Suite automatizada |

## Hallazgos

La arquitectura permite introducir modificaciones y volver a ejecutar automáticamente la suite para determinar si se introdujeron regresiones.

La cobertura elevada debe mantenerse conforme el proyecto crezca.

También se recomienda evitar interpretar la cobertura como única medida de calidad, debido a que una cobertura elevada no garantiza por sí sola que todos los riesgos hayan sido evaluados.

## Score final

**96/100 🟢**

---

# 11. Flexibilidad — 85/100 🟡

## 11.1 Objetivo

La flexibilidad analiza la capacidad del sistema para adaptarse a diferentes ambientes y evolucionar frente a cambios tecnológicos o de capacidad.

## 11.2 Evidencias

Biblioteca Virtual utiliza tecnologías web ampliamente disponibles.

Las pruebas pueden ejecutarse:

- localmente;
- mediante GitHub Actions;
- en modo headless;
- mediante Node.js.

La arquitectura posee separación entre frontend y backend.

---

# 11.3 Evaluación

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Adaptabilidad | 88 % | Arquitectura web |
| Escalabilidad | 82 % | k6 favorable, pero alcance limitado |
| Instalabilidad | 90 % | npm y Node.js |
| Reemplazabilidad | 80 % | Componentes parcialmente desacoplados |

## Hallazgos

Aunque la aplicación puede desplegarse con relativa facilidad, no se han realizado pruebas formales en una variedad amplia de infraestructuras.

SQLite puede resultar adecuado para el alcance actual, aunque debería reevaluarse si el sistema aumenta significativamente el volumen de usuarios y operaciones concurrentes.

## Score final

**85/100 🟡**

---

# 12. Cálculo del score general ISO

Los resultados finales utilizados fueron:

| Característica | Resultado |
|---|---:|
| Adecuación funcional | 96 |
| Eficiencia del desempeño | 95 |
| Compatibilidad | 78 |
| Capacidad de interacción | 89 |
| Fiabilidad | 92 |
| Seguridad | 78 |
| Mantenibilidad | 96 |
| Flexibilidad | 85 |

## Cálculo

`96 + 95 + 78 + 89 + 92 + 78 + 96 + 85 = 709`

`709 / 8 = 88.625`

Redondeando a un decimal:

# **Score ISO general = 88.6/100**

---

# 13. Dashboard de calidad ISO

| Característica | Resultado | Estado |
|---|---:|---|
| Adecuación funcional | 96 | 🟢 |
| Eficiencia del desempeño | 95 | 🟢 |
| Compatibilidad | 78 | 🟡 |
| Capacidad de interacción | 89 | 🟡 |
| Fiabilidad | 92 | 🟢 |
| Seguridad | 78 | 🟡 |
| Mantenibilidad | 96 | 🟢 |
| Flexibilidad | 85 | 🟡 |

## Resultado global

# **88.6/100 🟡**

---

# 14. Fortalezas principales

La evaluación permitió identificar como principales fortalezas de Biblioteca Virtual:

1. Alta cobertura de pruebas automatizadas.
2. 36 de 36 pruebas unitarias aprobadas.
3. 13 de 13 pruebas E2E aprobadas.
4. Pass Rate E2E de 100 %.
5. Cobertura superior al 98 % en todas las métricas.
6. Excelente comportamiento de rendimiento.
7. k6 Error Rate de 0 %.
8. Lighthouse Performance de 90.
9. Lighthouse Accessibility de 93.
10. SUS de 85/100.
11. Ausencia de vulnerabilidades High en OWASP ZAP.
12. Cero vulnerabilidades High o Critical en dependencias productivas analizadas mediante npm audit.
13. Pipeline CI/CD automatizado.
14. Integración de SonarQube Cloud.
15. Reportes automáticos mediante Allure.

---

# 15. Áreas principales de mejora

La evaluación también permitió identificar áreas que deben fortalecerse:

1. Corregir los cinco hallazgos Medium de OWASP ZAP.
2. Restringir la configuración CORS.
3. Implementar una Content Security Policy completa.
4. Incorporar protección anti-clickjacking.
5. Mejorar los security headers.
6. Aumentar Lighthouse Best Practices desde 77 hacia un valor mínimo de 90.
7. Incorporar Firefox y WebKit al pipeline.
8. Ampliar las pruebas de accesibilidad a todas las vistas.
9. Aumentar la cantidad de usuarios en futuras pruebas SUS.
10. Ampliar las pruebas de concurrencia.
11. Incorporar monitoreo de infraestructura.
12. Formalizar respaldos y recuperación de datos.

---

# 16. Semáforo ejecutivo

## 🟢 Funcionalidad

La aplicación cumple correctamente los principales procesos del negocio y posee una suite automatizada estable.

## 🟢 Rendimiento

Las pruebas k6 y Lighthouse presentan resultados favorables.

## 🟡 Usabilidad e interacción

El SUS de 85 y Lighthouse Accessibility de 93 representan resultados favorables.

Sin embargo, todavía se recomienda ampliar la muestra de usuarios y realizar más evaluaciones manuales de accesibilidad.

## 🟡 Seguridad

No existen vulnerabilidades High en ZAP, pero permanecen cinco hallazgos Medium que deben ser tratados antes de producción.

## 🟢 Fiabilidad

Las pruebas automatizadas demuestran estabilidad de los principales procesos funcionales.

## 🟢 Mantenibilidad

La aplicación dispone de alta cobertura, integración continua y una estructura favorable para automatización.

## 🟡 Compatibilidad

La cobertura actual se encuentra principalmente concentrada en Chromium.

## 🟡 Flexibilidad

La arquitectura es portable, aunque aún se necesita validar su comportamiento en una variedad más amplia de ambientes.

---

# 17. Decisión final del equipo de QA

# 🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN

Biblioteca Virtual presenta un nivel favorable de calidad general, alcanzando:

# **88.6/100**

La aplicación presenta fortalezas importantes en funcionalidad, rendimiento, mantenibilidad y fiabilidad.

También obtiene una valoración positiva de usabilidad, con:

**SUS = 85/100**

y una accesibilidad automatizada favorable:

**Lighthouse Accessibility = 93/100**

Sin embargo, el equipo de QA no recomienda todavía una liberación productiva sin restricciones debido principalmente a los cinco hallazgos Medium encontrados por OWASP ZAP.

Antes de producción se recomienda implementar los Quick Wins de seguridad definidos en el roadmap y posteriormente repetir las pruebas de seguridad.

También debe ampliarse la ejecución multibrowser y continuar fortaleciendo las evaluaciones de accesibilidad y concurrencia.

Una vez atendidos estos aspectos, el sistema puede evolucionar desde:

**🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN**

hacia:

**🟢 APROBADO PARA PRODUCCIÓN**
# ENTREGABLE 1 — ANÁLISIS DE ESTÁNDARES DE CALIDAD

## Biblioteca Virtual

### Aplicación de ISO/IEC 25010:2023, ISO/IEC/IEEE 29119-2:2021 y WCAG 2.2

---

# Introducción

El aseguramiento de la calidad de software requiere evaluar un producto desde diferentes perspectivas y no limitar el análisis únicamente a comprobar que sus funciones principales respondan correctamente. Un sistema puede ejecutar adecuadamente una tarea y, al mismo tiempo, presentar debilidades relacionadas con seguridad, rendimiento, accesibilidad, compatibilidad, mantenibilidad o experiencia de usuario. Por esta razón, el Proyecto Final de Biblioteca Virtual fue abordado mediante un proceso integral de Quality Assurance que combina diferentes técnicas, niveles de prueba, herramientas automatizadas y estándares internacionales.

Biblioteca Virtual es una aplicación web orientada a la administración de libros, lectores y préstamos. El sistema fue desarrollado utilizando Node.js, Express, SQLite, HTML, CSS y JavaScript. Entre sus principales funciones se encuentran la autenticación, administración del catálogo bibliográfico, registro de lectores, creación de préstamos, devolución de ejemplares y consulta de préstamos activos.

La evaluación realizada durante el proyecto incluyó pruebas unitarias, pruebas end-to-end, validaciones de seguridad, rendimiento, accesibilidad, análisis estático, cobertura de código, integración continua, regresión visual y pruebas diseñadas con apoyo de inteligencia artificial. La combinación de estas técnicas permitió obtener evidencia cuantitativa y cualitativa sobre el comportamiento real de la aplicación.

Para estructurar la evaluación se utilizaron tres referencias principales. ISO/IEC 25010:2023 permitió analizar la calidad del producto; ISO/IEC/IEEE 29119-2:2021 fue utilizada como referencia para organizar el proceso de pruebas; y WCAG 2.2 fue seleccionada como norma adicional debido a la naturaleza web de Biblioteca Virtual y a la importancia de garantizar una interacción accesible.

Los porcentajes incluidos en este documento corresponden a una metodología de puntuación interna creada para el Proyecto Final a partir de las evidencias obtenidas. ISO/IEC 25010 no establece una fórmula universal que obligue a asignar estos porcentajes ni a promediarlos. Por lo tanto, los resultados representan una valoración técnica de QA dentro del alcance académico del proyecto y no una certificación oficial ISO.

---

# 1. ISO/IEC 25010:2023 aplicada a Biblioteca Virtual

## 1.1 Aplicación del modelo de calidad

ISO/IEC 25010 proporciona un modelo que permite analizar diferentes propiedades de calidad de un producto software.

La edición 2023 contempla nueve características principales. Debido a que la rúbrica del Proyecto Final solicita específicamente ocho características, se evaluaron las ocho que presentan relación directa con Biblioteca Virtual y se documentó la no aplicación independiente de Safety.

Safety no fue evaluada como una dimensión individual debido a que Biblioteca Virtual no controla maquinaria, dispositivos médicos, sistemas de transporte, infraestructura crítica ni procesos donde un fallo del software pueda causar directamente daño físico a una persona.

Esto no significa que se ignore la protección de los usuarios. Los riesgos aplicables a este producto se encuentran principalmente dentro de seguridad, fiabilidad, integridad de datos y capacidad de interacción.

---

## 1.2 Metodología de puntuación

Se utilizó la siguiente escala interna:

| Rango | Semáforo | Interpretación |
|---|---|---|
| 90–100 | 🟢 | Nivel alto de calidad |
| 75–89 | 🟡 | Nivel aceptable con oportunidades de mejora |
| 0–74 | 🔴 | Requiere intervención prioritaria |

La puntuación de cada característica fue construida utilizando resultados de pruebas, métricas obtenidas mediante herramientas automatizadas, observaciones técnicas y limitaciones identificadas durante la evaluación.

---

# 1.3 Resumen de evaluación ISO/IEC 25010

| Característica | Cumplimiento | Estado |
|---|---:|---|
| Adecuación funcional | 96/100 | 🟢 |
| Eficiencia del desempeño | 95/100 | 🟢 |
| Compatibilidad | 78/100 | 🟡 |
| Capacidad de interacción | 89/100 | 🟡 |
| Fiabilidad | 92/100 | 🟢 |
| Seguridad | 78/100 | 🟡 |
| Mantenibilidad | 96/100 | 🟢 |
| Flexibilidad | 85/100 | 🟡 |

## Score general

La metodología interna del proyecto calcula el score general mediante el promedio simple de las ocho características evaluadas:

`96 + 95 + 78 + 89 + 92 + 78 + 96 + 85 = 709`

`709 / 8 = 88.625`

Redondeando a un decimal:

# **88.6/100**

## Decisión de QA

# **🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN**

---

# 1.4 Adecuación funcional

La adecuación funcional analiza si las funciones proporcionadas por Biblioteca Virtual cubren las necesidades para las cuales fue construida y si los resultados obtenidos son correctos.

## Subcaracterísticas

| Subcaracterística | Score | Evidencia | Hallazgo |
|---|---:|---|---|
| Completitud funcional | 95 % | Casos sobre autenticación, catálogo, lectores, préstamos y devoluciones | Los principales procesos están cubiertos |
| Corrección funcional | 98 % | 36 pruebas unitarias y 13 E2E aprobadas | No existen fallos críticos en la ejecución final |
| Pertinencia funcional | 95 % | Casos basados en reglas reales de negocio | Existen escenarios adicionales que pueden automatizarse |

## Evidencias

Durante el proyecto se documentaron 30 casos de prueba formales relacionados con los procesos de mayor importancia del sistema.

Las pruebas cubren:

- autenticación;
- cierre de sesión;
- validación de token;
- creación de libros;
- búsqueda de libros;
- modificación de información;
- eliminación;
- registro de lectores;
- préstamos;
- devoluciones;
- disponibilidad;
- estados activos;
- datos incompletos;
- entidades inexistentes;
- reglas de negocio;
- escenarios negativos.

La suite automatizada final obtuvo:

**36/36 pruebas unitarias aprobadas**

y:

**13/13 pruebas E2E aprobadas**

El Pass Rate de la suite E2E principal fue:

**100 %**

## Hallazgos

Los principales procesos funcionales presentan un comportamiento estable.

La matriz de cobertura construida durante el proyecto permite relacionar requisitos funcionales y no funcionales con los casos de prueba correspondientes.

Como mejora se recomienda automatizar completamente algunos escenarios adicionales relacionados con consistencia UI/API y operaciones extremas sobre disponibilidad.

## Resultado

# **96/100 🟢**

---

# 1.5 Eficiencia del desempeño

Esta característica analiza el comportamiento temporal del sistema, su capacidad y el desempeño observado bajo las condiciones utilizadas durante las pruebas.

## Subcaracterísticas

| Subcaracterística | Score | Evidencia | Hallazgo |
|---|---:|---|---|
| Comportamiento temporal | 98 % | k6 P95 = 1.45 ms | Resultado altamente favorable |
| Utilización de recursos | 92 % | Ejecución estable durante las pruebas | Falta monitoreo detallado de CPU y memoria |
| Capacidad | 95 % | 2,707 solicitudes y 8,121 checks | Debe ampliarse el volumen en pruebas futuras |

## Resultados k6

| Métrica | Resultado |
|---|---:|
| P95 | 1.45 ms |
| Error Rate | 0 % |
| Requests | 2,707 |
| Checks | 8,121 |
| Checks aprobados | 8,121 |
| Check Pass Rate | 100 % |

El P95 indica que el 95 % de los tiempos de respuesta analizados se mantuvo dentro de aproximadamente 1.45 ms en el ambiente evaluado.

El Error Rate fue:

**0 %**

Esto demuestra que la aplicación respondió satisfactoriamente durante el escenario de carga ejecutado.

## Lighthouse

El análisis mediante Lighthouse obtuvo:

**Performance = 90/100**

## Hallazgos

El rendimiento constituye una de las principales fortalezas del sistema dentro del alcance de las pruebas realizadas.

Sin embargo, estos resultados fueron obtenidos en un ambiente controlado y no representan automáticamente el comportamiento que tendrá el sistema bajo una infraestructura productiva con una cantidad significativamente mayor de usuarios.

Se recomienda ampliar posteriormente las pruebas hacia:

- stress testing;
- spike testing;
- endurance testing;
- mayor concurrencia;
- monitoreo de CPU;
- monitoreo de memoria;
- análisis de base de datos.

## Resultado

# **95/100 🟢**

---

# 1.6 Compatibilidad

La compatibilidad analiza la capacidad del producto para operar dentro de diferentes ambientes tecnológicos y relacionarse adecuadamente con otros componentes.

## Subcaracterísticas

| Subcaracterística | Score | Evidencia | Hallazgo |
|---|---:|---|---|
| Coexistencia | 80 % | Ejecución simultánea de aplicación y herramientas QA | No se identificaron conflictos críticos |
| Interoperabilidad | 76 % | Comunicación frontend/API REST | Falta validación con más plataformas y servicios |

## Evidencias

Biblioteca Virtual utiliza:

- Node.js;
- Express;
- SQLite;
- HTML;
- CSS;
- JavaScript;
- API REST;
- Playwright.

Las pruebas end-to-end principales se ejecutaron utilizando Chromium.

## Hallazgo principal

La principal limitación de compatibilidad consiste en que la suite E2E no posee todavía una matriz multibrowser completa.

No se ha ejecutado formalmente toda la suite sobre:

- Firefox;
- WebKit;
- diferentes sistemas operativos;
- dispositivos físicos diversos.

## Recomendación

Se recomienda incorporar los proyectos de navegador de Playwright dentro del pipeline:

- Chromium;
- Firefox;
- WebKit.

Esto permitirá comprobar que una modificación que funciona correctamente en un navegador no introduzca problemas en otro.

## Resultado

# **78/100 🟡**

---

# 1.7 Capacidad de interacción

La capacidad de interacción analiza las propiedades que permiten que los usuarios reconozcan, aprendan y utilicen correctamente las funciones del sistema.

Para esta característica se utilizaron diferentes fuentes de evidencia:

- Lighthouse;
- Axe;
- pruebas E2E;
- System Usability Scale.

---

## 1.7.1 Lighthouse

Los resultados obtenidos fueron:

| Área | Score |
|---|---:|
| Performance | 90 |
| Accessibility | 93 |
| Best Practices | 77 |
| SEO | 90 |

Para la evaluación de interacción y accesibilidad se utilizó especialmente:

# **Accessibility = 93/100**

---

## 1.7.2 Axe

Se incorporó `@axe-core/playwright` dentro de la suite E2E.

Durante una primera ejecución se detectó una violación de contraste clasificada como Serious sobre:

`#btn-nuevo-libro`

Axe informó un contraste aproximado de:

**3.21:1**

Sin embargo, la revisión del CSS permitió comprobar que los colores definitivos del botón presentaban un contraste adecuado.

La causa real del resultado estaba relacionada con el momento en que se ejecutaba la prueba.

La vista principal contiene una animación CSS de aparición y Axe estaba realizando la medición mientras el elemento aún se encontraba en transición.

La prueba fue modificada para esperar la finalización de las animaciones antes de iniciar el análisis de accesibilidad.

Después de la corrección:

- 13 pruebas E2E aprobadas;
- 0 fallidas;
- 0 flaky;
- 0 skipped;
- 0 violaciones Serious o Critical en la evaluación Axe final.

Este caso constituye una evidencia importante del proceso de QA, debido a que demuestra que una alerta automatizada debe ser investigada y no interpretada automáticamente como un defecto real.

---

# 1.7.3 System Usability Scale — SUS

Como complemento de las herramientas automatizadas se aplicó System Usability Scale a tres personas.

Las respuestas fueron obtenidas mediante una escala de 1 a 5.

La puntuación se calculó mediante el procedimiento estándar del instrumento.

Para las preguntas impares:

`respuesta - 1`

Para las preguntas pares:

`5 - respuesta`

Posteriormente se suman las contribuciones y el resultado se multiplica por 2.5.

## Participante 1

Respuestas:

`5, 1, 5, 1, 4, 1, 5, 1, 4, 1`

Resultado:

# **95/100**

---

## Participante 2

Respuestas:

`5, 1, 5, 1, 5, 1, 5, 5, 1, 5`

Resultado:

# **70/100**

---

## Participante 3

Respuestas:

`5, 2, 5, 2, 4, 2, 5, 1, 5, 1`

Resultado:

# **90/100**

---

## Resultado SUS consolidado

| Participante | SUS |
|---|---:|
| Persona 1 | 95 |
| Persona 2 | 70 |
| Persona 3 | 90 |
| **Promedio** | **85** |

# **SUS final = 85/100**

El resultado evidencia una percepción favorable de usabilidad por parte de las personas evaluadas.

También se observó una diferencia importante entre participantes, especialmente en la Persona 2.

Esta variación demuestra que las experiencias individuales no son necesariamente idénticas y refuerza la recomendación de ampliar el estudio con una muestra mayor en futuras evaluaciones.

---

# 1.7.4 Cálculo interno de Capacidad de interacción

Para obtener una puntuación integrada dentro del sistema interno de scoring del Proyecto Final se combinaron:

**Lighthouse Accessibility = 93**

y:

**SUS = 85**

Cálculo:

`(93 + 85) / 2 = 89`

Este promedio es una decisión metodológica del proyecto y no una fórmula establecida por ISO/IEC 25010.

## Evaluación por subcaracterísticas

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Reconocibilidad | 92 % | Navegación e interfaz |
| Aprendizaje | 87 % | SUS |
| Operabilidad | 92 % | Casos E2E |
| Protección frente a errores | 90 % | Casos negativos |
| Participación del usuario | 88 % | SUS y experiencia de uso |
| Inclusividad | 91 % | Lighthouse y Axe |
| Asistencia | 86 % | Formularios y mensajes |
| Autodescripción | 86 % | Etiquetas y controles |

## Resultado

# **89/100 🟡**

El resultado se encuentra cercano al nivel alto de la escala definida para el proyecto.

---

# 1.8 Fiabilidad

La fiabilidad analiza la capacidad del sistema para ejecutar sus funciones correctamente y conservar estados consistentes durante las condiciones de operación previstas.

## Subcaracterísticas

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Ausencia de fallos | 94 % | 36/36 unitarias y 13/13 E2E |
| Disponibilidad | 92 % | Servicio estable durante pruebas |
| Tolerancia a fallos | 88 % | Casos negativos |
| Recuperabilidad | 94 % | Manejo de estados y operaciones |

## Evidencias

El módulo de préstamos recibió atención especial debido a los riesgos asociados con la cantidad de ejemplares disponibles.

Se analizaron escenarios como:

- préstamo válido;
- devolución;
- doble devolución;
- préstamo con datos incompletos;
- utilización de libro inexistente;
- utilización de lector inexistente;
- operaciones repetidas;
- último ejemplar disponible;
- actualización de disponibilidad;
- mantenimiento del estado de préstamos activos.

## Hallazgos

Los resultados muestran un comportamiento estable en los escenarios automatizados.

Sin embargo, se recomienda profundizar la validación de concurrencia y agregar procedimientos formales de recuperación de la base de datos.

## Resultado

# **92/100 🟢**

---

# 1.9 Seguridad

La seguridad analiza la capacidad de Biblioteca Virtual para proteger información, recursos y operaciones frente a accesos o modificaciones no autorizadas.

La evaluación utilizó pruebas funcionales, auditoría de dependencias y análisis dinámico de seguridad.

---

## 1.9.1 npm audit

Se ejecutó:

`npm audit --omit=dev --audit-level=high`

El resultado fue:

# **0 vulnerabilidades detectadas en dependencias productivas**

Es importante señalar que esta afirmación corresponde específicamente a las dependencias productivas analizadas con el comando utilizado y no implica que todas las dependencias de desarrollo estén libres de advisories.

---

## 1.9.2 Pruebas funcionales de seguridad

Se diseñaron casos relacionados con:

- credenciales incorrectas;
- credenciales vacías;
- SQL Injection;
- XSS;
- entradas extremadamente largas;
- sesión sin token;
- token inválido;
- cierre de sesión.

---

# 1.9.3 OWASP ZAP

El análisis dinámico produjo los siguientes resultados:

| Severidad | Cantidad |
|---|---:|
| High | 0 |
| Medium | 5 |
| Low | 5 |
| Informational | 3 |

## Principales hallazgos

Se identificaron aspectos relacionados con:

- Content Security Policy ausente o incompleta;
- CORS demasiado permisivo;
- falta de protección anti-clickjacking;
- ausencia de Subresource Integrity en determinados recursos;
- falta de Cross-Origin policies;
- Permissions Policy;
- exposición de tecnología mediante X-Powered-By;
- ausencia de X-Content-Type-Options.

Una fortaleza importante es que:

# **ZAP High = 0**

Sin embargo, los cinco hallazgos Medium requieren tratamiento antes de considerar el sistema suficientemente endurecido para producción.

---

## Subcaracterísticas

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Confidencialidad | 80 % | Autenticación |
| Integridad | 86 % | Reglas de negocio y validaciones |
| No repudio | 70 % | Auditoría limitada |
| Responsabilidad | 72 % | Trazabilidad limitada |
| Autenticidad | 86 % | Controles de autenticación |
| Resistencia | 74 % | ZAP, XSS, SQL Injection y npm audit |

## Resultado

# **78/100 🟡**

---

# 1.10 Mantenibilidad

La mantenibilidad representa la capacidad de comprender, modificar y probar el producto de manera eficiente.

## Herramientas utilizadas

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

## Cobertura

Las pruebas unitarias obtuvieron:

# **36/36 aprobadas**

Los resultados de cobertura fueron:

| Métrica | Resultado |
|---|---:|
| Statements | 100 % |
| Branches | 98.33 % |
| Functions | 100 % |
| Lines | 100 % |

La rúbrica del Proyecto Final requiere mantener o superar:

**70 %**

La aplicación supera ampliamente este valor.

---

## Subcaracterísticas

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Modularidad | 95 % | Separación de responsabilidades |
| Reutilización | 92 % | Page Objects |
| Analizabilidad | 96 % | SonarQube y coverage |
| Modificabilidad | 97 % | Cambios validados mediante regresión |
| Testabilidad | 100 % | Suite automatizada |

## Hallazgos

La automatización permite detectar rápidamente regresiones después de modificar el código.

El análisis con SonarQube Cloud complementa la ejecución de pruebas al proporcionar información relacionada con calidad estática.

La cobertura debe mantenerse conforme el sistema evolucione.

También se debe evitar utilizar el porcentaje de cobertura como única medida de calidad, debido a que ejecutar una línea no significa necesariamente haber probado correctamente todas sus reglas de negocio.

## Resultado

# **96/100 🟢**

---

# 1.11 Flexibilidad

La flexibilidad analiza la capacidad del producto para adaptarse a diferentes ambientes, cambios de infraestructura y necesidades futuras.

## Subcaracterísticas

| Subcaracterística | Score | Evidencia |
|---|---:|---|
| Adaptabilidad | 88 % | Arquitectura web |
| Escalabilidad | 82 % | k6 favorable con alcance limitado |
| Instalabilidad | 90 % | Node.js y npm |
| Reemplazabilidad | 80 % | Separación parcial de componentes |

## Evidencias

La aplicación puede ejecutarse mediante tecnologías ampliamente disponibles.

La suite puede ejecutarse:

- localmente;
- dentro de GitHub Actions;
- en modo headless.

La separación entre frontend y backend facilita la modificación independiente de determinadas partes de la aplicación.

## Hallazgos

Aunque el sistema presenta resultados favorables de rendimiento, no se ha demostrado todavía su escalabilidad frente a una cantidad masiva de usuarios.

SQLite es adecuado para el alcance actual, aunque debe reevaluarse si el sistema evoluciona hacia escenarios de alta concurrencia.

## Resultado

# **85/100 🟡**

---

# 1.12 Resultado final ISO/IEC 25010

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

# **Score interno general = 88.6/100**

---

# 2. ISO/IEC/IEEE 29119 aplicada al proyecto

## 2.1 Objetivo

ISO/IEC/IEEE 29119 establece procesos y conceptos relacionados con las pruebas de software.

Para Biblioteca Virtual se utilizó principalmente ISO/IEC/IEEE 29119-2 como referencia para organizar actividades de:

- planificación;
- monitoreo;
- diseño;
- implementación;
- ejecución;
- gestión de incidentes;
- cierre.

Debido a que Biblioteca Virtual corresponde a un proyecto académico de tamaño reducido, la norma fue utilizada de manera proporcional al contexto.

No se buscó reproducir una estructura corporativa completa.

---

# 2.2 Planificación de pruebas

El proyecto dispone de un Plan de Pruebas actualizado.

Este contempla:

- objetivo;
- alcance;
- elementos bajo prueba;
- riesgos;
- prioridades;
- niveles de prueba;
- tipos de prueba;
- técnicas;
- herramientas;
- ambiente;
- datos;
- criterios de entrada;
- criterios de salida;
- suspensión;
- reanudación;
- clasificación de defectos;
- automatización;
- métricas;
- trazabilidad.

El plan fue actualizado progresivamente conforme se incorporaron nuevas herramientas y nuevos riesgos.

---

# 2.3 Análisis de riesgos

La estrategia de testing priorizó los procesos donde un fallo podría producir mayor impacto funcional o pérdida de consistencia.

Entre los riesgos analizados se encuentran:

- autenticación incorrecta;
- accesos no autorizados;
- préstamo sin disponibilidad;
- lector inexistente;
- libro inexistente;
- doble devolución;
- solicitudes simultáneas;
- datos incompletos;
- inconsistencias entre interfaz y API;
- estados inválidos;
- vulnerabilidades web;
- degradación de rendimiento;
- problemas de accesibilidad.

Este enfoque permitió dirigir los esfuerzos hacia los procesos más relevantes.

---

# 2.4 Diseño de pruebas

Se utilizaron diferentes técnicas:

- partición de equivalencia;
- análisis de valores límite;
- casos positivos;
- casos negativos;
- pruebas basadas en riesgo;
- transiciones de estado;
- reglas de negocio;
- análisis de seguridad;
- consistencia de información;
- concurrencia.

Se documentaron:

# **30 casos de prueba formales**

De ellos:

# **28 poseen cobertura automatizada total o parcial**

Esto representa aproximadamente:

# **93.33 % de automatización documental**

---

# 2.5 Matriz de trazabilidad

También se desarrolló una matriz que relaciona requisitos con sus pruebas correspondientes.

La matriz contempla:

- requisitos funcionales;
- requisitos no funcionales;
- casos;
- automatización;
- herramientas;
- estado.

La cobertura de requisitos documentada alcanzó:

# **18/18 requisitos = 100 %**

La trazabilidad permite identificar qué pruebas soportan cada requisito y detectar áreas que todavía necesitan mayor profundidad de validación.

---

# 2.6 Ambiente de pruebas

El ambiente final incluye:

- Node.js;
- Express;
- SQLite;
- Jest;
- Supertest;
- Playwright;
- Axe;
- Allure;
- k6;
- OWASP ZAP;
- SonarQube Cloud;
- GitHub Actions.

Las pruebas pueden ejecutarse localmente y dentro del pipeline.

---

# 2.7 Ejecución

## Pruebas unitarias

Resultado:

# **36/36 aprobadas**

## E2E

Resultado:

# **13/13 aprobadas**

## Pass Rate E2E

# **100 %**

## Coverage

- Statements: 100 %.
- Branches: 98.33 %.
- Functions: 100 %.
- Lines: 100 %.

---

# 2.8 Gestión de incidentes

Los incidentes identificados durante el proceso fueron analizados antes de modificar el sistema.

Un ejemplo representativo fue el caso de Axe y el contraste del botón de nuevo libro.

El proceso seguido fue:

1. detección;
2. reproducción;
3. análisis;
4. identificación de causa;
5. corrección;
6. reejecución;
7. validación.

La causa finalmente no era un contraste incorrecto del diseño, sino una sincronización inadecuada del test con una animación CSS.

Este caso demuestra la importancia de investigar la causa raíz de los resultados de automatización.

---

# 2.9 Monitoreo y control

GitHub Actions se utiliza para automatizar diferentes controles de calidad.

El pipeline integra tareas relacionadas con:

- pruebas unitarias;
- coverage;
- pruebas E2E;
- Allure;
- npm audit;
- k6;
- OWASP ZAP;
- SonarQube Cloud.

La ejecución más reciente del pipeline correspondiente al Proyecto Final terminó satisfactoriamente.

Los artefactos generados permiten conservar evidencia de:

- coverage;
- Allure;
- k6;
- ZAP.

---

# 2.10 Partes del estándar aplicadas

| Elemento | Estado |
|---|---|
| Planificación | ✅ Aplicado |
| Gestión basada en riesgos | ✅ Aplicado |
| Diseño de pruebas | ✅ Aplicado |
| Implementación | ✅ Aplicado |
| Ambiente | ✅ Aplicado |
| Ejecución | ✅ Aplicado |
| Registro de resultados | ✅ Aplicado |
| Gestión de incidentes | ✅ Aplicado |
| Monitoreo | ✅ Aplicado |
| Control | ✅ Aplicado |
| Trazabilidad | ✅ Aplicado |
| Cierre | ✅ Aplicado |
| Gobierno corporativo completo | ➖ Adaptado |

---

# 2.11 Elementos no implementados de forma completa

El proyecto no dispone de:

- oficina corporativa independiente de QA;
- múltiples niveles jerárquicos de aprobación;
- auditoría regulatoria externa;
- procesos contractuales con proveedores;
- aceptación contractual formal;
- infraestructura empresarial con múltiples ambientes;
- comité de liberación;
- departamentos independientes de desarrollo y QA.

Estos elementos fueron considerados fuera del alcance porque Biblioteca Virtual corresponde a un proyecto académico.

La adaptación no elimina los procesos principales del testing.

Se conservaron los aspectos que aportaban valor directo:

- planificación;
- riesgos;
- casos;
- ejecución;
- evidencia;
- métricas;
- automatización;
- trazabilidad;
- mejora continua.

---

# 2.12 Plan de Pruebas mejorado

El Plan de Pruebas evolucionó respecto a su versión inicial.

La versión final incorpora:

- pruebas unitarias;
- API testing;
- E2E;
- seguridad;
- accesibilidad;
- rendimiento;
- cobertura;
- análisis estático;
- CI/CD;
- Allure;
- IA;
- regresión visual;
- k6;
- ZAP;
- Axe;
- SonarQube.

La estrategia final utiliza diferentes capas de testing.

Las pruebas unitarias proporcionan retroalimentación rápida.

Las pruebas E2E validan los procesos completos.

Las herramientas especializadas permiten analizar características no funcionales que no pueden evaluarse adecuadamente mediante una sola suite funcional.

---

# 3. Norma adicional seleccionada — WCAG 2.2

## 3.1 Justificación

WCAG 2.2 fue seleccionada como referencia adicional porque Biblioteca Virtual es una aplicación web.

Un sistema puede cumplir sus requisitos funcionales y aun así dificultar el acceso a personas con determinadas necesidades visuales, motoras o cognitivas.

Por esta razón la accesibilidad debe considerarse parte de la calidad del producto.

WCAG organiza sus recomendaciones alrededor de cuatro principios:

- Perceptible.
- Operable.
- Comprensible.
- Robusto.

La evaluación realizada en el proyecto fue parcial.

Por lo tanto, no se declara una certificación formal WCAG 2.2 AA.

---

# 3.2 Lighthouse

Lighthouse permitió obtener una medición automatizada de diferentes aspectos de la interfaz.

Los resultados fueron:

| Categoría | Resultado |
|---|---:|
| Performance | 90 |
| Accessibility | 93 |
| Best Practices | 77 |
| SEO | 90 |

El valor de accesibilidad fue:

# **93/100**

Este resultado representa un comportamiento favorable.

Sin embargo, una puntuación alta de Lighthouse no constituye por sí sola una certificación WCAG.

---

# 3.3 Axe

Axe fue integrado directamente en Playwright.

La automatización permite ejecutar reglas relacionadas con accesibilidad sobre la vista principal.

La ejecución final no presentó violaciones clasificadas como:

- Serious;
- Critical.

Esto permitió incorporar la accesibilidad como parte de las regresiones automáticas y no solamente como una revisión realizada al final del proyecto.

---

# 3.4 Caso de contraste

Durante la evaluación Axe informó inicialmente una alerta de contraste en:

`#btn-nuevo-libro`

La medición observada durante la ejecución fue aproximadamente:

**3.21:1**

La revisión posterior permitió determinar que la interfaz estable utilizaba colores con un contraste adecuado.

El falso positivo se originaba porque la herramienta realizaba el análisis mientras la vista se encontraba dentro de una animación CSS.

La automatización se ajustó para esperar el final de las animaciones.

El test volvió a ejecutarse y finalizó correctamente.

Posteriormente, la suite completa produjo:

# **13/13 E2E aprobadas**

Este incidente demuestra que las herramientas automáticas no sustituyen el análisis humano.

---

# 3.5 Criterios evaluados

| Área relacionada con WCAG | Nivel de evaluación | Evidencia |
|---|---|---|
| Contraste | Evaluado | Axe y revisión manual |
| Nombre y función de controles | Automatizado parcialmente | Axe |
| Estructura del contenido | Automatizado parcialmente | Axe/Lighthouse |
| Etiquetas de formularios | Parcial | Axe |
| Navegación | Parcial | E2E |
| Errores de usuario | Parcial | Casos negativos |
| Accesibilidad general | Automatizado | Lighthouse 93 |
| Foco visible | Requiere ampliación manual | Roadmap |
| Navegación completa por teclado | Requiere prueba adicional | Roadmap |
| Lectores de pantalla | No evaluado formalmente | Futuro |
| Tamaño de objetivos | Requiere validación específica | Futuro |

---

# 3.6 Limitaciones de accesibilidad

Aunque los resultados son favorables, la evaluación automática no puede detectar todas las posibles barreras.

Se recomienda complementar el análisis con:

- navegación únicamente mediante teclado;
- lectores de pantalla;
- evaluación manual de foco;
- zoom;
- diferentes resoluciones;
- evaluación de mensajes de error;
- usuarios con diferentes necesidades;
- evaluación completa de criterios WCAG 2.2 AA.

Por esta razón Biblioteca Virtual presenta evidencia positiva de accesibilidad, pero el proyecto no afirma una conformidad total con WCAG 2.2.

---

# 4. Integración de los tres estándares

Las tres referencias utilizadas cumplen objetivos complementarios.

## ISO/IEC 25010

Permite responder:

**¿Qué nivel de calidad presenta el producto?**

## ISO/IEC/IEEE 29119

Permite responder:

**¿Cómo se organizó y ejecutó el proceso de pruebas?**

## WCAG 2.2

Permite responder:

**¿Qué tan accesible es la interacción web dentro del alcance evaluado?**

La combinación de estas referencias permitió realizar una evaluación mucho más completa que una simple comprobación funcional.

---

# 5. Dashboard general de resultados

| Métrica | Resultado |
|---|---:|
| Score interno ISO 25010 | **88.6/100** |
| SUS | **85/100** |
| Lighthouse Performance | **90/100** |
| Lighthouse Accessibility | **93/100** |
| Lighthouse Best Practices | **77/100** |
| Lighthouse SEO | **90/100** |
| Unit Tests | **36/36** |
| E2E | **13/13** |
| E2E Pass Rate | **100 %** |
| Coverage Statements | **100 %** |
| Coverage Branches | **98.33 %** |
| Coverage Functions | **100 %** |
| Coverage Lines | **100 %** |
| k6 P95 | **1.45 ms** |
| k6 Error Rate | **0 %** |
| k6 Checks | **8,121/8,121** |
| ZAP High | **0** |
| ZAP Medium | **5** |
| ZAP Low | **5** |

---

# 6. Principales fortalezas

La evaluación permitió identificar las siguientes fortalezas:

1. Alto nivel de cobertura automatizada.
2. 100 % de pruebas unitarias aprobadas.
3. 100 % de pruebas E2E principales aprobadas.
4. Excelente rendimiento en k6.
5. Error Rate de 0 %.
6. Lighthouse Performance de 90.
7. Lighthouse Accessibility de 93.
8. SUS de 85.
9. Cobertura superior al 98 % en todas las métricas.
10. Ausencia de vulnerabilidades High en OWASP ZAP.
11. Ausencia de vulnerabilidades High o Critical en dependencias productivas analizadas.
12. Integración continua funcional.
13. SonarQube Cloud integrado.
14. Allure como reporte automático.
15. Gestión formal de requisitos, casos y trazabilidad.

---

# 7. Hallazgos prioritarios

Los principales riesgos actuales se concentran en seguridad y amplitud de las pruebas.

Las prioridades son:

## Prioridad 1 — CORS

La configuración actual debe limitar los orígenes autorizados.

## Prioridad 2 — Content Security Policy

Debe implementarse una política CSP completa y coherente con los recursos utilizados.

## Prioridad 3 — Clickjacking

Debe configurarse una estrategia mediante `frame-ancestors` o controles equivalentes.

Otros aspectos importantes son:

- mejorar Lighthouse Best Practices;
- ejecutar multibrowser;
- ampliar pruebas Axe;
- ampliar concurrencia;
- mejorar políticas HTTP;
- validar accesibilidad manual.

---

# 8. Recomendaciones

Se recomienda comenzar por los Quick Wins de seguridad debido a que presentan alto impacto y relativamente bajo esfuerzo.

Después de implementar estas correcciones debe repetirse OWASP ZAP para comprobar la disminución de alertas Medium.

También se recomienda incorporar Firefox y WebKit al pipeline de Playwright.

A mediano plazo deben ampliarse las evaluaciones de accesibilidad y las pruebas de concurrencia.

El resultado SUS debe considerarse favorable, aunque futuras evaluaciones deberían involucrar una cantidad mayor de participantes para mejorar la representatividad.

Finalmente, las métricas principales deben evolucionar hacia criterios formales de liberación.

Una versión no debería liberarse cuando presente:

- tests críticos fallidos;
- vulnerabilidades High;
- cobertura inferior al límite definido;
- degradación importante de rendimiento;
- Quality Gate fallido;
- defectos críticos abiertos.

---

# 9. Decisión final de QA

El score interno obtenido fue:

# **88.6/100**

Los mejores resultados aparecen en:

- adecuación funcional;
- rendimiento;
- fiabilidad;
- mantenibilidad.

La usabilidad también presenta un resultado favorable:

# **SUS = 85/100**

y:

# **Lighthouse Accessibility = 93/100**

Sin embargo, permanecen:

# **5 hallazgos Medium de OWASP ZAP**

Por esta razón la recomendación final del equipo de QA es:

# **🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN**

La aplicación puede evolucionar hacia un estado verde después de aplicar el hardening de seguridad, repetir las auditorías y ampliar las pruebas de compatibilidad.

---

# Conclusión

La aplicación de ISO/IEC 25010:2023, ISO/IEC/IEEE 29119-2:2021 y WCAG 2.2 permitió evaluar Biblioteca Virtual desde una perspectiva integral de Quality Assurance.

ISO/IEC 25010 facilitó estructurar la evaluación de las propiedades del producto y permitió identificar fortalezas en adecuación funcional, eficiencia, fiabilidad y mantenibilidad.

ISO/IEC/IEEE 29119 permitió organizar la planificación, diseño, ejecución, trazabilidad, gestión de riesgos y monitoreo de las pruebas.

WCAG 2.2 permitió incorporar la accesibilidad como una dimensión adicional de calidad y evitar que la evaluación se limitara a comprobar únicamente si las funciones ejecutaban correctamente.

Los resultados obtenidos muestran una aplicación técnicamente sólida dentro del alcance académico del proyecto.

Las 36 pruebas unitarias y las 13 pruebas E2E principales finalizaron satisfactoriamente.

La cobertura supera ampliamente el 70 % solicitado.

El rendimiento presenta un P95 de 1.45 ms y Error Rate de 0 % dentro del escenario evaluado.

Lighthouse obtuvo 90 en Performance y 93 en Accessibility.

La evaluación SUS obtuvo 85/100.

OWASP ZAP no detectó vulnerabilidades High, aunque identificó cinco hallazgos Medium y cinco Low relacionados principalmente con configuración defensiva HTTP.

Estos resultados justifican una valoración global de:

# **88.6/100**

y una decisión de:

# **🟡 APROBADO CON MEJORAS ANTES DE PRODUCCIÓN**

La principal recomendación consiste en resolver primero las deficiencias Medium de seguridad, repetir el análisis ZAP, ampliar la compatibilidad multibrowser y continuar fortaleciendo accesibilidad y concurrencia.

De esta manera Biblioteca Virtual puede evolucionar progresivamente hacia un nivel de calidad adecuado para una liberación productiva.

---

# Referencias

International Organization for Standardization. (2023). *ISO/IEC 25010:2023 Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model*. ISO.

International Organization for Standardization, International Electrotechnical Commission, & Institute of Electrical and Electronics Engineers. (2021). *ISO/IEC/IEEE 29119-2:2021 Software and systems engineering — Software testing — Part 2: Test processes*.

World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C.

OWASP Foundation. (s. f.). *OWASP Zed Attack Proxy*.

Google. (s. f.). *Lighthouse*.

Grafana Labs. (s. f.). *k6 documentation*.
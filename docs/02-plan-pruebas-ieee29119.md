# Plan de Pruebas — Biblioteca Virtual

## ISO/IEC/IEEE 29119

## 1. Identificación del documento

Proyecto: Biblioteca Virtual  
Documento: Plan de Pruebas del Proyecto Final QA  
Versión: 1.0  
Estado: En ejecución  
Rama evaluada: proyecto-final-qa  
Norma de referencia: ISO/IEC/IEEE 29119-2:2021  

## 2. Propósito

El propósito del presente plan es establecer la estrategia, alcance, recursos, criterios, técnicas y actividades necesarias para evaluar la calidad del sistema Biblioteca Virtual.

Las pruebas se orientan a identificar defectos funcionales, problemas de seguridad, inconsistencias de datos, riesgos de concurrencia, dificultades de accesibilidad, degradaciones de rendimiento y regresiones introducidas durante el mantenimiento del sistema.

La estrategia combina pruebas manuales y automatizadas y aplica un enfoque basado en riesgos, priorizando las funcionalidades que podrían producir un mayor impacto sobre la operación de la biblioteca.

## 3. Alcance

El alcance comprende los módulos de autenticación, catálogo de libros, lectores, préstamos, devoluciones y las principales características no funcionales de la aplicación.

Se evaluarán:

- Inicio y cierre de sesión.
- Validación de credenciales.
- Gestión del catálogo.
- Registro y consulta de lectores.
- Registro de préstamos.
- Registro de devoluciones.
- Disponibilidad de ejemplares.
- Integridad y consistencia de los datos.
- Seguridad de dependencias.
- Seguridad dinámica de la aplicación.
- Accesibilidad.
- Rendimiento.
- Calidad del código.
- Regresión funcional.

## 4. Elementos fuera del alcance

No forman parte del alcance del proyecto final:

- Pruebas de infraestructura física.
- Pruebas sobre dispositivos especializados.
- Migraciones de bases de datos externas.
- Integraciones con sistemas bibliotecarios de terceros.
- Pruebas de recuperación ante desastres de infraestructura.
- Validación de navegadores no incluidos en el ambiente definido.

Estas áreas podrán incorporarse posteriormente dentro de un proceso de mejora continua.

## 5. Objetivos de prueba

Los objetivos principales son comprobar que las funciones críticas cumplen con el comportamiento esperado, identificar defectos antes de integrar cambios a producción, validar la consistencia del inventario de libros, comprobar el comportamiento de préstamos y devoluciones, verificar mecanismos de autenticación y seguridad y obtener métricas objetivas de calidad.

También se busca mantener una suite automatizada reproducible que pueda ejecutarse mediante integración continua en GitHub Actions.

## 6. Base de pruebas

La base de pruebas está formada por:

- Reglas funcionales implementadas en el backend.
- Interfaz web de Biblioteca Virtual.
- Endpoints REST.
- Casos de uso de autenticación.
- Gestión de libros.
- Gestión de lectores.
- Gestión de préstamos.
- Reglas de disponibilidad.
- Código fuente.
- Pruebas unitarias existentes.
- Escenarios E2E existentes.
- Análisis ISO/IEC 25010.
- Riesgos identificados mediante análisis humano e inteligencia artificial.

## 7. Niveles y tipos de pruebas

| Tipo de prueba | Herramienta | Objetivo |
|---|---|---|
| Unitarias | Jest / Supertest | Validar unidades del backend |
| Integración | Supertest / API | Comprobar interacción entre rutas, servicios y datos |
| E2E | Playwright | Validar procesos completos desde la interfaz |
| Seguridad de dependencias | npm audit | Detectar vulnerabilidades de producción |
| Seguridad dinámica | OWASP ZAP | Identificar riesgos en la aplicación en ejecución |
| Accesibilidad | Axe | Detectar problemas críticos y serios de accesibilidad |
| Rendimiento | k6 | Medir comportamiento bajo carga |
| Análisis estático | SonarQube Cloud | Evaluar calidad, mantenibilidad y seguridad del código |
| Regresión visual | Percy | Detectar cambios visuales no esperados |
| Regresión funcional | Jest / Playwright | Detectar impactos producidos por nuevos cambios |

## 8. Estrategia basada en riesgos

Las pruebas serán priorizadas de acuerdo con la probabilidad de ocurrencia y el impacto del defecto.

| Riesgo | Probabilidad | Impacto | Prioridad |
|---|---|---|---|
| Prestar un libro sin ejemplares | Alta | Alta | Crítica |
| Dos préstamos sobre el último ejemplar | Media | Alta | Crítica |
| Registrar devolución dos veces | Media | Alta | Alta |
| Inconsistencia entre UI y API | Media | Alta | Alta |
| Acceso sin autenticación | Media | Alta | Alta |
| Manipulación de sesión | Media | Alta | Alta |
| Datos incompletos o inválidos | Alta | Media | Alta |
| Error en disponibilidad después de devolución | Media | Alta | Alta |
| Vulnerabilidad en dependencia productiva | Media | Alta | Alta |
| Degradación de rendimiento | Media | Media | Media |
| Problemas de accesibilidad | Media | Media | Media |
| Diferencia visual no intencional | Media | Baja | Media |

## 9. Técnicas de diseño de pruebas

Se utilizarán técnicas de caja negra y caja blanca dependiendo del nivel de prueba.

Las técnicas principales serán partición de equivalencia, análisis de valores límite, tablas de decisión, transición de estados, pruebas negativas, pruebas basadas en riesgos, pruebas de concurrencia, pruebas exploratorias y análisis estructural mediante cobertura de código.

## 10. Ambiente de pruebas

| Componente | Tecnología |
|---|---|
| Backend | Node.js 22 y Express |
| Base de datos | SQLite |
| Frontend | HTML, CSS y JavaScript |
| Automatización E2E | Playwright |
| Unitarias | Jest y Supertest |
| Navegador CI | Chromium |
| CI/CD | GitHub Actions |
| Análisis estático | SonarQube Cloud |
| Rendimiento | k6 |
| Seguridad | npm audit y OWASP ZAP |
| Accesibilidad | Axe |
| Reportes | Allure, Coverage y artefactos GitHub Actions |

## 11. Datos de prueba

Los datos utilizados durante la automatización deberán ser controlados, reproducibles y preferiblemente independientes entre pruebas.

Se utilizarán libros, lectores y préstamos creados específicamente para cada escenario cuando sea posible.

Las credenciales sensibles no deberán almacenarse directamente en el repositorio.

Los escenarios automatizados utilizarán fixtures, variables de entorno o datos efímeros cuando corresponda.

## 12. Criterios de entrada

Una ejecución podrá comenzar cuando:

- El código pueda instalarse correctamente.
- Las dependencias estén disponibles.
- La base de datos pueda inicializarse.
- La aplicación pueda iniciar sin errores críticos.
- Los datos necesarios estén disponibles.
- El ambiente de pruebas se encuentre operativo.

## 13. Criterios de salida

La fase de pruebas podrá considerarse satisfactoria cuando:

- Las 36 pruebas unitarias sean aprobadas.
- La cobertura mantenga los umbrales establecidos.
- Al menos 10 escenarios E2E estén aprobados.
- No existan vulnerabilidades High o Critical en dependencias de producción.
- Los umbrales definidos en k6 sean satisfechos.
- No existan defectos críticos abiertos que impidan los procesos principales.
- Los reportes de ejecución sean generados correctamente.
- La matriz de cobertura demuestre trazabilidad de los requisitos críticos.

## 14. Criterios de suspensión

Las pruebas podrán suspenderse cuando la aplicación no pueda iniciar, la base de datos se encuentre corrupta, exista un defecto bloqueante que impida continuar los flujos principales, fallen dependencias indispensables del entorno o el ambiente produzca resultados no reproducibles.

## 15. Criterios de reanudación

Las pruebas podrán reanudarse una vez corregido el problema bloqueante, restaurado el ambiente, verificada la estabilidad básica de la aplicación y ejecutadas satisfactoriamente las pruebas de humo correspondientes.

## 16. Gestión de defectos

Los defectos deberán contener como mínimo:

ID del defecto, título, módulo afectado, severidad, prioridad, precondiciones, pasos para reproducir, resultado esperado, resultado obtenido, evidencia y estado.

Los niveles de severidad utilizados serán:

Crítica: impide una función esencial o produce pérdida o corrupción grave de datos.  
Alta: afecta una función importante sin alternativa aceptable.  
Media: afecta parcialmente una función pero existe una alternativa.  
Baja: impacto menor, visual o de facilidad de uso.

## 17. Automatización

La automatización se ejecutará mediante GitHub Actions.

El pipeline incluye:

Jest y cobertura → Playwright + Axe + Allure → auditoría de dependencias → SonarQube Cloud → k6 → OWASP ZAP.

La ejecución automatizada permitirá detectar regresiones durante el proceso de integración continua.

## 18. Evidencias y entregables

Los principales entregables del proceso serán:

- Plan de pruebas.
- Análisis ISO/IEC 25010.
- Catálogo de al menos 30 casos de prueba.
- Matriz de cobertura.
- Código de pruebas unitarias.
- Código de pruebas E2E.
- Reporte de cobertura.
- Reporte Allure.
- Resultados de k6.
- Reporte OWASP ZAP.
- Resultado npm audit.
- Dashboard SonarQube Cloud.
- Evidencias de inteligencia artificial.
- Evidencias de regresión visual con Percy.
- Ejecuciones de GitHub Actions.

## 19. Métricas

Se recopilarán las siguientes métricas:

| Métrica | Indicador |
|---|---|
| Pruebas unitarias aprobadas | Tests aprobados / tests ejecutados |
| Cobertura | Statements, branches, functions y lines |
| E2E aprobados | Escenarios aprobados / ejecutados |
| Defectos | Cantidad por severidad |
| Vulnerabilidades | Cantidad por nivel |
| Rendimiento | p95 de respuesta |
| Fallos HTTP | Porcentaje de solicitudes fallidas |
| Accesibilidad | Incidencias critical y serious |
| Quality Gate | Aprobado o rechazado |
| Cobertura de requisitos | Requisitos con al menos un caso asociado |

## 20. Roles y responsabilidades

QA Engineer: diseñar casos, ejecutar pruebas, analizar riesgos, automatizar escenarios y documentar resultados.

Desarrollo: corregir defectos detectados y mantener la aplicación desplegable.

CI/CD: ejecutar automáticamente los controles establecidos para cada cambio del código.

IA: apoyar el diseño y generación de pruebas bajo revisión humana.

## 21. Trazabilidad

Cada requisito funcional y no funcional será relacionado con uno o más casos de prueba mediante una matriz de cobertura.

La trazabilidad permitirá comprobar que los procesos críticos del sistema cuentan con evidencia suficiente y permitirá identificar requisitos con cobertura insuficiente.

## 22. Resultado esperado

El producto será considerado candidato para liberación cuando los controles críticos definidos en este plan sean satisfactorios y no existan defectos críticos conocidos que comprometan la operación del sistema.

El resultado final del proceso deberá proporcionar evidencia objetiva suficiente para responder a la decisión de calidad: APROBADO o NO APROBADO para liberación.
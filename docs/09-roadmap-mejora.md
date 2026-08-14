# Roadmap de Mejora — Biblioteca Virtual

## 1. Objetivo

El presente roadmap prioriza las mejoras identificadas durante la evaluación de calidad de Biblioteca Virtual.

Las acciones se organizan de acuerdo con su nivel de esfuerzo, impacto y plazo de implementación.

Se establecen tres horizontes:

- Quick Wins: 1 a 2 semanas.
- Mejoras de mediano plazo: 1 a 3 meses.
- Inversiones estratégicas: 3 a 12 meses.

---

# 2. Resumen ejecutivo

| Horizonte | Objetivo principal | Prioridad |
|---|---|---|
| 1–2 semanas | Reducir hallazgos Medium y mejorar configuración de seguridad | Alta |
| 1–3 meses | Ampliar cobertura técnica y compatibilidad | Media/Alta |
| 3–12 meses | Fortalecer operación, escalabilidad y observabilidad | Estratégica |

---

# 3. Quick Wins — 1 a 2 semanas

## QW-01 — Restringir CORS

**Problema:**  
El servidor utiliza una configuración CORS abierta que permite solicitudes desde cualquier origen.

**Acción recomendada:**  
Configurar explícitamente los orígenes autorizados para cada ambiente.

**Impacto:** Alto.  
**Esfuerzo:** Bajo.  
**Prioridad:** Crítica.

**Resultado esperado:**  
Eliminar el hallazgo Medium relacionado con Cross-Domain Misconfiguration.

---

## QW-02 — Implementar Content Security Policy

**Problema:**  
OWASP ZAP identificó ausencia o configuración incompleta de Content Security Policy.

**Acción recomendada:**  
Definir una CSP adaptada a los recursos utilizados por la aplicación.

Como mínimo revisar:

- `default-src`
- `script-src`
- `style-src`
- `img-src`
- `font-src`
- `frame-ancestors`
- `form-action`

**Impacto:** Alto.  
**Esfuerzo:** Bajo/Medio.  
**Prioridad:** Alta.

---

## QW-03 — Protección contra clickjacking

**Problema:**  
No existe protección explícita mediante `frame-ancestors` o `X-Frame-Options`.

**Acción recomendada:**  
Configurar:

`frame-ancestors 'none'`

o:

`X-Frame-Options: DENY`

**Impacto:** Alto.  
**Esfuerzo:** Bajo.  
**Prioridad:** Alta.

---

## QW-04 — Ocultar X-Powered-By

**Problema:**  
Express informa la tecnología utilizada mediante el encabezado:

`X-Powered-By: Express`

**Acción recomendada:**  
Deshabilitarlo desde la configuración de Express.

**Impacto:** Medio.  
**Esfuerzo:** Muy bajo.  
**Prioridad:** Media.

---

## QW-05 — Incorporar X-Content-Type-Options

**Problema:**  
ZAP detectó ausencia de:

`X-Content-Type-Options: nosniff`

**Acción recomendada:**  
Agregar el encabezado a las respuestas del servidor.

**Impacto:** Medio.  
**Esfuerzo:** Muy bajo.  
**Prioridad:** Media.

---

## QW-06 — Configurar Permissions Policy

**Problema:**  
No existe una política explícita sobre funcionalidades del navegador.

**Acción recomendada:**  
Deshabilitar permisos que Biblioteca Virtual no utiliza, por ejemplo:

- cámara;
- micrófono;
- geolocalización.

**Impacto:** Medio.  
**Esfuerzo:** Bajo.

---

## QW-07 — Mejorar Lighthouse Best Practices

**Situación actual:**  
Lighthouse Best Practices = 77/100.

**Acción recomendada:**  
Revisar las recomendaciones específicas de Lighthouse, priorizando seguridad del navegador, recursos externos y configuración HTTP.

**Objetivo:**  
Alcanzar al menos:

**90/100**

---

# 4. Mejoras de mediano plazo — 1 a 3 meses

## MP-01 — Automatización multibrowser

**Situación actual:**  
La suite principal E2E se ejecuta principalmente sobre Chromium.

**Acción recomendada:**  
Incorporar:

- Chromium.
- Firefox.
- WebKit.

**Resultado esperado:**  
Mayor confianza en compatibilidad entre navegadores.

---

## MP-02 — Ampliar accesibilidad

**Situación actual:**  
La auditoría Axe automatizada se concentra en la vista principal.

**Acción recomendada:**  
Agregar evaluaciones de accesibilidad para:

- Login.
- Catálogo.
- Formularios.
- Lectores.
- Préstamos.
- Modales.

**Objetivo:**  
Mantener cero impactos `critical` y `serious`.

---

## MP-03 — Automatizar escenarios pendientes de préstamos

Incorporar completamente a la suite:

- préstamo sin disponibilidad;
- consistencia UI/API después de devolución;
- operaciones rápidas repetidas;
- transiciones inválidas adicionales.

**Resultado esperado:**  
Aumentar la cobertura de riesgos de integridad.

---

## MP-04 — Ampliar pruebas de concurrencia

**Situación actual:**  
Existe validación del último ejemplar disponible.

**Acción recomendada:**  
Simular mayor cantidad de solicitudes simultáneas sobre:

- préstamos;
- devoluciones;
- creación de registros.

**Resultado esperado:**  
Identificar posibles race conditions antes de producción.

---

## MP-05 — Validación en dispositivos y resoluciones reales

Ejecutar pruebas sobre:

- escritorio;
- tablet;
- dispositivos móviles;
- diferentes resoluciones.

**Resultado esperado:**  
Mejorar compatibilidad y experiencia de usuario.

---

## MP-06 — Integrar métricas de Lighthouse al CI/CD

Automatizar Lighthouse mediante herramientas compatibles con CI para evitar regresiones de:

- Performance;
- Accessibility;
- Best Practices;
- SEO.

**Objetivo sugerido:**

- Performance ≥ 90.
- Accessibility ≥ 90.
- Best Practices ≥ 90.
- SEO ≥ 90.

---

# 5. Inversiones estratégicas — 3 a 12 meses

## IE-01 — Ambiente de QA similar a producción

Implementar un ambiente independiente con configuración similar al entorno productivo.

Debe incluir:

- infraestructura equivalente;
- configuración de seguridad;
- variables de entorno;
- datos controlados;
- monitoreo.

**Beneficio:**  
Aumentar la precisión de pruebas de rendimiento, seguridad y compatibilidad.

---

## IE-02 — Observabilidad

Incorporar herramientas para monitorear:

- errores;
- tiempos de respuesta;
- disponibilidad;
- consumo de recursos;
- eventos críticos.

**Beneficio:**  
Detectar problemas posteriores a una liberación antes de que afecten a una gran cantidad de usuarios.

---

## IE-03 — Estrategia formal de pruebas de carga

Ampliar k6 hacia pruebas de:

- load testing;
- stress testing;
- spike testing;
- endurance testing.

**Situación actual:**  
P95 = 1.45 ms y Error Rate = 0 % en la prueba realizada.

**Objetivo:**  
Determinar los límites reales de capacidad del sistema.

---

## IE-04 — Seguridad continua

Fortalecer DevSecOps integrando:

- análisis dinámico periódico;
- análisis estático;
- auditoría de dependencias;
- revisión de secretos;
- políticas de actualización.

**Beneficio:**  
Reducir vulnerabilidades antes de producción.

---

## IE-05 — Estrategia de respaldo y recuperación

Formalizar:

- respaldos automáticos;
- restauración de SQLite;
- pruebas periódicas de recuperación;
- documentación RPO/RTO.

**Beneficio:**  
Reducir el riesgo de pérdida de información.

---

## IE-06 — Calidad como criterio de liberación

Establecer formalmente un Quality Gate donde una versión solamente pueda liberarse si cumple:

- pruebas unitarias aprobadas;
- E2E aprobadas;
- coverage ≥ 70 %;
- 0 vulnerabilidades High;
- rendimiento dentro de umbral;
- Quality Gate de Sonar aprobado;
- hallazgos críticos resueltos.

---

# 6. Matriz Impacto vs Esfuerzo

| Mejora | Impacto | Esfuerzo | Prioridad |
|---|---|---|---|
| Restringir CORS | Alto | Bajo | 🔴 Inmediata |
| CSP | Alto | Bajo/Medio | 🔴 Inmediata |
| Anti-clickjacking | Alto | Bajo | 🔴 Inmediata |
| X-Powered-By | Medio | Muy bajo | 🟢 Quick Win |
| X-Content-Type-Options | Medio | Muy bajo | 🟢 Quick Win |
| Permissions Policy | Medio | Bajo | 🟢 Quick Win |
| Multibrowser | Alto | Medio | 🟡 Mediano plazo |
| Axe en todas las vistas | Alto | Medio | 🟡 Mediano plazo |
| Mayor concurrencia | Alto | Medio | 🟡 Mediano plazo |
| Lighthouse CI | Medio | Medio | 🟡 Mediano plazo |
| Observabilidad | Alto | Alto | 🔵 Estratégica |
| QA similar a producción | Alto | Alto | 🔵 Estratégica |
| Respaldo/recuperación | Alto | Medio/Alto | 🔵 Estratégica |

---

# 7. Meta de calidad esperada

Después de implementar los Quick Wins se espera:

| Indicador | Actual | Objetivo |
|---|---:|---:|
| ZAP Medium | 5 | 0 |
| ZAP High | 0 | 0 |
| Lighthouse Best Practices | 77 | ≥ 90 |
| E2E Pass Rate | 100 % | Mantener 100 % |
| Coverage | >98 % | Mantener ≥ 90 % |
| k6 Error Rate | 0 % | Mantener < 1 % |
| k6 P95 | 1.45 ms | Mantener < 500 ms |

---

# 8. Recomendación ejecutiva

El equipo de QA recomienda no realizar cambios estructurales mayores antes de atender los Quick Wins de seguridad.

Las deficiencias principales detectadas no requieren rediseñar la aplicación; gran parte de ellas puede resolverse mediante configuración del servidor y fortalecimiento de encabezados HTTP.

Después de corregir los cinco hallazgos Medium, debe repetirse el análisis OWASP ZAP para demostrar una reducción cuantificable del riesgo.

---

# 9. Conclusión

Biblioteca Virtual presenta una base técnica sólida, pero requiere acciones de hardening antes de considerarse preparada para una liberación productiva.

El roadmap prioriza primero cambios de alto impacto y bajo esfuerzo, posteriormente amplía la cobertura de pruebas y finalmente propone inversiones orientadas a operación, escalabilidad y seguridad continua.

La aplicación de este roadmap permitiría evolucionar el estado actual de:

**🟡 Aprobado con mejoras antes de producción**

hacia:

**🟢 Aprobado para producción**
# Top 10 Hallazgos de Calidad y Seguridad — Biblioteca Virtual

## Resumen

El análisis dinámico realizado con OWASP ZAP identificó diez hallazgos de seguridad que requieren atención.

No se detectaron vulnerabilidades de severidad High.

| Severidad | Cantidad |
|---|---:|
| High | 0 |
| Medium | 5 |
| Low | 5 |
| Total | 10 |

---

## H-01 — Content Security Policy incompleta

**Severidad:** Medium

**Descripción técnica:**  
La política Content-Security-Policy existente en determinados recursos no define explícitamente directivas como `frame-ancestors` y `form-action`.

**Impacto en el usuario:**  
Una política CSP incompleta reduce la capacidad del navegador para limitar ciertos comportamientos no autorizados y aumenta la superficie de exposición ante ataques relacionados con contenido malicioso.

**Cómo reproducir:**  
Ejecutar OWASP ZAP Baseline contra la aplicación y revisar la alerta `CSP: Failure to Define Directive with No Fallback`.

**Corrección recomendada:**  
Definir una política CSP completa incluyendo como mínimo las directivas `frame-ancestors` y `form-action`.

---

## H-02 — Content Security Policy no configurada

**Severidad:** Medium

**Descripción técnica:**  
Las respuestas principales de la aplicación no incluyen el encabezado HTTP `Content-Security-Policy`.

**Impacto en el usuario:**  
La ausencia de CSP reduce una capa de defensa del navegador frente a ataques como Cross-Site Scripting e inyección de contenido.

**Cómo reproducir:**  
Acceder a la aplicación y revisar los encabezados HTTP de la respuesta o ejecutar OWASP ZAP.

**Corrección recomendada:**  
Implementar una política Content-Security-Policy restrictiva y adaptada a los recursos utilizados por Biblioteca Virtual.

---

## H-03 — Configuración CORS demasiado permisiva

**Severidad:** Medium

**Descripción técnica:**  
El servidor responde utilizando:

`Access-Control-Allow-Origin: *`

Esto permite solicitudes desde cualquier origen para recursos habilitados mediante CORS.

**Impacto en el usuario:**  
Un origen externo podría intentar consumir recursos disponibles públicamente desde el navegador, aumentando innecesariamente la superficie de exposición.

**Cómo reproducir:**  
Ejecutar OWASP ZAP y revisar la alerta `Cross-Domain Misconfiguration`.

**Corrección recomendada:**  
Sustituir la política global abierta por una lista explícita de orígenes autorizados para cada ambiente.

---

## H-04 — Falta de protección anti-clickjacking

**Severidad:** Medium

**Descripción técnica:**  
Las respuestas principales no incluyen `X-Frame-Options` ni una directiva CSP `frame-ancestors`.

**Impacto en el usuario:**  
La aplicación podría ser cargada dentro de un iframe controlado por un tercero y utilizarse como parte de un ataque de clickjacking.

**Cómo reproducir:**  
Ejecutar OWASP ZAP y revisar la alerta `Missing Anti-clickjacking Header`.

**Corrección recomendada:**  
Utilizar `frame-ancestors 'none'` dentro de CSP o configurar `X-Frame-Options: DENY`.

---

## H-05 — Subresource Integrity ausente

**Severidad:** Medium

**Descripción técnica:**  
La aplicación consume recursos externos, como Google Fonts, sin utilizar mecanismos de integridad para los recursos señalados por ZAP.

**Impacto en el usuario:**  
Una alteración del recurso externo podría afectar los contenidos cargados por la aplicación.

**Cómo reproducir:**  
Ejecutar OWASP ZAP y revisar la alerta `Sub Resource Integrity Attribute Missing`.

**Corrección recomendada:**  
Evaluar el alojamiento local de recursos externos o incorporar controles de integridad cuando técnicamente corresponda.

---

## H-06 — Cross-Origin-Embedder-Policy no configurada

**Severidad:** Low

**Descripción técnica:**  
El encabezado `Cross-Origin-Embedder-Policy` no se encuentra configurado.

**Impacto en el usuario:**  
La aplicación posee menor aislamiento frente a determinados recursos cargados desde otros orígenes.

**Cómo reproducir:**  
Revisar los encabezados HTTP de la respuesta o ejecutar OWASP ZAP.

**Corrección recomendada:**  
Evaluar la configuración:

`Cross-Origin-Embedder-Policy: require-corp`

si es compatible con las necesidades de la aplicación.

---

## H-07 — Cross-Origin-Opener-Policy no configurada

**Severidad:** Low

**Descripción técnica:**  
No se encuentra configurado el encabezado `Cross-Origin-Opener-Policy`.

**Impacto en el usuario:**  
Existe menor aislamiento entre contextos de navegación que interactúan con documentos de diferentes orígenes.

**Cómo reproducir:**  
Ejecutar OWASP ZAP y revisar la alerta correspondiente.

**Corrección recomendada:**  
Configurar cuando corresponda:

`Cross-Origin-Opener-Policy: same-origin`

---

## H-08 — Permissions Policy no configurada

**Severidad:** Low

**Descripción técnica:**  
La aplicación no incorpora el encabezado `Permissions-Policy`.

**Impacto en el usuario:**  
No existe una política explícita que limite funcionalidades del navegador como cámara, micrófono, geolocalización y otras capacidades que la aplicación no necesita.

**Cómo reproducir:**  
Revisar los encabezados HTTP o ejecutar OWASP ZAP.

**Corrección recomendada:**  
Crear una Permissions Policy que deshabilite funcionalidades no requeridas por Biblioteca Virtual.

---

## H-09 — Exposición de tecnología mediante X-Powered-By

**Severidad:** Low

**Descripción técnica:**  
El servidor expone:

`X-Powered-By: Express`

**Impacto en el usuario:**  
Un atacante puede identificar con mayor facilidad la tecnología del servidor y orientar ataques hacia vulnerabilidades conocidas del framework.

**Cómo reproducir:**  
Consultar los encabezados HTTP de cualquier respuesta del servidor.

**Corrección recomendada:**  
Deshabilitar el encabezado `X-Powered-By` en Express.

---

## H-10 — X-Content-Type-Options ausente

**Severidad:** Low

**Descripción técnica:**  
Varias respuestas no incorporan:

`X-Content-Type-Options: nosniff`

**Impacto en el usuario:**  
Algunos navegadores podrían intentar interpretar un recurso utilizando un tipo MIME diferente al declarado.

**Cómo reproducir:**  
Ejecutar OWASP ZAP y revisar la alerta `X-Content-Type-Options Header Missing`.

**Corrección recomendada:**  
Incorporar:

`X-Content-Type-Options: nosniff`

en las respuestas del servidor.

---

# Priorización

Los tres hallazgos prioritarios para corrección son:

1. **H-03 — Configuración CORS demasiado permisiva.**
2. **H-02 — Ausencia de Content Security Policy.**
3. **H-04 — Falta de protección anti-clickjacking.**

Estos hallazgos poseen severidad Medium y afectan directamente la configuración defensiva del servidor web.

---

# Recomendación general

Se recomienda fortalecer la configuración HTTP de Biblioteca Virtual mediante una estrategia centralizada de security headers, restringir CORS a los orígenes realmente autorizados y establecer una Content Security Policy apropiada.

Varias de las deficiencias identificadas pueden corregirse desde la configuración del servidor Express sin modificar la lógica funcional del sistema.

---

# Resultado ejecutivo

OWASP ZAP:

- High: 0
- Medium: 5
- Low: 5
- Informational: 3

El sistema no presenta vulnerabilidades High en el escaneo realizado, pero requiere endurecimiento de configuración antes de considerarse listo para un ambiente productivo.
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://127.0.0.1:3000';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  const response = http.get(`${BASE_URL}/api/libros`, {
    tags: { name: 'GET /api/libros' },
  });

  check(response, {
    'responde con estado 200': (result) => result.status === 200,
    'responde en formato JSON': (result) =>
      (result.headers['Content-Type'] || '').includes('application/json'),
    'responde en menos de 500 ms': (result) => result.timings.duration < 500,
  });

  sleep(1);
}

function metricValue(data, metric, key, fallback = 0) {
  return data.metrics[metric] && data.metrics[metric].values[key] !== undefined
    ? data.metrics[metric].values[key]
    : fallback;
}

function percentage(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function htmlSummary(data) {
  const p95 = metricValue(data, 'http_req_duration', 'p(95)');
  const average = metricValue(data, 'http_req_duration', 'avg');
  const failed = metricValue(data, 'http_req_failed', 'rate');
  const checks = metricValue(data, 'checks', 'rate');
  const requests = metricValue(data, 'http_reqs', 'count');
  const iterations = metricValue(data, 'iterations', 'count');
  const passed = failed < 0.01 && p95 < 500 && checks > 0.99;

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reporte k6 — Biblioteca Virtual</title>
  <style>
    body { margin: 0; background: #f4f0e8; color: #23332b; font: 16px/1.5 system-ui, sans-serif; }
    main { width: min(900px, calc(100% - 32px)); margin: 48px auto; }
    h1 { margin-bottom: 4px; }
    .status { display: inline-block; padding: 6px 12px; border-radius: 999px; color: white; background: ${passed ? '#217a4b' : '#b42318'}; font-weight: 700; }
    table { width: 100%; margin-top: 24px; border-collapse: collapse; background: white; box-shadow: 0 4px 18px #00000012; }
    th, td { padding: 12px 16px; border-bottom: 1px solid #ddd; text-align: left; }
    th { background: #214b3a; color: white; }
    code { background: #e9e3d8; padding: 2px 5px; border-radius: 4px; }
  </style>
</head>
<body>
  <main>
    <h1>Biblioteca Virtual — prueba de carga k6</h1>
    <p>Endpoint evaluado: <code>GET /api/libros</code></p>
    <p class="status">${passed ? 'UMBRALES APROBADOS' : 'UMBRALES NO APROBADOS'}</p>
    <table>
      <thead><tr><th>Métrica</th><th>Resultado</th><th>Umbral</th></tr></thead>
      <tbody>
        <tr><td>Duración promedio</td><td>${average.toFixed(2)} ms</td><td>Informativa</td></tr>
        <tr><td>Duración p(95)</td><td>${p95.toFixed(2)} ms</td><td>&lt; 500 ms</td></tr>
        <tr><td>Solicitudes fallidas</td><td>${percentage(failed)}</td><td>&lt; 1%</td></tr>
        <tr><td>Checks aprobados</td><td>${percentage(checks)}</td><td>&gt; 99%</td></tr>
        <tr><td>Solicitudes totales</td><td>${requests}</td><td>Informativa</td></tr>
        <tr><td>Iteraciones</td><td>${iterations}</td><td>Informativa</td></tr>
      </tbody>
    </table>
  </main>
</body>
</html>`;
}

export function handleSummary(data) {
  return {
    'reports/k6-summary.json': JSON.stringify(data, null, 2),
    'reports/k6-summary.html': htmlSummary(data),
  };
}

import fs from 'node:fs';
import path from 'node:path';

function loadEnvFile(filePath = path.resolve('.env.uber')) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index < 1) continue;
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvFile();

function value(name, fallback = '') { return process.env[name]?.trim() || fallback; }

export function getConfig({ requireOAuthSecret = false } = {}) {
  const clientId = value('UBER_CLIENT_ID');
  const clientSecret = value('UBER_CLIENT_SECRET');
  if (requireOAuthSecret) {
    if (!clientId) throw new Error('Variável obrigatória ausente: UBER_CLIENT_ID');
    if (!clientSecret) throw new Error('Variável obrigatória ausente: UBER_CLIENT_SECRET');
  }
  return {
    clientId,
    clientSecret,
    redirectUri: value('UBER_REDIRECT_URI', 'http://127.0.0.1:8787/callback/uber'),
    scopes: value('UBER_SCOPES', 'partner.accounts partner.trips partner.payments').split(/\s+/).filter(Boolean),
    authUrl: value('UBER_AUTH_URL', 'https://auth.uber.com/oauth/v2/authorize'),
    tokenUrl: value('UBER_TOKEN_URL', 'https://auth.uber.com/oauth/v2/token'),
    apiBaseUrl: value('UBER_API_BASE_URL', 'https://api.uber.com/v1').replace(/\/$/, ''),
    sandboxApiBaseUrl: value('UBER_SANDBOX_API_BASE_URL', 'https://sandbox-api.uber.com/v1').replace(/\/$/, ''),
    privateRoot: path.resolve(value('MOTORISTAOPS_PRIVATE_DIR', '.motoristaops-private')),
    utcOffset: value('MOTORISTAOPS_UTC_OFFSET', '-03:00'),
    requestDelayMs: Number(value('UBER_REQUEST_DELAY_MS', '150')) || 0,
  };
}

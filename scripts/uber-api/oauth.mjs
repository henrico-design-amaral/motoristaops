function formData(fields) {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) if (value !== undefined && value !== null && value !== '') body.set(key, String(value));
  return body;
}
async function parseResponse(response) {
  const text = await response.text();
  let payload; try { payload = text ? JSON.parse(text) : {}; } catch { payload = { raw: text }; }
  if (!response.ok) throw new Error(`Uber OAuth falhou (${payload?.error || response.status}): ${payload?.error_description || payload?.message || response.statusText}`);
  return payload;
}
function decorateToken(token) {
  const obtainedAt = Math.floor(Date.now() / 1000);
  const expiresIn = Number(token.expires_in || 0);
  return { ...token, obtained_at: obtainedAt, expires_at: expiresIn ? obtainedAt + expiresIn : null };
}
export function buildAuthorizationUrl(config, state) {
  if (!config.clientId) throw new Error('UBER_CLIENT_ID não configurado.');
  const url = new URL(config.authUrl);
  url.searchParams.set('client_id', config.clientId); url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', config.redirectUri); url.searchParams.set('scope', config.scopes.join(' ')); url.searchParams.set('state', state);
  return url.toString();
}
export async function exchangeAuthorizationCode(config, code) {
  const response = await fetch(config.tokenUrl, { method: 'POST', body: formData({ client_id: config.clientId, client_secret: config.clientSecret, grant_type: 'authorization_code', redirect_uri: config.redirectUri, code }) });
  return decorateToken(await parseResponse(response));
}
export async function refreshToken(config, refreshTokenValue) {
  const response = await fetch(config.tokenUrl, { method: 'POST', body: formData({ client_id: config.clientId, client_secret: config.clientSecret, grant_type: 'refresh_token', refresh_token: refreshTokenValue }) });
  return decorateToken(await parseResponse(response));
}
export async function getAccessToken(config, storage) {
  const tokens = storage.readTokens();
  if (!tokens?.access_token) throw new Error('Uber ainda não está autorizada. Execute `npm run uber:auth` primeiro.');
  const now = Math.floor(Date.now() / 1000);
  if (!tokens.expires_at || tokens.expires_at > now + 120) return tokens.access_token;
  if (!tokens.refresh_token) throw new Error('Access token expirado e refresh_token ausente. Refaça a autorização OAuth.');
  const refreshed = await refreshToken(config, tokens.refresh_token);
  if (!refreshed.refresh_token) refreshed.refresh_token = tokens.refresh_token;
  storage.writeTokens(refreshed); return refreshed.access_token;
}

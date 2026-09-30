function httpsUrl(value, field) {
  const raw = String(value ?? '').trim();
  if (!raw) throw new Error(`Missing ${field}`);
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`Invalid URL: ${field}`);
  }
  if (url.protocol !== 'https:') throw new Error(`Only https URLs are allowed: ${field}`);
  return url.toString();
}

export const GOOGLE_BUSINESS_SCOPE = 'https://www.googleapis.com/auth/business.manage';

export function buildGoogleLoginOptions(redirectTo) {
  return {
    provider: 'google',
    options: {
      redirectTo: httpsUrl(redirectTo, 'redirectTo')
    }
  };
}

export function buildGoogleBusinessConsentOptions(redirectTo) {
  return {
    provider: 'google',
    options: {
      redirectTo: httpsUrl(redirectTo, 'redirectTo'),
      scopes: GOOGLE_BUSINESS_SCOPE,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  };
}

export function validateGoogleProviderTokens(session) {
  if (!session || typeof session !== 'object') {
    throw new Error('Missing Supabase session');
  }

  const accessToken = String(session.provider_token ?? '').trim();
  const refreshToken = String(session.provider_refresh_token ?? '').trim();

  if (!accessToken) {
    throw new Error('Google provider_token missing');
  }

  return {
    accessToken,
    refreshToken: refreshToken || null,
    canRefreshWithoutUser: Boolean(refreshToken)
  };
}

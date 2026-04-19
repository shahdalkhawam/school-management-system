export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://tormentingly-kingless-russ.ngrok-free.dev';

const TOKEN_KEYS = ['sms_token', 'token', 'accessToken'];

export function getAuthToken() {
  if (typeof window === 'undefined') {
    return '';
  }

  return TOKEN_KEYS.map((key) => window.localStorage.getItem(key)).find(Boolean) ?? '';
}

export function setAuthToken(token) {
  if (typeof window === 'undefined') {
    return;
  }

  TOKEN_KEYS.forEach((key) => {
    window.localStorage.setItem(key, token);
  });
}

export function clearAuthToken() {
  if (typeof window === 'undefined') {
    return;
  }

  TOKEN_KEYS.forEach((key) => {
    window.localStorage.removeItem(key);
  });
}

export function hasAuthToken() {
  return Boolean(getAuthToken());
}

export function extractToken(payload) {
  if (!payload || typeof payload !== 'object') {
    return '';
  }

  return (
    payload.accessToken ??
    payload.access_token ??
    payload.token ??
    payload.jwt ??
    payload.data?.accessToken ??
    payload.data?.access_token ??
    payload.data?.token ??
    ''
  );
}

export async function apiRequest(path, options = {}) {
  const token = getAuthToken();
  const headers = new Headers(options.headers ?? {});

  headers.set('Accept', 'application/json');
  headers.set('ngrok-skip-browser-warning', 'true');

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const rawText = await response.text();
  const data = rawText ? safeParseJson(rawText) : null;

  if (!response.ok) {
    const message =
      data?.message ??
      data?.error ??
      `Request failed with status ${response.status}`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  return data;
}

function safeParseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

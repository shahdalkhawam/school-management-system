import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  apiRequest,
  clearAuthToken,
  extractToken,
  getAuthToken,
  setAuthToken,
} from '../lib/api';

export const AuthContext = createContext(null);

function normalizeProfile(rawUser) {
  if (!rawUser || typeof rawUser !== 'object') {
    return null;
  }

  return rawUser.user ?? rawUser.data ?? rawUser;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAuthToken());
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(getAuthToken()));
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function bootstrapProfile() {
      if (!token) {
        setIsAuthLoading(false);
        setUser(null);
        return;
      }

      try {
        setIsAuthLoading(true);
        const response = await apiRequest('/auth/me');

        if (!isMounted) {
          return;
        }

        setUser(normalizeProfile(response));
        setAuthError('');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        clearAuthToken();
        setToken('');
        setUser(null);
        setAuthError(error.message);
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    }

    bootstrapProfile();

    return () => {
      isMounted = false;
    };
  }, [token]);

  async function login(credentials) {
    setAuthError('');
    setIsAuthLoading(true);

    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const nextToken = extractToken(response);

      if (!nextToken) {
        throw new Error('Login succeeded but no JWT token was returned by the API.');
      }

      setAuthToken(nextToken);
      setToken(nextToken);
      return response;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }

  function logout() {
    clearAuthToken();
    setToken('');
    setUser(null);
    setAuthError('');
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      isAuthLoading,
      authError,
      login,
      logout,
      clearAuthError: () => setAuthError(''),
    }),
    [token, user, isAuthLoading, authError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

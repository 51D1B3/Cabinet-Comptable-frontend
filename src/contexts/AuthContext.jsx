import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const STAFF_ROLES = ['assistant', 'accountant', 'accounting_manager', 'director', 'admin', 'super_admin'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const persist = useCallback((_token, nextUser) => setUser(nextUser), []);

  const logout = useCallback(() => {
    api.post('/auth/logout').catch(() => {});
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      persist(null, data.user);
      return data.user;
    } catch {
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  }, [logout, persist]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    persist(null, data.user);
    return data.user;
  }, [persist]);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      refresh,
      isAuthenticated: Boolean(user),
      isStaff: user ? STAFF_ROLES.includes(user.role) : false,
      isAdmin: user ? ['admin', 'super_admin', 'director', 'accounting_manager'].includes(user.role) : false,
    }),
    [user, loading, login, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseEnabled } from '../lib/supabase';

const LOCAL_USER_KEY = 'codeloop_user_id';

function getLocalUserId() {
  let id = localStorage.getItem(LOCAL_USER_KEY);
  if (!id) {
    // Génère un ID unique anonyme
    id = 'local_' + Math.random().toString(36).substr(2, 12) + '_' + Date.now();
    localStorage.setItem(LOCAL_USER_KEY, id);
  }
  return id;
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState('loading'); // loading | authenticated | anonymous
  const [email, setEmail] = useState('');
  const [authView, setAuthView] = useState('idle'); // idle | signin | sent

  useEffect(() => {
    if (!isSupabaseEnabled) {
      // Mode local — ID anonyme persisté en localStorage
      setUser({ id: getLocalUserId(), isAnonymous: true });
      setAuthStatus('anonymous');
      return;
    }

    // Vérifie la session Supabase existante
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setAuthStatus('authenticated');
      } else {
        setUser({ id: getLocalUserId(), isAnonymous: true });
        setAuthStatus('anonymous');
      }
    });

    // Écoute les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setAuthStatus('authenticated');
      } else {
        setUser({ id: getLocalUserId(), isAnonymous: true });
        setAuthStatus('anonymous');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendMagicLink = useCallback(async (emailAddr) => {
    if (!isSupabaseEnabled) return { error: 'Supabase non configuré' };
    const { error } = await supabase.auth.signInWithOtp({
      email: emailAddr,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (!error) setAuthView('sent');
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseEnabled) await supabase.auth.signOut();
    setUser({ id: getLocalUserId(), isAnonymous: true });
    setAuthStatus('anonymous');
  }, []);

  return {
    user,
    authStatus,
    email,
    setEmail,
    authView,
    setAuthView,
    sendMagicLink,
    signOut,
    isAuthenticated: authStatus === 'authenticated',
  };
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

/**
 * Handles the OAuth redirect from Google (and email confirmation links).
 * Supabase auto-detects the session from the URL when detectSessionInUrl is true,
 * so we just wait for it and then redirect.
 */
export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Give Supabase a moment to process the URL hash/query
    const timer = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/', { replace: true });
      } else {
        navigate('/sign-in', { replace: true });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <p>Signing you in…</p>
    </div>
  );
}

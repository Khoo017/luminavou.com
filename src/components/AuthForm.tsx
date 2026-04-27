import { useState, type FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';

type Mode = 'signin' | 'signup';

export function AuthForm() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'error' | 'info'; text: string } | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setBusy(true);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password, fullName.trim() || undefined);
        setMessage({
          kind: 'info',
          text: 'Check your email to confirm your account.',
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setMessage({ kind: 'error', text: msg });
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    setMessage(null);
    setBusy(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed.';
      setMessage({ kind: 'error', text: msg });
      setBusy(false);
    }
    // On success the browser navigates away — no need to reset busy
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>{mode === 'signin' ? 'Sign in' : 'Create account'}</h2>

      <button type="button" onClick={onGoogle} disabled={busy} style={styles.googleBtn}>
        <GoogleIcon /> Continue with Google
      </button>

      <div style={styles.divider}>
        <span style={styles.dividerText}>or</span>
      </div>

      <form onSubmit={onSubmit} style={styles.form}>
        {mode === 'signup' && (
          <label style={styles.label}>
            Full name
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
              autoComplete="name"
            />
          </label>
        )}
        <label style={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            autoComplete="email"
          />
        </label>
        <label style={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={styles.input}
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          />
        </label>

        {message && (
          <div style={message.kind === 'error' ? styles.errorBox : styles.infoBox}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={busy} style={styles.submitBtn}>
          {busy ? '…' : mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>

      <p style={styles.toggleRow}>
        {mode === 'signin' ? "New here?" : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          style={styles.toggleBtn}
        >
          {mode === 'signin' ? 'Create account' : 'Sign in'}
        </button>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    maxWidth: 420,
    margin: '2rem auto',
    padding: '2rem',
    background: '#fff',
    border: '1px solid #e8ddd0',
    borderRadius: 12,
    fontFamily: 'inherit',
    color: '#1a1a1a',
  },
  heading: { margin: '0 0 1.25rem', fontSize: '1.5rem', fontWeight: 600 },
  googleBtn: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d8cdbe',
    borderRadius: 8,
    background: '#fff',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '1.25rem 0',
    borderTop: '1px solid #eee3d4',
  },
  dividerText: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff',
    padding: '0 0.75rem',
    color: '#888',
    fontSize: '0.85rem',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '0.85rem' },
  label: { display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem' },
  input: {
    padding: '0.65rem 0.8rem',
    border: '1px solid #d8cdbe',
    borderRadius: 8,
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    background: '#faf1e8',
  },
  submitBtn: {
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: 8,
    background: '#1a1a1a',
    color: '#faf1e8',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '0.25rem',
  },
  errorBox: {
    padding: '0.6rem 0.8rem',
    background: '#fdecec',
    border: '1px solid #f3c2c2',
    borderRadius: 6,
    fontSize: '0.85rem',
    color: '#8a1a1a',
  },
  infoBox: {
    padding: '0.6rem 0.8rem',
    background: '#eef7ed',
    border: '1px solid #c2dfb8',
    borderRadius: 6,
    fontSize: '0.85rem',
    color: '#1a4a1a',
  },
  toggleRow: { marginTop: '1rem', fontSize: '0.85rem', textAlign: 'center', color: '#555' },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#1a1a1a',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '0.85rem',
    padding: 0,
  },
};

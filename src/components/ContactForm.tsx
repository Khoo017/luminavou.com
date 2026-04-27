import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm({ source = 'contact-page' }: { source?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const { data, error } = await supabase.functions.invoke('contact-submit', {
        body: { name, email, phone, subject, message, source, website },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setStatus('sent');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Could not send. Please try again.');
    }
  };

  if (status === 'sent') {
    return (
      <div style={styles.card}>
        <h3 style={styles.heading}>Thank you.</h3>
        <p style={styles.body}>
          Your message has reached us. We'll respond to <strong>{email || 'you'}</strong> shortly.
        </p>
        <button type="button" onClick={() => setStatus('idle')} style={styles.linkBtn}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={styles.card}>
      <h3 style={styles.heading}>Get in touch</h3>

      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
        aria-hidden="true"
      />

      <div style={styles.row}>
        <label style={styles.label}>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={200}
            style={styles.input}
            autoComplete="name"
          />
        </label>
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
      </div>

      <div style={styles.row}>
        <label style={styles.label}>
          Phone <span style={styles.optional}>(optional)</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
            autoComplete="tel"
          />
        </label>
        <label style={styles.label}>
          Subject <span style={styles.optional}>(optional)</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={200}
            style={styles.input}
          />
        </label>
      </div>

      <label style={styles.label}>
        Message
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={5000}
          rows={6}
          style={{ ...styles.input, resize: 'vertical' }}
        />
      </label>

      {status === 'error' && <div style={styles.errorBox}>{errorMsg}</div>}

      <button type="submit" disabled={status === 'sending'} style={styles.submitBtn}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    maxWidth: 640,
    margin: '0 auto',
    padding: '2rem',
    background: '#fff',
    border: '1px solid #e8ddd0',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    fontFamily: 'inherit',
    color: '#1a1a1a',
    position: 'relative',
  },
  heading: { margin: 0, fontSize: '1.5rem', fontWeight: 600 },
  body: { margin: 0, color: '#555' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  label: { display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem' },
  optional: { color: '#999', fontWeight: 400, fontSize: '0.8rem' },
  input: {
    padding: '0.65rem 0.8rem',
    border: '1px solid #d8cdbe',
    borderRadius: 8,
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    background: '#faf1e8',
  },
  submitBtn: {
    padding: '0.75rem 1.25rem',
    border: 'none',
    borderRadius: 8,
    background: '#1a1a1a',
    color: '#faf1e8',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  errorBox: {
    padding: '0.6rem 0.8rem',
    background: '#fdecec',
    border: '1px solid #f3c2c2',
    borderRadius: 6,
    fontSize: '0.85rem',
    color: '#8a1a1a',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#1a1a1a',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: 0,
    alignSelf: 'flex-start',
  },
};

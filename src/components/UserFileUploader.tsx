import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type FileEntry = {
  name: string;
  path: string;
  size: number;
  created_at?: string;
};

export function UserFileUploader() {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const refresh = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase.storage
      .from('user-uploads')
      .list(user.id, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
    if (error) {
      setError(error.message);
    } else {
      setFiles(
        (data ?? []).map((f) => ({
          name: f.name,
          path: `${user.id}/${f.name}`,
          size: (f.metadata as { size?: number } | null)?.size ?? 0,
          created_at: f.created_at ?? undefined,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (!user) {
    return (
      <p style={{ textAlign: 'center', padding: '2rem' }}>
        Please sign in to manage your files.
      </p>
    );
  }

  const onUpload = async (fileList: FileList) => {
    setBusy(true);
    setError('');
    try {
      for (const file of Array.from(fileList)) {
        const safeName = file.name.replace(/[^\w.\-]/g, '_');
        const path = `${user.id}/${Date.now()}_${safeName}`;
        const { error } = await supabase.storage
          .from('user-uploads')
          .upload(path, file, { cacheControl: '3600', upsert: false });
        if (error) throw error;
      }
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const onDownload = async (entry: FileEntry) => {
    // Files are private — generate a signed URL valid for 60 seconds
    const { data, error } = await supabase.storage
      .from('user-uploads')
      .createSignedUrl(entry.path, 60);
    if (error) {
      setError(error.message);
      return;
    }
    window.open(data.signedUrl, '_blank');
  };

  const onDelete = async (entry: FileEntry) => {
    if (!confirm(`Delete "${entry.name}"?`)) return;
    setBusy(true);
    try {
      const { error } = await supabase.storage.from('user-uploads').remove([entry.path]);
      if (error) throw error;
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem' }}>Your files</h2>

      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          display: 'block',
          padding: '1.5rem',
          border: `2px dashed ${isDragging ? '#b08d6a' : '#d8cdbe'}`,
          borderRadius: 12,
          background: isDragging ? '#f4e9db' : '#faf1e8',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <input
          type="file"
          multiple
          style={{ display: 'none' }}
          disabled={busy}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) onUpload(e.target.files);
            e.target.value = '';
          }}
        />
        {busy ? 'Uploading…' : (isDragging ? 'Drop files here' : 'Click to upload (or drag files here)')}
      </label>

      {error && (
        <div
          style={{
            padding: '0.6rem',
            background: '#fdecec',
            border: '1px solid #f3c2c2',
            borderRadius: 6,
            color: '#8a1a1a',
            marginBottom: '1rem',
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading…</p>
      ) : files.length === 0 ? (
        <p style={{ color: '#888' }}>No files yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {files.map((f) => (
            <li
              key={f.path}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 0',
                borderBottom: '1px solid #e8ddd0',
              }}
            >
              <div>
                <div style={{ fontWeight: 500 }}>{f.name.replace(/^\d+_/, '')}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                  {formatSize(f.size)}
                  {f.created_at &&
                    ` · ${new Date(f.created_at).toLocaleDateString()}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => onDownload(f)} style={smallBtn}>
                  Download
                </button>
                <button
                  onClick={() => onDelete(f)}
                  style={{ ...smallBtn, color: '#8a1a1a' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const smallBtn: React.CSSProperties = {
  background: 'none',
  border: '1px solid #d8cdbe',
  borderRadius: 6,
  padding: '0.35rem 0.65rem',
  fontSize: '0.85rem',
  cursor: 'pointer',
  color: '#1a1a1a',
};

import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useBlogPosts, type BlogPost } from '../hooks/useBlog';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export default function AdminBlogPage() {
  const { profile, loading: authLoading } = useAuth();
  const { posts, loading: postsLoading } = useBlogPosts({ includeDrafts: true });
  const [editing, setEditing] = useState<BlogPost | 'new' | null>(null);

  if (authLoading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading…</p>;
  if (!profile?.is_admin)
    return (
      <p style={{ textAlign: 'center', padding: '2rem' }}>
        You need admin access to view this page.
      </p>
    );

  if (editing) {
    return (
      <PostEditor
        post={editing === 'new' ? null : editing}
        onClose={() => setEditing(null)}
      />
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '8rem 1rem 2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Blog admin</h1>
        <button onClick={() => setEditing('new')} style={primaryBtn}>
          New post
        </button>
      </div>
      {postsLoading ? (
        <p>Loading…</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e8ddd0' }}>
              <th style={th}>Title</th>
              <th style={th}>Status</th>
              <th style={th}>Updated</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f0e7d8' }}>
                <td style={td}>{p.title}</td>
                <td style={td}>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 4,
                      background: p.is_published ? '#e6f0e0' : '#f5e8d8',
                      color: p.is_published ? '#2a5a1a' : '#6a4a1a',
                    }}
                  >
                    {p.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td style={{ ...td, color: '#888', fontSize: '0.85rem' }}>
                  {new Date(p.updated_at).toLocaleDateString()}
                </td>
                <td style={td}>
                  <button onClick={() => setEditing(p)} style={linkBtn}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function PostEditor({ post, onClose }: { post: BlogPost | null; onClose: () => void }) {
  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url ?? '');
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [uploading, setUploading] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  // Auto-generate slug from title when creating a new post
  useEffect(() => {
    if (!post && !slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, post, slugTouched]);

  const onUpload = async (file: File) => {
    setUploading(true);
    setErr('');
    try {
      const ext = file.name.split('.').pop() ?? 'jpg';
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('blog-images')
        .upload(path, file, { cacheControl: '3600', upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
      setCoverUrl(data.publicUrl);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content,
        cover_image_url: coverUrl || null,
        is_published: isPublished,
        published_at:
          isPublished && !post?.published_at ? new Date().toISOString() : post?.published_at,
      };

      if (post) {
        const { error } = await supabase.from('blog_posts').update(payload).eq('id', post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert(payload);
        if (error) throw error;
      }
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async () => {
    if (!post) return;
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', post.id);
      if (error) throw error;
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Delete failed');
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSave} style={{ maxWidth: 800, margin: '0 auto', padding: '8rem 1rem 2rem' }}>
      <button type="button" onClick={onClose} style={linkBtn}>
        ← Back
      </button>
      <h1 style={{ fontSize: '2rem', margin: '0.5rem 0 1.5rem' }}>
        {post ? 'Edit post' : 'New post'}
      </h1>

      <label style={fieldLabel}>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={input}
        />
      </label>

      <label style={fieldLabel}>
        Slug (URL)
        <input 
          value={slug} 
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }} 
          required 
          style={input} 
        />
      </label>

      <label style={fieldLabel}>
        Excerpt (short summary)
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          style={{ ...input, resize: 'vertical' }}
        />
      </label>

      <label style={fieldLabel}>
        Cover image
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUpload(f);
          }}
          disabled={uploading}
          style={{ marginTop: '0.35rem' }}
        />
        {uploading && <span style={{ fontSize: '0.85rem', color: '#888' }}>Uploading…</span>}
        {coverUrl && (
          <img
            src={coverUrl}
            alt=""
            style={{
              width: 200,
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: 8,
              marginTop: '0.5rem',
            }}
          />
        )}
      </label>

      <label style={fieldLabel}>
        Content (markdown)
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={20}
          style={{ ...input, resize: 'vertical', fontFamily: 'monospace' }}
        />
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem 0' }}>
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        Published
      </label>

      {err && (
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
          {err}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button type="submit" disabled={busy} style={primaryBtn}>
          {busy ? 'Saving…' : 'Save'}
        </button>
        {post && (
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            style={{ ...primaryBtn, background: '#8a1a1a' }}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

const input: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 0.8rem',
  border: '1px solid #d8cdbe',
  borderRadius: 8,
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  background: '#faf1e8',
  boxSizing: 'border-box',
};

const fieldLabel: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
  fontSize: '0.9rem',
  marginBottom: '1rem',
};

const primaryBtn: React.CSSProperties = {
  padding: '0.65rem 1.25rem',
  border: 'none',
  borderRadius: 8,
  background: '#1a1a1a',
  color: '#faf1e8',
  fontSize: '0.95rem',
  fontWeight: 500,
  cursor: 'pointer',
};

const linkBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#1a1a1a',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '0.9rem',
  padding: 0,
};

const th: React.CSSProperties = { padding: '0.6rem 0.5rem', fontWeight: 600, fontSize: '0.85rem' };
const td: React.CSSProperties = { padding: '0.6rem 0.5rem' };

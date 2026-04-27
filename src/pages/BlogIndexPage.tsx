import { Link } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlog';

export default function BlogIndexPage() {
  const { posts, loading, error } = useBlogPosts();

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading…</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#8a1a1a' }}>{error}</p>;
  if (posts.length === 0)
    return <p style={{ textAlign: 'center', padding: '2rem' }}>No posts yet.</p>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.25rem', marginBottom: '2rem' }}>Journal</h1>
      <div style={{ display: 'grid', gap: '2rem' }}>
        {posts.map((p) => (
          <article
            key={p.id}
            style={{
              borderBottom: '1px solid #e8ddd0',
              paddingBottom: '1.5rem',
            }}
          >
            {p.cover_image_url && (
              <Link to={`/blog/${p.slug}`}>
                <img
                  src={p.cover_image_url}
                  alt=""
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                    borderRadius: 12,
                    marginBottom: '1rem',
                  }}
                />
              </Link>
            )}
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem' }}>
              <Link
                to={`/blog/${p.slug}`}
                style={{ color: '#1a1a1a', textDecoration: 'none' }}
              >
                {p.title}
              </Link>
            </h2>
            {p.published_at && (
              <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 0.75rem' }}>
                {new Date(p.published_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
            {p.excerpt && <p style={{ margin: 0, color: '#444' }}>{p.excerpt}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

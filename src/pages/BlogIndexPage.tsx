import { Link } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlog';
import { PageHeader } from '@/components/PageHeader';

export default function BlogIndexPage() {
  const { posts, loading, error } = useBlogPosts();

  return (
    <>
      <PageHeader
        eyebrow="STORIES"
        title="Notes from the rooftops."
        intro="Updates, insights, and conversations from the team building the Pacific's solar future."
      />
      <section className="container py-12 lg:py-20">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '4rem 1rem', color: '#888' }}>Loading…</p>
          ) : error ? (
            <p style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8a1a1a' }}>{error}</p>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-earth/10 bg-canvas p-12 text-center shadow-sm">
              <p className="text-lg font-medium text-earth">Stories coming soon.</p>
              <p className="mt-2 text-earth/60">Check back shortly.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '3rem' }}>
              {posts.map((p) => (
                <article
                  key={p.id}
                  style={{
                    borderBottom: '1px solid #e8ddd0',
                    paddingBottom: '2rem',
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
                          marginBottom: '1.25rem',
                        }}
                      />
                    </Link>
                  )}
                  <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 600 }}>
                    <Link
                      to={`/blog/${p.slug}`}
                      style={{ color: '#1a1a1a', textDecoration: 'none' }}
                    >
                      {p.title}
                    </Link>
                  </h2>
                  {p.published_at && (
                    <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 1rem' }}>
                      {new Date(p.published_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  {p.excerpt && <p style={{ margin: 0, color: '#444', fontSize: '1.05rem', lineHeight: 1.6 }}>{p.excerpt}</p>}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import { useParams, Link } from 'react-router-dom';
import { useBlogPost } from '../hooks/useBlog';
import { PageHeader } from '@/components/PageHeader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export default function BlogPostPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug);

  if (loading) return <p style={{ textAlign: 'center', padding: '4rem 1rem' }}>Loading…</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#8a1a1a', padding: '4rem 1rem' }}>{error}</p>;
  if (!post)
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <p className="text-lg font-medium text-earth mb-4">Post not found.</p>
        <Link to="/blog" className="text-earth hover:underline">Back to stories</Link>
      </div>
    );

  return (
    <>
      <PageHeader
        eyebrow="STORIES"
        title={post.title}
        intro={post.excerpt ?? undefined}
      />
      <section className="container py-12 lg:py-20">
        <article style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link to="/blog" style={{ color: '#888', fontSize: '0.9rem', display: 'inline-block', marginBottom: '2rem' }}>
            ← Stories
          </Link>
          
          {post.published_at && (
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {new Date(post.published_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
          {post.cover_image_url && (
            <img
              src={post.cover_image_url}
              alt=""
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                objectFit: 'cover',
                borderRadius: 12,
                marginBottom: '2rem',
              }}
            />
          )}
          <div
            style={{
              lineHeight: 1.8,
              fontSize: '1.1rem',
              color: '#1a1a1a',
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <img
                    style={{ maxWidth: '100%', borderRadius: '8px', margin: '2rem auto', display: 'block' }}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => <p style={{ marginBottom: '1.5rem' }} {...props} />,
                a: ({ node, ...props }) => <a style={{ color: '#1a1a1a', textDecoration: 'underline' }} {...props} />,
                h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.75rem', fontWeight: 600, margin: '2.5rem 0 1rem' }} {...props} />,
                h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.35rem', fontWeight: 600, margin: '2rem 0 1rem' }} {...props} />,
                ul: ({ node, ...props }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }} {...props} />,
                ol: ({ node, ...props }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1.5rem' }} {...props} />,
                li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote style={{ borderLeft: '4px solid #d8cdbe', paddingLeft: '1.25rem', color: '#555', fontStyle: 'italic', margin: '2rem 0' }} {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </section>
    </>
  );
}

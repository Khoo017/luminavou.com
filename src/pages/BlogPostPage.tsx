import { useParams, Link } from 'react-router-dom';
import { useBlogPost } from '../hooks/useBlog';
import { PageHeader } from '@/components/PageHeader';

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
          {/*
            Renders markdown content as plain text. To get proper markdown rendering,
            install react-markdown:
              npm i react-markdown remark-gfm
            Then replace this block with:
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          */}
          <div
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              fontSize: '1.1rem',
              color: '#1a1a1a',
            }}
          >
            {post.content}
          </div>
        </article>
      </section>
    </>
  );
}

import { useParams, Link } from 'react-router-dom';
import { useBlogPost } from '../hooks/useBlog';

export default function BlogPostPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug);

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading…</p>;
  if (error) return <p style={{ textAlign: 'center', color: '#8a1a1a' }}>{error}</p>;
  if (!post)
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <p>Post not found.</p>
        <Link to="/blog">Back to journal</Link>
      </div>
    );

  return (
    <article style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <Link to="/blog" style={{ color: '#888', fontSize: '0.85rem' }}>
        ← Journal
      </Link>
      <h1 style={{ fontSize: '2.25rem', margin: '1rem 0 0.5rem' }}>{post.title}</h1>
      {post.published_at && (
        <p style={{ color: '#888', fontSize: '0.85rem' }}>
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
            margin: '1.5rem 0',
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
          lineHeight: 1.7,
          fontSize: '1.05rem',
          color: '#1a1a1a',
        }}
      >
        {post.content}
      </div>
    </article>
  );
}

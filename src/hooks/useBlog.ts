import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author_id: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function useBlogPosts(opts: { includeDrafts?: boolean } = {}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (!opts.includeDrafts) {
      query = query.eq('is_published', true);
    }

    query.then(({ data, error }) => {
      if (cancelled) return;
      if (error) setError(error.message);
      else setPosts((data ?? []) as BlogPost[]);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [opts.includeDrafts]);

  return { posts, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        else setPost(data as BlogPost | null);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { post, loading, error };
}

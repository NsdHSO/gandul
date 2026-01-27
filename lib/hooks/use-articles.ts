import { useEffect, useState } from 'react';
import { graphqlClient } from '@/lib/graphql/client';
import { ARTICLES_QUERY } from '@/lib/graphql/queries/article';
import type { Article, ArticlesResponse } from '@/lib/models/article';

interface UseArticlesResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useArticles(): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await graphqlClient.query<ArticlesResponse>(ARTICLES_QUERY, {}).toPromise();

      if (result.error) {
        setError(result.error.message);
      } else if (result.data) {
        setArticles(result.data.articles);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles,
  };
}

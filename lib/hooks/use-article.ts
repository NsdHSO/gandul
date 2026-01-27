import { useEffect, useState } from 'react';
import { graphqlClient } from '@/lib/graphql/client';
import { ARTICLE_BY_ID_QUERY } from '@/lib/graphql/queries/article';
import type { Article } from '@/lib/models/article';

interface ArticleResponse {
  article: Article;
}

interface UseArticleResult {
  article: Article | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useArticle(documentId: string): UseArticleResult {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await graphqlClient
        .query<ArticleResponse>(ARTICLE_BY_ID_QUERY, { documentId })
        .toPromise();

      if (result.error) {
        setError(result.error.message);
      } else if (result.data) {
        setArticle(result.data.article);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (documentId) {
      fetchArticle();
    }
  }, [documentId]);

  return {
    article,
    loading,
    error,
    refetch: fetchArticle,
  };
}

import { useEffect, useState, useCallback } from 'react';
import { graphqlClient } from '@/lib/graphql/client';
import { ARTICLES_QUERY } from '@/lib/graphql/queries/article';
import type { Article, ArticlesResponse } from '@/lib/models/article';

const PAGE_SIZE = 20;

interface UseArticlesResult {
  articles: Article[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export function useArticles(): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (reset: boolean = false) => {
    try {
      if (reset) {
        setLoading(true);
        setOffset(0);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const currentOffset = reset ? 0 : offset;
      const result = await graphqlClient
        .query<ArticlesResponse>(ARTICLES_QUERY, {
          limit: PAGE_SIZE,
          start: currentOffset,
        })
        .toPromise();

      if (result.error) {
        setError(result.error.message);
      } else if (result.data) {
        const newArticles = result.data.articles;

        if (reset) {
          setArticles(newArticles);
        } else {
          setArticles((prev) => [...prev, ...newArticles]);
        }

        // If we got fewer articles than PAGE_SIZE, there are no more to load
        setHasMore(newArticles.length === PAGE_SIZE);

        if (!reset) {
          setOffset((prev) => prev + PAGE_SIZE);
        } else {
          setOffset(PAGE_SIZE);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (!loadingMore && !loading && hasMore) {
      await fetchArticles(false);
    }
  }, [loadingMore, loading, hasMore, offset]);

  const refetch = useCallback(async () => {
    await fetchArticles(true);
  }, []);

  useEffect(() => {
    fetchArticles(true);
  }, []);

  return {
    articles,
    loading,
    loadingMore,
    error,
    hasMore,
    refetch,
    loadMore,
  };
}

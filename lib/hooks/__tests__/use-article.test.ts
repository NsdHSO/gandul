import { renderHook, waitFor } from '@testing-library/react-native';
import { useArticle } from '../use-article';
import { graphqlClient } from '@/lib/graphql/client';

// Mock the GraphQL client
jest.mock('@/lib/graphql/client', () => ({
  graphqlClient: {
    query: jest.fn(),
  },
}));

const mockArticle = {
  documentId: '1',
  title: 'Test Article',
  slug: 'test-article',
  description: 'Test description',
  content: 'Test content',
  author: 'Test Author',
  publishedDate: '2024-01-01',
  category: 'test',
  tags: ['tag1', 'tag2'],
  featuredImage: 'http://test.com/image.jpg',
  sourceUrl: 'http://test.com/source',
  videoUrl: 'http://test.com/video',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  publishedAt: '2024-01-01',
};

describe('useArticle Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: { article: mockArticle },
        error: null,
      }),
    });

    const { result } = renderHook(() => useArticle('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.article).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should load article successfully', async () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: { article: mockArticle },
        error: null,
      }),
    });

    const { result } = renderHook(() => useArticle('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.article).toEqual(mockArticle);
    expect(result.current.error).toBeNull();
  });

  it('should handle GraphQL errors', async () => {
    const errorMessage = 'Article not found';
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: null,
        error: { message: errorMessage },
      }),
    });

    const { result } = renderHook(() => useArticle('999'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.article).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle fetch exceptions', async () => {
    const errorMessage = 'Network error';
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockRejectedValue(new Error(errorMessage)),
    });

    const { result } = renderHook(() => useArticle('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle non-Error exceptions', async () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockRejectedValue('String error'),
    });

    const { result } = renderHook(() => useArticle('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('An error occurred');
  });

  it('should refetch article when refetch is called', async () => {
    const updatedArticle = { ...mockArticle, title: 'Updated Title' };

    const mockQuery = jest.fn()
      .mockReturnValueOnce({
        toPromise: jest.fn().mockResolvedValue({
          data: { article: mockArticle },
          error: null,
        }),
      })
      .mockReturnValueOnce({
        toPromise: jest.fn().mockResolvedValue({
          data: { article: updatedArticle },
          error: null,
        }),
      });

    (graphqlClient.query as jest.Mock) = mockQuery;

    const { result } = renderHook(() => useArticle('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.article?.title).toBe('Test Article');

    await waitFor(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.article?.title).toBe('Updated Title');
    });
  });

  it('should fetch article when documentId changes', async () => {
    const article1 = { ...mockArticle, documentId: '1', title: 'Article 1' };
    const article2 = { ...mockArticle, documentId: '2', title: 'Article 2' };

    (graphqlClient.query as jest.Mock)
      .mockReturnValueOnce({
        toPromise: jest.fn().mockResolvedValue({
          data: { article: article1 },
          error: null,
        }),
      })
      .mockReturnValueOnce({
        toPromise: jest.fn().mockResolvedValue({
          data: { article: article2 },
          error: null,
        }),
      });

    const { result, rerender } = renderHook(
      ({ id }) => useArticle(id),
      { initialProps: { id: '1' } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.article?.title).toBe('Article 1');

    rerender({ id: '2' });

    await waitFor(() => {
      expect(result.current.article?.title).toBe('Article 2');
    });
  });

  it('should not fetch if documentId is empty', () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: { article: mockArticle },
        error: null,
      }),
    });

    renderHook(() => useArticle(''));

    expect(graphqlClient.query).not.toHaveBeenCalled();
  });
});

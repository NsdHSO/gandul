import { renderHook, waitFor } from '@testing-library/react-native';
import { useArticles } from '../use-articles';
import { graphqlClient } from '@/lib/graphql/client';

// Mock the GraphQL client
jest.mock('@/lib/graphql/client', () => ({
  graphqlClient: {
    query: jest.fn(),
  },
}));

const mockArticles = [
  {
    documentId: '1',
    title: 'Test Article 1',
    slug: 'test-article-1',
    description: 'Test description 1',
    content: 'Test content 1',
    author: 'Test Author 1',
    publishedDate: '2024-01-01',
    category: 'test',
    tags: ['tag1'],
    featuredImage: 'http://test.com/image1.jpg',
    sourceUrl: 'http://test.com/1',
    videoUrl: '',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    publishedAt: '2024-01-01',
  },
  {
    documentId: '2',
    title: 'Test Article 2',
    slug: 'test-article-2',
    description: 'Test description 2',
    content: 'Test content 2',
    author: 'Test Author 2',
    publishedDate: '2024-01-02',
    category: 'test',
    tags: ['tag2'],
    featuredImage: 'http://test.com/image2.jpg',
    sourceUrl: 'http://test.com/2',
    videoUrl: '',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
    publishedAt: '2024-01-02',
  },
];

describe('useArticles Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: { articles: mockArticles },
        error: null,
      }),
    });

    const { result } = renderHook(() => useArticles());

    expect(result.current.loading).toBe(true);
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(true);
  });

  it('should load articles successfully', async () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: { articles: mockArticles },
        error: null,
      }),
    });

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual(mockArticles);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(true);
  });

  it('should handle GraphQL errors', async () => {
    const errorMessage = 'GraphQL error occurred';
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: null,
        error: { message: errorMessage },
      }),
    });

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle fetch exceptions', async () => {
    const errorMessage = 'Network error';
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockRejectedValue(new Error(errorMessage)),
    });

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle non-Error exceptions', async () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockRejectedValue('String error'),
    });

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('An error occurred');
  });

  it('should set hasMore to false when fewer articles than PAGE_SIZE are returned', async () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: { articles: [mockArticles[0]] }, // Only 1 article, PAGE_SIZE is 20
        error: null,
      }),
    });

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasMore).toBe(false);
  });

  it('should load more articles when loadMore is called', async () => {
    const firstBatch = Array(20).fill(null).map((_, i) => ({
      ...mockArticles[0],
      documentId: `${i + 1}`,
      title: `Article ${i + 1}`,
    }));

    const secondBatch = Array(10).fill(null).map((_, i) => ({
      ...mockArticles[0],
      documentId: `${i + 21}`,
      title: `Article ${i + 21}`,
    }));

    (graphqlClient.query as jest.Mock)
      .mockReturnValueOnce({
        toPromise: jest.fn().mockResolvedValue({
          data: { articles: firstBatch },
          error: null,
        }),
      })
      .mockReturnValueOnce({
        toPromise: jest.fn().mockResolvedValue({
          data: { articles: secondBatch },
          error: null,
        }),
      });

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toHaveLength(20);

    await result.current.loadMore();

    await waitFor(() => {
      expect(result.current.loadingMore).toBe(false);
    });

    expect(result.current.articles).toHaveLength(30);
  });

  it('should not load more if already loading', async () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: { articles: mockArticles },
        error: null,
      }),
    });

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialCallCount = (graphqlClient.query as jest.Mock).mock.calls.length;

    // Try to load more while loading
    result.current.loadMore();
    result.current.loadMore();

    // Should only make one additional call
    expect((graphqlClient.query as jest.Mock).mock.calls.length).toBe(initialCallCount);
  });

  it('should not load more if hasMore is false', async () => {
    (graphqlClient.query as jest.Mock).mockReturnValue({
      toPromise: jest.fn().mockResolvedValue({
        data: { articles: [mockArticles[0]] }, // Less than PAGE_SIZE
        error: null,
      }),
    });

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasMore).toBe(false);

    const callCountBefore = (graphqlClient.query as jest.Mock).mock.calls.length;

    await result.current.loadMore();

    // Should not make additional calls
    expect((graphqlClient.query as jest.Mock).mock.calls.length).toBe(callCountBefore);
  });

  it('should refetch articles and reset state', async () => {
    (graphqlClient.query as jest.Mock)
      .mockReturnValueOnce({
        toPromise: jest.fn().mockResolvedValue({
          data: { articles: mockArticles },
          error: null,
        }),
      })
      .mockReturnValueOnce({
        toPromise: jest.fn().mockResolvedValue({
          data: { articles: [mockArticles[0]] },
          error: null,
        }),
      });

    const { result } = renderHook(() => useArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toHaveLength(2);

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toHaveLength(1);
  });
});

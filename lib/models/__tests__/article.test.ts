import type { Article, ArticlesResponse } from '../article';

describe('Article Type Definitions', () => {
  describe('Article Interface', () => {
    it('should allow valid article objects', () => {
      const article: Article = {
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

      expect(article).toBeDefined();
      expect(article.documentId).toBe('1');
      expect(article.title).toBe('Test Article');
      expect(article.tags).toHaveLength(2);
    });

    it('should have all required string fields', () => {
      const article: Article = {
        documentId: 'doc-1',
        title: 'Title',
        slug: 'slug',
        description: 'Description',
        content: 'Content',
        author: 'Author',
        publishedDate: '2024-01-01',
        category: 'Category',
        tags: [],
        featuredImage: 'image.jpg',
        sourceUrl: 'source.com',
        videoUrl: 'video.com',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        publishedAt: '2024-01-01',
      };

      expect(typeof article.documentId).toBe('string');
      expect(typeof article.title).toBe('string');
      expect(typeof article.slug).toBe('string');
      expect(typeof article.description).toBe('string');
      expect(typeof article.content).toBe('string');
      expect(typeof article.author).toBe('string');
      expect(typeof article.publishedDate).toBe('string');
      expect(typeof article.category).toBe('string');
      expect(typeof article.featuredImage).toBe('string');
      expect(typeof article.sourceUrl).toBe('string');
      expect(typeof article.videoUrl).toBe('string');
      expect(typeof article.createdAt).toBe('string');
      expect(typeof article.updatedAt).toBe('string');
      expect(typeof article.publishedAt).toBe('string');
    });

    it('should have tags as string array', () => {
      const article: Article = {
        documentId: '1',
        title: 'Test',
        slug: 'test',
        description: 'Test',
        content: 'Test',
        author: 'Test',
        publishedDate: '2024-01-01',
        category: 'Test',
        tags: ['tag1', 'tag2', 'tag3'],
        featuredImage: 'image.jpg',
        sourceUrl: 'source.com',
        videoUrl: 'video.com',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        publishedAt: '2024-01-01',
      };

      expect(Array.isArray(article.tags)).toBe(true);
      expect(article.tags).toHaveLength(3);
      expect(article.tags[0]).toBe('tag1');
    });

    it('should allow empty tags array', () => {
      const article: Article = {
        documentId: '1',
        title: 'Test',
        slug: 'test',
        description: 'Test',
        content: 'Test',
        author: 'Test',
        publishedDate: '2024-01-01',
        category: 'Test',
        tags: [],
        featuredImage: 'image.jpg',
        sourceUrl: 'source.com',
        videoUrl: 'video.com',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        publishedAt: '2024-01-01',
      };

      expect(article.tags).toHaveLength(0);
    });
  });

  describe('ArticlesResponse Interface', () => {
    it('should allow valid articles response objects', () => {
      const response: ArticlesResponse = {
        articles: [
          {
            documentId: '1',
            title: 'Article 1',
            slug: 'article-1',
            description: 'Description 1',
            content: 'Content 1',
            author: 'Author 1',
            publishedDate: '2024-01-01',
            category: 'Category 1',
            tags: ['tag1'],
            featuredImage: 'image1.jpg',
            sourceUrl: 'source1.com',
            videoUrl: 'video1.com',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
            publishedAt: '2024-01-01',
          },
          {
            documentId: '2',
            title: 'Article 2',
            slug: 'article-2',
            description: 'Description 2',
            content: 'Content 2',
            author: 'Author 2',
            publishedDate: '2024-01-02',
            category: 'Category 2',
            tags: ['tag2'],
            featuredImage: 'image2.jpg',
            sourceUrl: 'source2.com',
            videoUrl: 'video2.com',
            createdAt: '2024-01-02',
            updatedAt: '2024-01-02',
            publishedAt: '2024-01-02',
          },
        ],
      };

      expect(response.articles).toBeDefined();
      expect(response.articles).toHaveLength(2);
      expect(response.articles[0].documentId).toBe('1');
      expect(response.articles[1].documentId).toBe('2');
    });

    it('should allow empty articles array', () => {
      const response: ArticlesResponse = {
        articles: [],
      };

      expect(response.articles).toHaveLength(0);
    });
  });
});

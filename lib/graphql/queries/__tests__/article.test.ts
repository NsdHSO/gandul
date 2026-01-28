import { ARTICLES_QUERY, ARTICLE_BY_ID_QUERY } from '../article';

describe('Article GraphQL Queries', () => {
  describe('ARTICLES_QUERY', () => {
    it('should be a valid GraphQL query string', () => {
      expect(ARTICLES_QUERY).toBeDefined();
      expect(typeof ARTICLES_QUERY).toBe('string');
    });

    it('should include GetArticles query operation', () => {
      expect(ARTICLES_QUERY).toContain('query GetArticles');
    });

    it('should accept limit and start parameters', () => {
      expect(ARTICLES_QUERY).toContain('$limit: Int');
      expect(ARTICLES_QUERY).toContain('$start: Int');
    });

    it('should query articles with pagination', () => {
      expect(ARTICLES_QUERY).toContain('articles');
      expect(ARTICLES_QUERY).toContain('pagination');
      expect(ARTICLES_QUERY).toContain('limit: $limit');
      expect(ARTICLES_QUERY).toContain('start: $start');
    });

    it('should sort by publishedDate in descending order', () => {
      expect(ARTICLES_QUERY).toContain('sort: "publishedDate:desc"');
    });

    it('should include documentId field', () => {
      expect(ARTICLES_QUERY).toContain('documentId');
    });

    it('should include title field', () => {
      expect(ARTICLES_QUERY).toContain('title');
    });

    it('should include slug field', () => {
      expect(ARTICLES_QUERY).toContain('slug');
    });

    it('should include description field', () => {
      expect(ARTICLES_QUERY).toContain('description');
    });

    it('should include author field', () => {
      expect(ARTICLES_QUERY).toContain('author');
    });

    it('should include publishedDate field', () => {
      expect(ARTICLES_QUERY).toContain('publishedDate');
    });

    it('should include category field', () => {
      expect(ARTICLES_QUERY).toContain('category');
    });

    it('should include tags field', () => {
      expect(ARTICLES_QUERY).toContain('tags');
    });

    it('should include featuredImage field', () => {
      expect(ARTICLES_QUERY).toContain('featuredImage');
    });

    it('should include sourceUrl field', () => {
      expect(ARTICLES_QUERY).toContain('sourceUrl');
    });

    it('should include videoUrl field', () => {
      expect(ARTICLES_QUERY).toContain('videoUrl');
    });

    it('should include createdAt field', () => {
      expect(ARTICLES_QUERY).toContain('createdAt');
    });

    it('should include updatedAt field', () => {
      expect(ARTICLES_QUERY).toContain('updatedAt');
    });

    it('should include publishedAt field', () => {
      expect(ARTICLES_QUERY).toContain('publishedAt');
    });
  });

  describe('ARTICLE_BY_ID_QUERY', () => {
    it('should be a valid GraphQL query string', () => {
      expect(ARTICLE_BY_ID_QUERY).toBeDefined();
      expect(typeof ARTICLE_BY_ID_QUERY).toBe('string');
    });

    it('should include GetArticle query operation', () => {
      expect(ARTICLE_BY_ID_QUERY).toContain('query GetArticle');
    });

    it('should accept documentId parameter', () => {
      expect(ARTICLE_BY_ID_QUERY).toContain('$documentId: ID!');
    });

    it('should query single article by documentId', () => {
      expect(ARTICLE_BY_ID_QUERY).toContain('article');
      expect(ARTICLE_BY_ID_QUERY).toContain('documentId: $documentId');
    });

    it('should include all article fields', () => {
      const fields = [
        'documentId',
        'title',
        'slug',
        'description',
        'content',
        'author',
        'publishedDate',
        'category',
        'tags',
        'featuredImage',
        'sourceUrl',
        'videoUrl',
        'createdAt',
        'updatedAt',
        'publishedAt',
      ];

      fields.forEach((field) => {
        expect(ARTICLE_BY_ID_QUERY).toContain(field);
      });
    });

    it('should include content field (not in ARTICLES_QUERY)', () => {
      expect(ARTICLE_BY_ID_QUERY).toContain('content');
      expect(ARTICLES_QUERY).not.toContain('content');
    });
  });
});

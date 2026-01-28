import {
  ArticleHeader,
  ArticleMetadata,
  ArticleContent,
  ArticleLinks,
  ArticleTags,
  ArticleLoading,
  ArticleError,
} from '../index';

describe('Article Components Index', () => {
  it('should export ArticleHeader', () => {
    expect(ArticleHeader).toBeDefined();
    expect(typeof ArticleHeader).toBe('function');
  });

  it('should export ArticleMetadata', () => {
    expect(ArticleMetadata).toBeDefined();
    expect(typeof ArticleMetadata).toBe('function');
  });

  it('should export ArticleContent', () => {
    expect(ArticleContent).toBeDefined();
    expect(typeof ArticleContent).toBe('function');
  });

  it('should export ArticleLinks', () => {
    expect(ArticleLinks).toBeDefined();
    expect(typeof ArticleLinks).toBe('function');
  });

  it('should export ArticleTags', () => {
    expect(ArticleTags).toBeDefined();
    expect(typeof ArticleTags).toBe('function');
  });

  it('should export ArticleLoading', () => {
    expect(ArticleLoading).toBeDefined();
    expect(typeof ArticleLoading).toBe('function');
  });

  it('should export ArticleError', () => {
    expect(ArticleError).toBeDefined();
    expect(typeof ArticleError).toBe('function');
  });

  it('should export all article components', () => {
    const exports = {
      ArticleHeader,
      ArticleMetadata,
      ArticleContent,
      ArticleLinks,
      ArticleTags,
      ArticleLoading,
      ArticleError,
    };

    Object.values(exports).forEach(component => {
      expect(component).toBeDefined();
      expect(typeof component).toBe('function');
    });
  });
});

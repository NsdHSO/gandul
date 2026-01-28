import { useArticles, useArticle } from '../index';

describe('Hooks Index Exports', () => {
  it('should export useArticles hook', () => {
    expect(useArticles).toBeDefined();
    expect(typeof useArticles).toBe('function');
  });

  it('should export useArticle hook', () => {
    expect(useArticle).toBeDefined();
    expect(typeof useArticle).toBe('function');
  });
});

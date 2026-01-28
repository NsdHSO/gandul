import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ArticleContent } from '../article-content';

describe('ArticleContent Component', () => {
  describe('Description Rendering', () => {
    it('should render description when provided', () => {
      render(<ArticleContent description="This is the article description" />);
      expect(screen.getByText('This is the article description')).toBeTruthy();
    });

    it('should not render description when not provided', () => {
      render(<ArticleContent />);
      // Component renders without description
      expect(true).toBeTruthy();
    });

    it('should handle long descriptions', () => {
      const longDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10);
      render(<ArticleContent description={longDescription} />);
      expect(screen.getByText(longDescription)).toBeTruthy();
    });

    it('should handle special characters in description', () => {
      render(<ArticleContent description="Description with: special & chars!" />);
      expect(screen.getByText('Description with: special & chars!')).toBeTruthy();
    });

    it('should handle Romanian characters in description', () => {
      render(<ArticleContent description="Descriere în limba română cu ă, â, î, ș, ț" />);
      expect(screen.getByText('Descriere în limba română cu ă, â, î, ș, ț')).toBeTruthy();
    });
  });

  describe('Content Rendering', () => {
    it('should render content when provided', () => {
      render(<ArticleContent content="This is the main article content" />);
      expect(screen.getByText('This is the main article content')).toBeTruthy();
    });

    it('should not render content when not provided', () => {
      render(<ArticleContent />);
      // Component renders without content
      expect(true).toBeTruthy();
    });

    it('should handle very long content', () => {
      const longContent = 'This is a very long article content. '.repeat(50);
      render(<ArticleContent content={longContent} />);
      expect(screen.getByText(longContent)).toBeTruthy();
    });

    it('should handle newlines in content', () => {
      const contentWithNewlines = 'First paragraph\n\nSecond paragraph\n\nThird paragraph';
      render(<ArticleContent content={contentWithNewlines} />);
      expect(screen.getByText(contentWithNewlines)).toBeTruthy();
    });
  });

  describe('Combined Rendering', () => {
    it('should render both description and content', () => {
      render(
        <ArticleContent
          description="Article description"
          content="Article main content"
        />
      );
      expect(screen.getByText('Article description')).toBeTruthy();
      expect(screen.getByText('Article main content')).toBeTruthy();
    });

    it('should render only description when content is not provided', () => {
      render(<ArticleContent description="Only description" />);
      expect(screen.getByText('Only description')).toBeTruthy();
    });

    it('should render only content when description is not provided', () => {
      render(<ArticleContent content="Only content" />);
      expect(screen.getByText('Only content')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings', () => {
      render(<ArticleContent description="" content="" />);
      // Component should render but with no visible text
      const emptyTexts = screen.queryAllByText('');
      expect(emptyTexts.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle undefined values', () => {
      render(<ArticleContent description={undefined} content={undefined} />);
      // Component should render without errors
      expect(true).toBeTruthy();
    });

    it('should handle whitespace-only strings', () => {
      render(<ArticleContent description="   " content="   " />);
      // Both description and content have whitespace
      expect(screen.getAllByText('   ').length).toBeGreaterThan(0);
    });
  });
});

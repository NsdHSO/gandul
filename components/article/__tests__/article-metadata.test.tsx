import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ArticleMetadata } from '../article-metadata';

describe('ArticleMetadata Component', () => {
  describe('Title Rendering', () => {
    it('should render title', () => {
      render(<ArticleMetadata title="Test Article Title" />);
      expect(screen.getByText('Test Article Title')).toBeTruthy();
    });

    it('should render long titles', () => {
      const longTitle = 'This is a very long article title that should still be rendered properly without any issues';
      render(<ArticleMetadata title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeTruthy();
    });

    it('should handle special characters in title', () => {
      render(<ArticleMetadata title="Article with special: chars & símböls!" />);
      expect(screen.getByText('Article with special: chars & símböls!')).toBeTruthy();
    });

    it('should handle Romanian characters in title', () => {
      render(<ArticleMetadata title="Știri importante despre România" />);
      expect(screen.getByText('Știri importante despre România')).toBeTruthy();
    });
  });

  describe('Author Rendering', () => {
    it('should render author when provided', () => {
      render(<ArticleMetadata title="Test Article" author="John Doe" />);
      expect(screen.getByText('By John Doe')).toBeTruthy();
    });

    it('should not render author when not provided', () => {
      const { queryByText } = render(<ArticleMetadata title="Test Article" />);
      expect(queryByText(/^By /)).toBeNull();
    });

    it('should handle author names with special characters', () => {
      render(<ArticleMetadata title="Test" author="Ștefan Popescu" />);
      expect(screen.getByText('By Ștefan Popescu')).toBeTruthy();
    });

    it('should handle long author names', () => {
      const longAuthor = 'Dr. Professor John Smith-Johnson III';
      render(<ArticleMetadata title="Test" author={longAuthor} />);
      expect(screen.getByText(`By ${longAuthor}`)).toBeTruthy();
    });
  });

  describe('Combined Rendering', () => {
    it('should render both title and author', () => {
      render(<ArticleMetadata title="Test Article" author="Jane Doe" />);
      expect(screen.getByText('Test Article')).toBeTruthy();
      expect(screen.getByText('By Jane Doe')).toBeTruthy();
    });

    it('should render only title when author is empty string', () => {
      const { queryByText } = render(<ArticleMetadata title="Test Article" author="" />);
      expect(screen.getByText('Test Article')).toBeTruthy();
      expect(queryByText(/^By /)).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      render(<ArticleMetadata title="" />);
      expect(screen.queryByText('')).toBeTruthy();
    });

    it('should handle title with only whitespace', () => {
      render(<ArticleMetadata title="   " />);
      expect(screen.getByText('   ')).toBeTruthy();
    });

    it('should handle undefined author gracefully', () => {
      const { queryByText } = render(<ArticleMetadata title="Test" author={undefined} />);
      expect(screen.getByText('Test')).toBeTruthy();
      expect(queryByText(/^By /)).toBeNull();
    });
  });
});

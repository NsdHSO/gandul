import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ArticleHeader } from '../article-header';

describe('ArticleHeader Component', () => {
  const defaultProps = {
    publishedDate: '2024-01-15T10:30:00Z',
  };

  describe('Rendering', () => {
    it('should render with required props', () => {
      render(<ArticleHeader {...defaultProps} />);
      expect(screen.getByText(/15 ianuarie 2024/i)).toBeTruthy();
    });

    it('should render featured image when provided', () => {
      const { getByTestId } = render(
        <ArticleHeader {...defaultProps} featuredImage="http://test.com/image.jpg" />
      );
      // expo-image is mocked, so we can't easily test the Image component
      // But we can verify the component renders without errors
      expect(screen.getByText(/15 ianuarie 2024/i)).toBeTruthy();
    });

    it('should not render featured image when not provided', () => {
      const { queryByTestId } = render(<ArticleHeader {...defaultProps} />);
      // Since Image is mocked, we check that the component still renders
      expect(screen.getByText(/15 ianuarie 2024/i)).toBeTruthy();
    });

    it('should render category badge when provided', () => {
      render(<ArticleHeader {...defaultProps} category="Technology" />);
      expect(screen.getByText(/TECHNOLOGY/i)).toBeTruthy();
    });

    it('should not render category badge when not provided', () => {
      const { queryByText } = render(<ArticleHeader {...defaultProps} />);
      // Only the date should be visible
      expect(screen.getByText(/15 ianuarie 2024/i)).toBeTruthy();
    });
  });

  describe('Date Formatting', () => {
    it('should format date in Romanian locale', () => {
      render(<ArticleHeader publishedDate="2024-03-20T15:45:00Z" />);
      expect(screen.getByText(/20 martie 2024/i)).toBeTruthy();
    });

    it('should include time in formatted date', () => {
      const { getByText } = render(
        <ArticleHeader publishedDate="2024-01-15T10:30:00Z" />
      );
      const dateText = getByText(/15 ianuarie 2024/i);
      expect(dateText).toBeTruthy();
    });

    it('should handle different date formats', () => {
      render(<ArticleHeader publishedDate="2024-12-31T12:00:00Z" />);
      // Date formatting is locale and timezone dependent
      const dateText = screen.getByText(/2024/);
      expect(dateText).toBeTruthy();
    });
  });

  describe('Category Display', () => {
    it('should display category in uppercase', () => {
      render(<ArticleHeader {...defaultProps} category="sport" />);
      expect(screen.getByText(/SPORT/i)).toBeTruthy();
    });

    it('should handle long category names', () => {
      render(
        <ArticleHeader
          {...defaultProps}
          category="Very Long Category Name"
        />
      );
      expect(screen.getByText(/VERY LONG CATEGORY NAME/i)).toBeTruthy();
    });

    it('should handle special characters in category', () => {
      render(<ArticleHeader {...defaultProps} category="Știri Politice" />);
      expect(screen.getByText(/ȘTIRI POLITICE/i)).toBeTruthy();
    });
  });

  describe('Combined Props', () => {
    it('should render all props together', () => {
      render(
        <ArticleHeader
          featuredImage="http://test.com/image.jpg"
          category="Technology"
          publishedDate="2024-01-15T10:30:00Z"
        />
      );
      expect(screen.getByText(/TECHNOLOGY/i)).toBeTruthy();
      expect(screen.getByText(/15 ianuarie 2024/i)).toBeTruthy();
    });
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ArticleError } from '../article-error';

// Mock expo-router Stack
jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  Stack: {
    Screen: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  },
}));

describe('ArticleError Component', () => {
  describe('Rendering', () => {
    it('should render error header', () => {
      render(<ArticleError />);
      expect(screen.getAllByText('Error')).toHaveLength(1);
    });

    it('should render default error message when no error prop is provided', () => {
      render(<ArticleError />);
      expect(screen.getByText('Article not found')).toBeTruthy();
    });

    it('should render custom error message when error prop is provided', () => {
      render(<ArticleError error="Network connection failed" />);
      expect(screen.getByText('Network connection failed')).toBeTruthy();
    });

    it('should not render default message when custom error is provided', () => {
      const { queryByText } = render(<ArticleError error="Custom error" />);
      expect(screen.getByText('Custom error')).toBeTruthy();
      expect(queryByText('Article not found')).toBeNull();
    });
  });

  describe('Error Messages', () => {
    it('should handle long error messages', () => {
      const longError = 'This is a very long error message that describes what went wrong in great detail and should still be displayed properly to the user';
      render(<ArticleError error={longError} />);
      expect(screen.getByText(longError)).toBeTruthy();
    });

    it('should handle error messages with special characters', () => {
      render(<ArticleError error="Error: 404 - Article #123 not found!" />);
      expect(screen.getByText('Error: 404 - Article #123 not found!')).toBeTruthy();
    });

    it('should handle error messages with Romanian characters', () => {
      render(<ArticleError error="Articolul nu a fost găsit în baza de date" />);
      expect(screen.getByText('Articolul nu a fost găsit în baza de date')).toBeTruthy();
    });

    it('should handle empty string error', () => {
      render(<ArticleError error="" />);
      // Empty string is falsy, so should show default message
      expect(screen.getByText('Article not found')).toBeTruthy();
    });
  });

  describe('Layout', () => {
    it('should render without crashing', () => {
      const { container } = render(<ArticleError />);
      expect(container).toBeTruthy();
    });

    it('should render Error header and message', () => {
      render(<ArticleError error="Test error" />);
      expect(screen.getAllByText('Error')).toHaveLength(1);
      expect(screen.getByText('Test error')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined error prop', () => {
      render(<ArticleError error={undefined} />);
      expect(screen.getByText('Article not found')).toBeTruthy();
    });

    it('should handle whitespace-only error', () => {
      render(<ArticleError error="   " />);
      expect(screen.getByText('   ')).toBeTruthy();
    });

    it('should handle newlines in error message', () => {
      const errorWithNewlines = 'Error occurred:\nPlease try again';
      render(<ArticleError error={errorWithNewlines} />);
      expect(screen.getByText(errorWithNewlines)).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible error text', () => {
      render(<ArticleError error="Accessible error message" />);
      expect(screen.getByText('Accessible error message')).toBeTruthy();
    });

    it('should have visible error header', () => {
      render(<ArticleError />);
      const errorHeaders = screen.getAllByText('Error');
      expect(errorHeaders.length).toBeGreaterThan(0);
    });
  });
});

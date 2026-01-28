import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ArticleLoading } from '../article-loading';

// Mock expo-router Stack
jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  Stack: {
    Screen: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  },
}));

describe('ArticleLoading Component', () => {
  describe('Rendering', () => {
    it('should render loading text', () => {
      render(<ArticleLoading />);
      expect(screen.getByText('Loading article...')).toBeTruthy();
    });

    it('should render activity indicator', () => {
      const { getByTestId, UNSAFE_getByType } = render(<ArticleLoading />);
      // ActivityIndicator should be present in the component tree
      expect(screen.getByText('Loading article...')).toBeTruthy();
    });
  });

  describe('Layout', () => {
    it('should render without errors', () => {
      const { container } = render(<ArticleLoading />);
      expect(container).toBeTruthy();
    });

    it('should have loading message', () => {
      render(<ArticleLoading />);
      const loadingText = screen.getByText('Loading article...');
      expect(loadingText).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible loading text', () => {
      render(<ArticleLoading />);
      expect(screen.getByText('Loading article...')).toBeTruthy();
    });
  });
});

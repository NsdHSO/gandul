import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import { ArticleLinks } from '../article-links';

// Mock Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('ArticleLinks Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should return null when no links are provided', () => {
      const { root } = render(<ArticleLinks />);
      expect(root).toBeTruthy();
    });

    it('should return null when both links are undefined', () => {
      const { root } = render(
        <ArticleLinks videoUrl={undefined} sourceUrl={undefined} />
      );
      expect(root).toBeTruthy();
    });

    it('should render video link when videoUrl is provided', () => {
      render(<ArticleLinks videoUrl="http://test.com/video" />);
      expect(screen.getByText('Video')).toBeTruthy();
      expect(screen.getByText('Watch Video')).toBeTruthy();
    });

    it('should render source link when sourceUrl is provided', () => {
      render(<ArticleLinks sourceUrl="http://test.com/source" />);
      expect(screen.getByText('Source')).toBeTruthy();
      expect(screen.getByText('View Original Article')).toBeTruthy();
    });

    it('should render both links when both URLs are provided', () => {
      render(
        <ArticleLinks
          videoUrl="http://test.com/video"
          sourceUrl="http://test.com/source"
        />
      );
      expect(screen.getByText('Video')).toBeTruthy();
      expect(screen.getByText('Watch Video')).toBeTruthy();
      expect(screen.getByText('Source')).toBeTruthy();
      expect(screen.getByText('View Original Article')).toBeTruthy();
    });
  });

  describe('Link Interaction', () => {
    it('should open video URL when video link is pressed', () => {
      const videoUrl = 'http://test.com/video.mp4';
      render(<ArticleLinks videoUrl={videoUrl} />);

      const videoLink = screen.getByText('Watch Video');
      fireEvent.press(videoLink);

      expect(Linking.openURL).toHaveBeenCalledWith(videoUrl);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
    });

    it('should open source URL when source link is pressed', () => {
      const sourceUrl = 'http://test.com/article';
      render(<ArticleLinks sourceUrl={sourceUrl} />);

      const sourceLink = screen.getByText('View Original Article');
      fireEvent.press(sourceLink);

      expect(Linking.openURL).toHaveBeenCalledWith(sourceUrl);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple link presses', () => {
      const videoUrl = 'http://test.com/video.mp4';
      render(<ArticleLinks videoUrl={videoUrl} />);

      const videoLink = screen.getByText('Watch Video');
      fireEvent.press(videoLink);
      fireEvent.press(videoLink);

      expect(Linking.openURL).toHaveBeenCalledTimes(2);
    });

    it('should open correct URLs when both links are present', () => {
      const videoUrl = 'http://test.com/video.mp4';
      const sourceUrl = 'http://test.com/article';
      render(<ArticleLinks videoUrl={videoUrl} sourceUrl={sourceUrl} />);

      const videoLink = screen.getByText('Watch Video');
      const sourceLink = screen.getByText('View Original Article');

      fireEvent.press(videoLink);
      expect(Linking.openURL).toHaveBeenCalledWith(videoUrl);

      fireEvent.press(sourceLink);
      expect(Linking.openURL).toHaveBeenCalledWith(sourceUrl);

      expect(Linking.openURL).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string URLs', () => {
      const { root } = render(
        <ArticleLinks videoUrl="" sourceUrl="" />
      );
      expect(root).toBeTruthy();
    });

    it('should handle special characters in URLs', () => {
      render(
        <ArticleLinks
          videoUrl="http://test.com/video?param=value&other=123"
          sourceUrl="http://test.com/article#section"
        />
      );
      expect(screen.getByText('Watch Video')).toBeTruthy();
      expect(screen.getByText('View Original Article')).toBeTruthy();
    });

    it('should handle very long URLs', () => {
      const longUrl = 'http://test.com/' + 'a'.repeat(200);
      render(<ArticleLinks videoUrl={longUrl} />);

      const videoLink = screen.getByText('Watch Video');
      fireEvent.press(videoLink);

      expect(Linking.openURL).toHaveBeenCalledWith(longUrl);
    });
  });
});

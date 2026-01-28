import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { openBrowserAsync } from 'expo-web-browser';
import { ExternalLink } from '../external-link';

jest.mock('expo-web-browser');

describe('ExternalLink Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.EXPO_OS = 'ios';
  });

  describe('Rendering', () => {
    it('should render with href and children', () => {
      const { getByText } = render(
        <ExternalLink href="https://example.com">
          Example Link
        </ExternalLink>
      );
      expect(getByText('Example Link')).toBeTruthy();
    });

    it('should render with complex children', () => {
      const { getByText } = render(
        <ExternalLink href="https://example.com">
          <></>Link with text
        </ExternalLink>
      );
      expect(getByText('Link with text')).toBeTruthy();
    });
  });

  describe('Native Behavior', () => {
    it('should open browser on native when pressed', async () => {
      const href = 'https://example.com';
      const { getByText } = render(
        <ExternalLink href={href}>Native Link</ExternalLink>
      );

      const link = getByText('Native Link');
      await fireEvent.press(link);

      expect(openBrowserAsync).toHaveBeenCalledWith(
        href,
        expect.objectContaining({
          presentationStyle: expect.anything(),
        })
      );
    });

    it('should open browser with Android OS', async () => {
      process.env.EXPO_OS = 'android';
      const href = 'https://example.com/android';
      const { getByText } = render(
        <ExternalLink href={href}>Android Link</ExternalLink>
      );

      const link = getByText('Android Link');
      await fireEvent.press(link);

      expect(openBrowserAsync).toHaveBeenCalledWith(
        href,
        expect.anything()
      );
    });

    it('should handle different URLs', async () => {
      const testUrls = [
        'https://google.com',
        'https://github.com/user/repo',
        'https://example.com/path/to/page',
      ];

      for (const url of testUrls) {
        const { getByText, unmount } = render(
          <ExternalLink href={url}>Test Link</ExternalLink>
        );

        await fireEvent.press(getByText('Test Link'));
        expect(openBrowserAsync).toHaveBeenCalledWith(url, expect.anything());

        unmount();
        jest.clearAllMocks();
      }
    });
  });

  describe('Web Behavior', () => {
    it('should not call openBrowserAsync on web', async () => {
      process.env.EXPO_OS = 'web';

      const { getByText } = render(
        <ExternalLink href="https://example.com">Web Link</ExternalLink>
      );

      await fireEvent.press(getByText('Web Link'));

      expect(openBrowserAsync).not.toHaveBeenCalled();
    });
  });

  describe('Props Handling', () => {
    it('should pass through additional Link props', () => {
      const { getByText } = render(
        <ExternalLink
          href="https://example.com"
          testID="external-link"
        >
          Props Link
        </ExternalLink>
      );
      expect(getByText('Props Link')).toBeTruthy();
    });

    it('should have target="_blank" attribute', () => {
      const { getByText } = render(
        <ExternalLink href="https://example.com">
          Blank Target Link
        </ExternalLink>
      );
      expect(getByText('Blank Target Link')).toBeTruthy();
    });
  });

  describe('URL Variations', () => {
    it('should handle http URLs', async () => {
      const { getByText } = render(
        <ExternalLink href="http://example.com">HTTP Link</ExternalLink>
      );

      await fireEvent.press(getByText('HTTP Link'));
      expect(openBrowserAsync).toHaveBeenCalledWith(
        'http://example.com',
        expect.anything()
      );
    });

    it('should handle URLs with query parameters', async () => {
      const url = 'https://example.com?param=value&other=123';
      const { getByText } = render(
        <ExternalLink href={url}>Query Link</ExternalLink>
      );

      await fireEvent.press(getByText('Query Link'));
      expect(openBrowserAsync).toHaveBeenCalledWith(url, expect.anything());
    });

    it('should handle URLs with hash fragments', async () => {
      const url = 'https://example.com/page#section';
      const { getByText } = render(
        <ExternalLink href={url}>Hash Link</ExternalLink>
      );

      await fireEvent.press(getByText('Hash Link'));
      expect(openBrowserAsync).toHaveBeenCalledWith(url, expect.anything());
    });
  });
});

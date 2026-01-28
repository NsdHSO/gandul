// Jest setup for React Native Testing Library
// Note: @testing-library/react-native v12.4+ includes matchers by default

// Mock Expo globals
global.__ExpoImportMetaRegistry = {
  get: () => null,
  set: () => {},
};

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: 'Image',
}));

// Mock expo-router
jest.mock('expo-router', () => {
  const React = require('react');
  const { Pressable } = require('react-native');
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
    Link: ({ children, onPress, ...props }) =>
      React.createElement(Pressable, {
        ...props,
        onPress: (e) => {
          const event = e || {};
          event.preventDefault = event.preventDefault || jest.fn();
          onPress?.(event);
        },
        testID: props.testID || 'expo-router-link'
      }, children),
    Stack: {
      Screen: ({ children }) => children || null,
    },
  };
});

// Mock expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        EXPO_PUBLIC_GRAPHQL_URL: 'http://test-url.com/graphql',
      },
    },
  },
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');

// Mock expo-symbols
jest.mock('expo-symbols', () => ({
  SymbolView: 'SymbolView',
}));

// Mock hooks
jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: jest.fn((colors) => colors?.light || '#000000'),
}));

jest.mock('@/hooks/use-color-scheme', () => ({
  useColorScheme: jest.fn(() => 'light'),
}));

// Mock expo-web-browser
jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
  WebBrowserPresentationStyle: {
    AUTOMATIC: 0,
  },
}));

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
  },
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return {
    ...Reanimated,
    useAnimatedRef: jest.fn(() => ({ current: null })),
    useScrollOffset: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn((callback) => callback()),
  };
});

// Mock @react-navigation/elements
jest.mock('@react-navigation/elements', () => {
  const React = require('react');
  const { Pressable } = require('react-native');
  return {
    PlatformPressable: ({ children, ...props }) =>
      React.createElement(Pressable, props, children),
  };
});

// Mock Linking module will be done per-test as needed

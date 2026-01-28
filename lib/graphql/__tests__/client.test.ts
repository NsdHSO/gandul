import { graphqlClient } from '../client';
import { Client } from 'urql';

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

describe('GraphQL Client', () => {
  it('should export a urql Client instance', () => {
    expect(graphqlClient).toBeDefined();
    expect(graphqlClient).toBeInstanceOf(Client);
  });

  it('should be a valid urql Client', () => {
    expect(graphqlClient).toBeDefined();
    expect(typeof graphqlClient.query).toBe('function');
    expect(typeof graphqlClient.mutation).toBe('function');
  });

  it('should have query method', () => {
    expect(graphqlClient.query).toBeDefined();
    expect(typeof graphqlClient.query).toBe('function');
  });

  it('should have mutation method', () => {
    expect(graphqlClient.mutation).toBeDefined();
    expect(typeof graphqlClient.mutation).toBe('function');
  });
});

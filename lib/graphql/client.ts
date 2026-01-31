import { Client, cacheExchange, fetchExchange } from 'urql';

// Read at bundle-time. In production, Constants.expoConfig is not guaranteed,
// so rely on compile-time inlining of EXPO_PUBLIC_* envs.
const fromEnv = process.env.EXPO_PUBLIC_GRAPHQL_URL;
const fallback = __DEV__ ? 'http://localhost:2003/strapi-proxy' : undefined;
const GRAPHQL_URL = fromEnv ?? fallback;

// Fail fast in release if URL is missing or points to localhost (unreachable on device)
if (!__DEV__) {
  const isLocalhost = typeof GRAPHQL_URL === 'string' && /(^|\/\/)(localhost|127\.0\.0\.1)([:/]|$)/.test(GRAPHQL_URL);
  if (!GRAPHQL_URL || isLocalhost) {
    throw new Error('Missing/invalid EXPO_PUBLIC_GRAPHQL_URL for release build');
  }
}

export const graphqlClient = new Client({
  url: GRAPHQL_URL as string,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
  },
  preferGetMethod: false,
});

import { Client, cacheExchange, fetchExchange } from 'urql';
import Constants from 'expo-constants';

const GRAPHQL_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_GRAPHQL_URL ||
                   process.env.EXPO_PUBLIC_GRAPHQL_URL ||
                   'http://localhost:2003/strapi-proxy';

export const graphqlClient = new Client({
  url: GRAPHQL_URL,
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

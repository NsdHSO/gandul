// Article queries for Strapi GraphQL API

export const ARTICLES_QUERY = `
  query {
    articles {
      title
      featuredImage
      publishedDate
    }
  }
`;

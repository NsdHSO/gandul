// Article queries for Strapi GraphQL API

export const ARTICLES_QUERY = `
  query {
    articles(sort: "publishedDate:desc") {
      documentId
      title
      slug
      description
      author
      publishedDate
      category
      tags
      featuredImage
      sourceUrl
      videoUrl
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

export const ARTICLE_BY_ID_QUERY = `
  query GetArticle($documentId: ID!) {
    article(documentId: $documentId) {
      documentId
      title
      slug
      description
      content
      author
      publishedDate
      category
      tags
      featuredImage
      sourceUrl
      videoUrl
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

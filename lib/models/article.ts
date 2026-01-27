export interface Article {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  publishedDate: string;
  category: string;
  tags: string[];
  featuredImage: string;
  sourceUrl: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ArticlesResponse {
  articles: Article[];
}

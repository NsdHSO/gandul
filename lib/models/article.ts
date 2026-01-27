export interface Article {
  title: string;
  featuredImage: string;
  publishedDate: string;
}

export interface ArticlesResponse {
  articles: Article[];
}

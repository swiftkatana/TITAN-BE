export interface Quote {
  id: number;
  body: string;
  author: string;
  tags: string[];
  favorite: boolean;
  author_permalink: string;
  url: string;
  favorites_count: number;
  upvotes_count: number;
  downvotes_count: number;
  dialogue: boolean;
}
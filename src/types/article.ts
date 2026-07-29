export type CategorySlug =
  | "education"
  | "healthcare"
  | "business-leaders"
  | "finance-economy"
  | "food-culture"
  | "community"
  | "beauty-wellness";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  category: CategorySlug;
  date: string;
  coverImage: string;
  featured: boolean;
  imageCredit: string;
}

export type ArticleMeta = ArticleFrontmatter;

export interface Article extends ArticleFrontmatter {
  contentHtml: string;
}

export interface CategoryConfig {
  slug: CategorySlug;
  label: string;
  order: number;
  intro: string;
  accent: string;
  accentSoft: string;
}

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

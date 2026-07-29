import { getArticlesForSearch, stripInternal } from "@/lib/articles";
import { getCategoryBySlug } from "@/config/categories";
import type { ArticleFrontmatter } from "@/types/article";

export function searchArticles(query: string): ArticleFrontmatter[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return getArticlesForSearch()
    .filter((article) => {
      const categoryLabel = getCategoryBySlug(article.category)?.label.toLowerCase() ?? "";
      return (
        article.title.toLowerCase().includes(normalized) ||
        article.excerpt.toLowerCase().includes(normalized) ||
        article.rawBody.toLowerCase().includes(normalized) ||
        categoryLabel.includes(normalized) ||
        article.category.toLowerCase().includes(normalized)
      );
    })
    .map(stripInternal);
}

import type { ArticleFrontmatter } from "@/types/article";

const KNOWN_LOCATIONS = [
  "New Orleans",
  "Baton Rouge",
  "Lafayette",
  "Shreveport",
  "Lake Charles",
  "Alexandria",
  "Monroe",
  "Houma",
  "Slidell",
  "Covington",
  "Metairie",
  "Kenner",
  "Bossier City",
  "Hammond",
  "Natchitoches",
  "Mandeville",
  "Acadiana",
];

/** Derives a location label from an article's title/excerpt rather than a fabricated field. */
export function getArticleLocationLabel(article: Pick<ArticleFrontmatter, "title" | "excerpt">): string {
  const haystack = `${article.title} ${article.excerpt}`;
  for (const location of KNOWN_LOCATIONS) {
    if (haystack.includes(location)) return location;
  }
  return "Across Louisiana";
}

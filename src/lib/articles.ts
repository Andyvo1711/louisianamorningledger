import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { isValidCategorySlug } from "@/config/categories";
import type { Article, ArticleFrontmatter, CategorySlug, PaginatedResult } from "@/types/article";

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

interface LoadedArticle extends ArticleFrontmatter {
  rawBody: string;
}

let cachedArticles: LoadedArticle[] | null = null;

function collectMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  let files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function loadAllArticlesRaw(): LoadedArticle[] {
  if (cachedArticles) return cachedArticles;

  const filePaths = collectMarkdownFiles(CONTENT_DIR);
  const articles: LoadedArticle[] = [];
  const seenSlugs = new Set<string>();

  for (const filePath of filePaths) {
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);

      const title = data.title;
      const slug = data.slug;
      const excerpt = data.excerpt;
      const category = data.category;
      const date = data.date;
      const coverImage = data.coverImage;
      const featured = data.featured;
      const imageCredit = data.imageCredit;

      if (
        !isNonEmptyString(title) ||
        !isNonEmptyString(slug) ||
        !isNonEmptyString(excerpt) ||
        !isNonEmptyString(category) ||
        !isNonEmptyString(date) ||
        !isNonEmptyString(coverImage) ||
        typeof featured !== "boolean" ||
        !isNonEmptyString(imageCredit)
      ) {
        console.error(`[articles] Skipping "${filePath}": missing or invalid frontmatter field.`);
        continue;
      }

      const filenameSlug = path.basename(filePath, ".md");
      if (filenameSlug !== slug) {
        console.error(`[articles] Skipping "${filePath}": slug "${slug}" does not match filename.`);
        continue;
      }

      if (!isValidCategorySlug(category)) {
        console.error(`[articles] Skipping "${filePath}": unknown category "${category}".`);
        continue;
      }

      if (!DATE_PATTERN.test(date) || Number.isNaN(new Date(`${date}T00:00:00Z`).getTime())) {
        console.error(`[articles] Skipping "${filePath}": invalid date "${date}".`);
        continue;
      }

      if (seenSlugs.has(slug)) {
        console.error(`[articles] Skipping "${filePath}": duplicate slug "${slug}".`);
        continue;
      }

      if (!content || !content.trim()) {
        console.error(`[articles] Skipping "${filePath}": empty article body.`);
        continue;
      }

      seenSlugs.add(slug);
      articles.push({
        title,
        slug,
        excerpt,
        category: category as CategorySlug,
        date,
        coverImage,
        featured,
        imageCredit,
        rawBody: content,
      });
    } catch (err) {
      console.error(`[articles] Failed to parse "${filePath}":`, err);
    }
  }

  articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  cachedArticles = articles;
  return articles;
}

export function stripInternal(article: LoadedArticle): ArticleFrontmatter {
  return {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    category: article.category,
    date: article.date,
    coverImage: article.coverImage,
    featured: article.featured,
    imageCredit: article.imageCredit,
  };
}

export function getAllArticles(): ArticleFrontmatter[] {
  return loadAllArticlesRaw().map(stripInternal);
}

/** Internal accessor for lib/search.ts — includes raw markdown body for text matching. */
export function getArticlesForSearch(): LoadedArticle[] {
  return loadAllArticlesRaw();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const found = loadAllArticlesRaw().find((a) => a.slug === slug);
  if (!found) return null;

  const processed = await remark().use(remarkHtml).process(found.rawBody);

  return {
    ...stripInternal(found),
    contentHtml: processed.toString(),
  };
}

export function getArticlesByCategory(category: CategorySlug): ArticleFrontmatter[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticles(): ArticleFrontmatter[] {
  return getAllArticles().filter((a) => a.featured);
}

export function getLatestArticles(limit?: number): ArticleFrontmatter[] {
  const all = getAllArticles();
  return typeof limit === "number" ? all.slice(0, limit) : all;
}

export function getRelatedArticles(
  article: Pick<ArticleFrontmatter, "slug" | "category">,
  limit = 4
): ArticleFrontmatter[] {
  const all = getAllArticles();
  const sameCategory = all.filter((a) => a.category === article.category && a.slug !== article.slug);
  const related = sameCategory.slice(0, limit);

  if (related.length < limit) {
    const usedSlugs = new Set(related.map((a) => a.slug));
    usedSlugs.add(article.slug);
    const fillers = all.filter((a) => !usedSlugs.has(a.slug)).slice(0, limit - related.length);
    related.push(...fillers);
  }

  return related;
}

export function paginateArticles<T>(items: T[], page: number, pageSize: number): PaginatedResult<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return {
    items: pageItems,
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

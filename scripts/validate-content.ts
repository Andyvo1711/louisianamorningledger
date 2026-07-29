import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");
const VALID_CATEGORIES = new Set([
  "education",
  "healthcare",
  "business-leaders",
  "finance-economy",
  "food-culture",
  "community",
  "beauty-wellness",
]);
const REQUIRED_FIELDS = ["title", "slug", "excerpt", "category", "date", "coverImage", "featured", "imageCredit"];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ALLOWED_IMAGE_HOSTS = ["images.unsplash.com", "images.pexels.com"];

let errorCount = 0;

function fail(filePath: string, message: string) {
  errorCount += 1;
  console.error(`✗ ${path.relative(process.cwd(), filePath)}: ${message}`);
}

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

function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && ALLOWED_IMAGE_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

function main() {
  const files = collectMarkdownFiles(CONTENT_DIR);

  if (files.length === 0) {
    console.error(`✗ No Markdown articles found under ${path.relative(process.cwd(), CONTENT_DIR)}`);
    process.exit(1);
  }

  const seenSlugs = new Map<string, string>();
  const seenImages = new Map<string, string>();

  for (const filePath of files) {
    let raw: string;
    try {
      raw = fs.readFileSync(filePath, "utf8");
    } catch (err) {
      fail(filePath, `could not read file: ${(err as Error).message}`);
      continue;
    }

    let data: Record<string, unknown>;
    let content: string;
    try {
      const parsed = matter(raw);
      data = parsed.data;
      content = parsed.content;
    } catch (err) {
      fail(filePath, `invalid frontmatter: ${(err as Error).message}`);
      continue;
    }

    for (const field of REQUIRED_FIELDS) {
      if (!(field in data)) {
        fail(filePath, `missing required frontmatter field "${field}"`);
      }
    }

    const { title, slug, excerpt, category, date, coverImage, featured, imageCredit } = data as Record<
      string,
      unknown
    >;

    if (typeof title !== "string" || !title.trim()) fail(filePath, `"title" must be a non-empty string`);
    if (typeof excerpt !== "string" || !excerpt.trim()) fail(filePath, `"excerpt" must be a non-empty string`);
    if (typeof imageCredit !== "string" || !imageCredit.trim())
      fail(filePath, `"imageCredit" must be a non-empty string`);

    if (typeof featured !== "boolean") {
      fail(filePath, `"featured" must be a boolean, got ${JSON.stringify(featured)}`);
    }

    if (typeof category !== "string" || !VALID_CATEGORIES.has(category)) {
      fail(filePath, `"category" must be one of: ${[...VALID_CATEGORIES].join(", ")} (got ${JSON.stringify(category)})`);
    }

    if (typeof date !== "string" || !DATE_PATTERN.test(date)) {
      fail(filePath, `"date" must use YYYY-MM-DD format (got ${JSON.stringify(date)})`);
    } else {
      const parsedDate = new Date(`${date}T00:00:00Z`);
      if (Number.isNaN(parsedDate.getTime())) {
        fail(filePath, `"date" is not a valid calendar date (got "${date}")`);
      }
    }

    if (typeof slug !== "string" || !slug.trim()) {
      fail(filePath, `"slug" must be a non-empty string`);
    } else {
      const filenameSlug = path.basename(filePath, ".md");
      if (filenameSlug !== slug) {
        fail(filePath, `filename "${filenameSlug}.md" does not match slug "${slug}"`);
      }
      if (seenSlugs.has(slug)) {
        fail(filePath, `duplicate slug "${slug}" also used by ${path.relative(process.cwd(), seenSlugs.get(slug)!)}`);
      } else {
        seenSlugs.set(slug, filePath);
      }
    }

    if (typeof coverImage !== "string" || !isValidImageUrl(coverImage)) {
      fail(filePath, `"coverImage" must be an https URL from images.unsplash.com or images.pexels.com (got ${JSON.stringify(coverImage)})`);
    } else {
      if (seenImages.has(coverImage)) {
        fail(filePath, `duplicate coverImage URL also used by ${path.relative(process.cwd(), seenImages.get(coverImage)!)}`);
      } else {
        seenImages.set(coverImage, filePath);
      }
    }

    if (!content || !content.trim()) {
      fail(filePath, `article body is empty`);
    }
  }

  console.log(`Checked ${files.length} article${files.length === 1 ? "" : "s"}.`);

  if (errorCount > 0) {
    console.error(`\n${errorCount} content validation error${errorCount === 1 ? "" : "s"} found.`);
    process.exit(1);
  }

  console.log("Content validation passed.");
}

main();

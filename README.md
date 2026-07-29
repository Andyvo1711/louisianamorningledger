# Louisiana Morning Ledger

*A Fresh Read on Louisiana Life*

News, leadership, business, health, and culture from across Louisiana — New Orleans, Baton Rouge, Lafayette, Shreveport, Lake Charles, Alexandria, Monroe, Houma, Slidell, Covington, Metairie, Kenner, Bossier City, Hammond, Natchitoches, and communities throughout the state.

## Design Concept

Louisiana Morning Ledger is built as a bright, energetic digital **morning newspaper** rather than a conventional category-grid news site. The homepage flows vertically, one edition section after another — masthead, lead story, morning briefing, and topic-specific editorial layouts (Education Edition, Healthcare Report, Business Desk, Markets and Economy, Food and Culture Spotlight, Community Notes, Beauty and Wellness Journal, Latest Stories) — each with its own visual arrangement instead of a repeated left/right block pattern.

The palette is warm and optimistic (morning sky blue, sunrise yellow, warm coral, cypress green, magnolia cream, and a restrained Mardi Gras purple) set against light backgrounds, with editorial serif headlines (Newsreader) and a clean sans-serif interface (Inter).

## Technology Stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS v4**
- **Markdown files** as the sole content store (no database, no CMS)
- `gray-matter` for frontmatter parsing
- `remark` + `remark-html` for Markdown-to-HTML rendering on article pages
- `tsx` for running the content validation script

## Folder Structure

```text
louisiana-morning-ledger/
├── content/
│   └── articles/
│       ├── education/
│       ├── healthcare/
│       ├── business-leaders/
│       ├── finance-economy/
│       ├── food-culture/
│       ├── community/
│       └── beauty-wellness/
├── public/
├── scripts/
│   └── validate-content.ts
├── src/
│   ├── app/
│   │   ├── article/[slug]/page.tsx
│   │   ├── category/[slug]/page.tsx
│   │   ├── search/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── config/
│   │   ├── categories.ts
│   │   └── site.ts
│   ├── lib/
│   │   ├── articles.ts
│   │   ├── dates.ts
│   │   ├── locations.ts
│   │   └── search.ts
│   └── types/
│       └── article.ts
├── next.config.ts
├── package.json
└── README.md
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Content Validation

Before running the dev server or building for production, validate every Markdown article's frontmatter:

```bash
npm run validate:content
```

This checks (without ever requiring an exact article count):

- At least one article exists
- All required frontmatter fields are present
- Every `slug` matches its filename
- Every `slug` is globally unique
- Every `category` is one of the seven supported slugs
- Every `date` uses `YYYY-MM-DD` and is a valid calendar date
- Every `coverImage` is an `https://images.unsplash.com/...` or `https://images.pexels.com/...` URL
- Every `coverImage` URL is unique across the whole site
- Every `imageCredit` is present
- Every `featured` value is a strict boolean
- Every article body is non-empty

## Production Build

```bash
npm run validate:content
npm run lint
npm run build
npm start
```

## How to Add an Article

1. Create a new Markdown file inside the matching category folder, e.g.
   `content/articles/community/baton-rouge-neighborhood-gardens-expand.md`
2. The **filename must exactly match** the `slug` field in frontmatter.
3. Use this exact frontmatter shape:

```yaml
---
title: "Article Title"
slug: "article-title-slug"
excerpt: "A concise summary of the article."
category: "community"
date: "2026-07-15"
coverImage: "https://images.unsplash.com/photo-XXXXXXXXXXXXX-XXXXXXXXXXXX?w=1600&q=80&auto=format&fit=crop"
featured: false
imageCredit: "Photo: Unsplash"
---
```

4. Write the Markdown body below the frontmatter (Markdown headings, paragraphs, bold/italic, ordered/unordered lists, blockquotes, and links are all supported and styled on the article page).
5. Run `npm run validate:content` to confirm the new file is well-formed.

Required frontmatter fields: `title`, `slug`, `excerpt`, `category`, `date`, `coverImage`, `featured`, `imageCredit`. Do **not** add `description` or `author` fields.

### Supported Category Slugs

| Order | Label | Slug |
| --- | --- | --- |
| 1 | Education | `education` |
| 2 | Healthcare | `healthcare` |
| 3 | Business Leaders | `business-leaders` |
| 4 | Finance & Economy | `finance-economy` |
| 5 | Food & Culture | `food-culture` |
| 6 | Community | `community` |
| 7 | Beauty & Wellness | `beauty-wellness` |

### Image Requirements

- Only real photo URLs from `images.unsplash.com` or `images.pexels.com`.
- Every article's `coverImage` URL must be unique across the entire site — no two articles may reuse the same image.
- Choose an image that closely matches the story's subject.

## Unlimited Article Architecture

There is no fixed or enforced total article count anywhere in the codebase. Categories may hold any number of articles — 8, 25, 50, or more — and the application (homepage sections, category listings, pagination, search, and the "related stories" logic) recalculates everything dynamically from whatever Markdown files exist in `content/articles/`. The site currently ships with sample content, but that number is a starting point, not a limit, and the public site never displays a total article count anywhere.

## Category Pagination

Each `/category/[slug]` page shows one featured article followed by up to 10 more articles per page. Pagination is server-rendered via the `?page=` query parameter (e.g. `/category/community?page=2`) and adapts automatically to however many articles exist in that category — it never assumes a fixed total.

## Date Display Rules

- Article **publication dates** appear **only** on the article detail page (`/article/[slug]`), formatted as `July 15, 2026`.
- Publication dates are intentionally omitted from the homepage, category pages, search results, related-story lists, and the Latest Stories stream.
- The masthead's edition date (e.g. "Wednesday, July 29, 2026") is generated dynamically from the current date and represents the newspaper's edition date, not any single article's publish date.

## Public Article Counts

The application never displays a total article count, a "showing X of Y" message, or per-category count badges anywhere in the public UI. Counts are only ever used internally to drive pagination math.

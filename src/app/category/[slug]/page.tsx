import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCategoryBySlug, getOrderedCategories, isValidCategorySlug } from "@/config/categories";
import { getArticlesByCategory, paginateArticles } from "@/lib/articles";
import StoryRow from "@/components/StoryRow";
import CategoryBadge from "@/components/CategoryBadge";
import Pagination from "@/components/Pagination";
import { SITE_NAME } from "@/config/site";

const PAGE_SIZE = 10;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export function generateStaticParams() {
  return getOrderedCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.label,
    description: category.intro,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${category.label} | ${SITE_NAME}`,
      description: category.intro,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  if (!isValidCategorySlug(slug)) notFound();

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const articles = getArticlesByCategory(category.slug);
  const featured = articles[0];
  const remaining = articles.slice(1);
  const result = paginateArticles(remaining, currentPage, PAGE_SIZE);

  return (
    <div>
      <section className="border-b border-[#D8E1E5] py-10" style={{ backgroundColor: category.accentSoft }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: category.accent }}>
            Section
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-[#263238] sm:text-4xl">{category.label}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#66737B]">{category.intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {featured ? (
          <article className="mb-10 border-b border-[#D8E1E5] pb-10">
            <Link
              href={`/article/${featured.slug}`}
              className="relative block aspect-[16/9] w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
                priority
              />
            </Link>
            <div className="mt-4">
              <CategoryBadge category={featured.category} />
              <h2 className="mt-2 font-serif text-2xl font-bold leading-snug text-[#263238] sm:text-3xl">
                <Link href={`/article/${featured.slug}`} className="hover:text-[#2287C9]">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-2 text-base leading-relaxed text-[#66737B]">{featured.excerpt}</p>
            </div>
          </article>
        ) : (
          <p className="text-sm text-[#66737B]">No stories are available in this section yet.</p>
        )}

        <div>
          {result.items.map((article) => (
            <StoryRow key={article.slug} article={article} />
          ))}
        </div>

        <Pagination
          currentPage={result.currentPage}
          totalPages={result.totalPages}
          basePath={`/category/${category.slug}`}
        />
      </div>
    </div>
  );
}

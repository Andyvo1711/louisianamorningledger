import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, getAllArticles, getRelatedArticles } from "@/lib/articles";
import { getCategoryBySlug } from "@/config/categories";
import { formatArticleDate } from "@/lib/dates";
import CategoryBadge from "@/components/CategoryBadge";
import RelatedStoryList from "@/components/RelatedStoryList";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage }],
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategoryBySlug(article.category);
  const related = getRelatedArticles(article, 4);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <CategoryBadge category={article.category} />
      <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#263238] sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-3 text-sm font-medium text-[#66737B]">{formatArticleDate(article.date)}</p>
      <p className="mt-4 text-lg leading-relaxed text-[#263238]">{article.excerpt}</p>

      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <p className="mt-2 text-xs text-[#66737B]">{article.imageCredit}</p>

      <div
        className="prose-article mt-8 max-w-none text-[#263238]"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      <div className="mt-10">
        <Link href={`/category/${article.category}`} className="text-sm font-semibold text-[#2287C9] hover:underline">
          ← Back to {category?.label ?? "Section"}
        </Link>
      </div>

      <RelatedStoryList articles={related} />
    </article>
  );
}

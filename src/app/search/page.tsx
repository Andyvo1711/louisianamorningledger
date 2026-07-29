import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { searchArticles } from "@/lib/search";
import { SITE_NAME } from "@/config/site";
import CategoryBadge from "@/components/CategoryBadge";
import SearchForm from "@/components/SearchForm";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: `Search ${SITE_NAME} for Louisiana news and stories.`,
    alternates: { canonical: "/search" },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchArticles(query) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-[#263238]">Search</h1>
      <SearchForm className="mt-6" defaultValue={query} id="search-page-input" />

      <div className="mt-8">
        {!query ? (
          <p className="text-sm text-[#66737B]">Enter a keyword to explore Louisiana stories.</p>
        ) : results.length === 0 ? (
          <p className="text-sm text-[#66737B]">No stories matched your search.</p>
        ) : (
          <ul className="divide-y divide-[#D8E1E5]">
            {results.map((article) => (
              <li key={article.slug} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start">
                <Link
                  href={`/article/${article.slug}`}
                  className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:w-48"
                >
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(min-width: 640px) 192px, 100vw"
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <CategoryBadge category={article.category} />
                  <h2 className="mt-2 font-serif text-lg font-semibold leading-snug text-[#263238]">
                    <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
                  <Link
                    href={`/article/${article.slug}`}
                    className="mt-2 inline-block text-sm font-semibold text-[#2287C9] hover:underline"
                  >
                    Read the story →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

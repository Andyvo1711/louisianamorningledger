import Link from "next/link";
import { getCategoryBySlug } from "@/config/categories";
import type { ArticleFrontmatter } from "@/types/article";

export default function MorningBriefing({ articles }: { articles: ArticleFrontmatter[] }) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="morning-briefing-heading" className="border-y border-[#D8E1E5] bg-[#FFF9EB] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="morning-briefing-heading"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#66737B]"
        >
          Morning Briefing
        </h2>
        <ul className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {articles.map((article) => {
            const category = getCategoryBySlug(article.category);
            return (
              <li
                key={article.slug}
                className="w-[85%] shrink-0 snap-start rounded-xl border border-[#D8E1E5] bg-white p-4 sm:w-auto"
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: category?.accent }}
                >
                  {category?.label}
                </p>
                <Link
                  href={`/article/${article.slug}`}
                  className="mt-2 block font-serif text-base font-semibold leading-snug text-[#263238] hover:text-[#2287C9]"
                >
                  {article.title}
                </Link>
                <Link
                  href={`/article/${article.slug}`}
                  className="mt-2 inline-block text-xs font-semibold text-[#2287C9]"
                >
                  Read →
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

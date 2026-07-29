import Link from "next/link";
import { getArticleLocationLabel } from "@/lib/locations";
import type { ArticleFrontmatter } from "@/types/article";

export default function CommunityNotes({ articles }: { articles: ArticleFrontmatter[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-[#3F7A63] pb-3">
        <h2 className="font-serif text-2xl font-bold text-[#263238] sm:text-3xl">Community Notes</h2>
        <Link href="/category/community" className="text-sm font-semibold text-[#2287C9] hover:underline">
          View all →
        </Link>
      </div>

      <ul className="mt-6 space-y-6">
        {articles.map((article) => (
          <li key={article.slug} className="flex gap-4">
            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#3F7A63]" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3F7A63]">
                {getArticleLocationLabel(article)}
              </p>
              <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-[#263238]">
                <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

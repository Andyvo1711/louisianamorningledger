import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import type { ArticleFrontmatter } from "@/types/article";

export default function RelatedStoryList({ articles }: { articles: ArticleFrontmatter[] }) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-stories-heading" className="mt-12 border-t border-[#D8E1E5] pt-8">
      <h2 id="related-stories-heading" className="font-serif text-2xl font-bold text-[#263238]">
        Related Stories
      </h2>
      <ul className="mt-4 divide-y divide-[#D8E1E5]">
        {articles.map((article) => (
          <li key={article.slug} className="py-4">
            <CategoryBadge category={article.category} />
            <h3 className="mt-2 font-serif text-lg font-semibold text-[#263238]">
              <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
                {article.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

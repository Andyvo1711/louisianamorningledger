import Image from "next/image";
import Link from "next/link";
import type { ArticleFrontmatter } from "@/types/article";

interface NumberedStoryListProps {
  featuredImage: ArticleFrontmatter;
  articles: ArticleFrontmatter[];
}

export default function NumberedStoryList({ featuredImage, articles }: NumberedStoryListProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-[#6B4FA1] pb-3">
        <h2 className="font-serif text-2xl font-bold text-[#263238] sm:text-3xl">Louisiana Business Desk</h2>
        <Link href="/category/business-leaders" className="text-sm font-semibold text-[#2287C9] hover:underline">
          View all →
        </Link>
      </div>

      <Link
        href={`/article/${featuredImage.slug}`}
        className="relative mt-6 block aspect-[16/7] w-full overflow-hidden rounded-2xl"
      >
        <Image src={featuredImage.coverImage} alt={featuredImage.title} fill sizes="100vw" className="object-cover" />
      </Link>

      <ol className="mt-8 divide-y divide-[#D8E1E5]">
        {articles.map((article, index) => (
          <li key={article.slug} className="flex gap-4 py-5">
            <span className="font-serif text-2xl font-bold text-[#6B4FA1]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold leading-snug text-[#263238]">
                <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

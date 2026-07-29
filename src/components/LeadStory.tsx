import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import type { ArticleFrontmatter } from "@/types/article";

export default function LeadStory({ article }: { article: ArticleFrontmatter }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={`/article/${article.slug}`}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[16/9] lg:aspect-[21/9]"
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          <CategoryBadge category={article.category} asLink={false} />
          <h2 className="mt-3 max-w-3xl font-serif text-2xl font-bold leading-tight text-white sm:text-4xl">
            {article.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">{article.excerpt}</p>
        </div>
      </Link>
      <Link
        href={`/article/${article.slug}`}
        className="mt-4 inline-block text-sm font-semibold text-[#2287C9] hover:underline"
      >
        Read the Lead Story →
      </Link>
    </section>
  );
}

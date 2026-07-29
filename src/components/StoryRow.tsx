import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import type { ArticleFrontmatter } from "@/types/article";

interface StoryRowProps {
  article: ArticleFrontmatter;
  priority?: boolean;
}

export default function StoryRow({ article, priority = false }: StoryRowProps) {
  return (
    <article className="flex flex-col gap-4 border-b border-[#D8E1E5] py-6 last:border-b-0 sm:flex-row sm:items-start">
      <Link
        href={`/article/${article.slug}`}
        className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:w-[35%]"
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(min-width: 640px) 35vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </Link>
      <div className="flex-1">
        <CategoryBadge category={article.category} />
        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-[#263238]">
          <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
        <Link
          href={`/article/${article.slug}`}
          className="mt-3 inline-block text-sm font-semibold text-[#2287C9] hover:underline"
        >
          Read the story →
        </Link>
      </div>
    </article>
  );
}

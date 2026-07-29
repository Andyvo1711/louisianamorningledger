import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import type { ArticleFrontmatter } from "@/types/article";

interface WellnessJournalProps {
  feature: ArticleFrontmatter;
  rows: ArticleFrontmatter[];
}

export default function WellnessJournal({ feature, rows }: WellnessJournalProps) {
  return (
    <section className="bg-[#DDF2E7]/40 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-[#F47C65] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#263238] sm:text-3xl">Beauty and Wellness Journal</h2>
          <Link href="/category/beauty-wellness" className="text-sm font-semibold text-[#2287C9] hover:underline">
            View all →
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm sm:flex sm:items-stretch">
          <Link
            href={`/article/${feature.slug}`}
            className="relative block aspect-[16/9] w-full sm:aspect-auto sm:w-1/2"
          >
            <Image
              src={feature.coverImage}
              alt={feature.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </Link>
          <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
            <CategoryBadge category={feature.category} />
            <h3 className="mt-2 font-serif text-2xl font-bold leading-snug text-[#263238]">
              <Link href={`/article/${feature.slug}`} className="hover:text-[#2287C9]">
                {feature.title}
              </Link>
            </h3>
            <p className="mt-2 text-base leading-relaxed text-[#66737B]">{feature.excerpt}</p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {rows.map((article, index) => (
            <article
              key={article.slug}
              className={`sm:flex sm:items-center sm:gap-8 ${index % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
            >
              <Link
                href={`/article/${article.slug}`}
                className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl sm:w-1/2"
              >
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </Link>
              <div className="mt-4 sm:mt-0 sm:w-1/2">
                <h3 className="font-serif text-xl font-semibold leading-snug text-[#263238]">
                  <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

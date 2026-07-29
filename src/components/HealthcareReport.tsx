import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import type { ArticleFrontmatter } from "@/types/article";

interface HealthcareReportProps {
  primary: ArticleFrontmatter;
  medium: ArticleFrontmatter[];
  textLinks: ArticleFrontmatter[];
}

export default function HealthcareReport({ primary, medium, textLinks }: HealthcareReportProps) {
  return (
    <section className="bg-[#DDF2E7]/50 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-[#3F7A63] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#263238] sm:text-3xl">Healthcare Report</h2>
          <Link href="/category/healthcare" className="text-sm font-semibold text-[#2287C9] hover:underline">
            View all →
          </Link>
        </div>

        <article className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <Link href={`/article/${primary.slug}`} className="relative block aspect-[16/9] w-full">
            <Image src={primary.coverImage} alt={primary.title} fill sizes="100vw" className="object-cover" />
          </Link>
          <div className="p-6 sm:p-8">
            <CategoryBadge category={primary.category} />
            <h3 className="mt-2 font-serif text-2xl font-bold leading-snug text-[#263238]">
              <Link href={`/article/${primary.slug}`} className="hover:text-[#2287C9]">
                {primary.title}
              </Link>
            </h3>
            <p className="mt-2 text-base leading-relaxed text-[#66737B]">{primary.excerpt}</p>
          </div>
        </article>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {medium.map((article) => (
            <article key={article.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <Link href={`/article/${article.slug}`} className="relative block aspect-[16/10] w-full">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </Link>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold leading-snug text-[#263238]">
                  <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        {textLinks.length > 0 ? (
          <ul className="mt-8 space-y-3 border-t border-[#D8E1E5] pt-6">
            {textLinks.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/article/${article.slug}`}
                  className="font-serif text-base font-semibold text-[#263238] hover:text-[#2287C9]"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

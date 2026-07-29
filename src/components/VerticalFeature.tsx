import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import type { ArticleFrontmatter, CategoryConfig } from "@/types/article";

interface VerticalFeatureProps {
  sectionTitle: string;
  lead: ArticleFrontmatter;
  supporting: ArticleFrontmatter[];
  category: CategoryConfig;
}

export default function VerticalFeature({ sectionTitle, lead, supporting, category }: VerticalFeatureProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between gap-4 border-b-2 pb-3" style={{ borderColor: category.accent }}>
        <h2 className="font-serif text-2xl font-bold text-[#263238] sm:text-3xl">{sectionTitle}</h2>
        <Link href={`/category/${category.slug}`} className="text-sm font-semibold text-[#2287C9] hover:underline">
          View all →
        </Link>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#66737B]">{category.intro}</p>

      <div className="mt-6">
        <Link href={`/article/${lead.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image src={lead.coverImage} alt={lead.title} fill sizes="100vw" className="object-cover" />
        </Link>
        <div className="mt-4 max-w-3xl">
          <CategoryBadge category={lead.category} />
          <h3 className="mt-2 font-serif text-2xl font-bold leading-snug text-[#263238]">
            <Link href={`/article/${lead.slug}`} className="hover:text-[#2287C9]">
              {lead.title}
            </Link>
          </h3>
          <p className="mt-2 text-base leading-relaxed text-[#66737B]">{lead.excerpt}</p>
        </div>
      </div>

      {supporting.length > 0 ? (
        <ul className="mt-8 grid gap-6 border-t border-[#D8E1E5] pt-6 sm:grid-cols-3">
          {supporting.map((article) => (
            <li key={article.slug}>
              <h4 className="font-serif text-base font-semibold leading-snug text-[#263238]">
                <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
                  {article.title}
                </Link>
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

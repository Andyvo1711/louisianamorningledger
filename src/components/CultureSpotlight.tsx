import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import type { ArticleFrontmatter } from "@/types/article";

interface CultureSpotlightProps {
  feature: ArticleFrontmatter;
  secondary: ArticleFrontmatter[];
}

export default function CultureSpotlight({ feature, secondary }: CultureSpotlightProps) {
  return (
    <section className="bg-[#FFF9EB] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-[#FFD75A] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#263238] sm:text-3xl">Food and Culture Spotlight</h2>
          <Link href="/category/food-culture" className="text-sm font-semibold text-[#2287C9] hover:underline">
            View all →
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl">
          <Link href={`/article/${feature.slug}`} className="group relative block aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={feature.coverImage}
              alt={feature.title}
              fill
              sizes="100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <CategoryBadge category={feature.category} asLink={false} />
              <h3 className="mt-2 max-w-2xl font-serif text-2xl font-bold text-white sm:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">{feature.excerpt}</p>
            </div>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {secondary.map((article) => (
            <article key={article.slug} className="rounded-2xl border border-[#FFD75A]/60 bg-white p-5">
              <h3 className="font-serif text-lg font-semibold leading-snug text-[#263238]">
                <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

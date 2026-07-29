import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/CategoryBadge";
import type { ArticleFrontmatter } from "@/types/article";

export default function EditorialColumns({ articles }: { articles: ArticleFrontmatter[] }) {
  const columns: ArticleFrontmatter[][] = [[], [], []];
  articles.forEach((article, index) => {
    columns[index % 3].push(article);
  });

  return (
    <section className="bg-[#FDE7E2]/40 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-[#F47C65] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#263238] sm:text-3xl">Markets and Economy</h2>
          <Link href="/category/finance-economy" className="text-sm font-semibold text-[#2287C9] hover:underline">
            View all →
          </Link>
        </div>

        <div className="mt-6 grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-8">
              {column.map((article) => (
                <article key={article.slug}>
                  <Link
                    href={`/article/${article.slug}`}
                    className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl"
                  >
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </Link>
                  <div className="mt-3">
                    <CategoryBadge category={article.category} />
                    <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-[#263238]">
                      <Link href={`/article/${article.slug}`} className="hover:text-[#2287C9]">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#66737B]">{article.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

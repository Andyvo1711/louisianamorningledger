import StoryRow from "@/components/StoryRow";
import Pagination from "@/components/Pagination";
import type { ArticleFrontmatter, PaginatedResult } from "@/types/article";

interface LatestStoryStreamProps {
  result: PaginatedResult<ArticleFrontmatter>;
  basePath: string;
}

export default function LatestStoryStream({ result, basePath }: LatestStoryStreamProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-[#2287C9] pb-3">
        <h2 className="font-serif text-2xl font-bold text-[#263238] sm:text-3xl">Latest Stories</h2>
      </div>

      {result.items.length === 0 ? (
        <p className="mt-6 text-sm text-[#66737B]">No stories are available right now.</p>
      ) : (
        <div className="mt-2">
          {result.items.map((article) => (
            <StoryRow key={article.slug} article={article} />
          ))}
        </div>
      )}

      <Pagination currentPage={result.currentPage} totalPages={result.totalPages} basePath={basePath} />
    </section>
  );
}

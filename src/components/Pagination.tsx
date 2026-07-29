import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function buildHref(basePath: string, page: number): string {
  const [pathname, existingQuery] = basePath.split("?");
  const params = new URLSearchParams(existingQuery);
  if (page > 1) {
    params.set("page", String(page));
  } else {
    params.delete("page");
  }
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevHref = currentPage > 1 ? buildHref(basePath, currentPage - 1) : null;
  const nextHref = currentPage < totalPages ? buildHref(basePath, currentPage + 1) : null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between gap-4 border-t border-[#D8E1E5] pt-6"
    >
      {prevHref ? (
        <Link
          href={prevHref}
          className="rounded-full border border-[#D8E1E5] px-4 py-2 text-sm font-semibold text-[#263238] transition hover:border-[#2287C9] hover:text-[#2287C9]"
        >
          ← Previous
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      <span className="text-sm text-[#66737B]">
        Page {currentPage} of {totalPages}
      </span>
      {nextHref ? (
        <Link
          href={nextHref}
          className="rounded-full border border-[#D8E1E5] px-4 py-2 text-sm font-semibold text-[#263238] transition hover:border-[#2287C9] hover:text-[#2287C9]"
        >
          Next →
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}

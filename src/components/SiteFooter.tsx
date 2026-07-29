import Link from "next/link";
import { SITE_NAME, SITE_SUPPORTING_LINE } from "@/config/site";
import { getOrderedCategories } from "@/config/categories";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D8E1E5] bg-[#FFF9EB]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl font-bold text-[#263238]">{SITE_NAME}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#66737B]">{SITE_SUPPORTING_LINE}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#263238]">Categories</p>
            <ul className="mt-3 space-y-2 text-sm">
              {getOrderedCategories().map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="text-[#66737B] hover:text-[#2287C9]">
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#263238]">More</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-[#66737B] hover:text-[#2287C9]">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[#D8E1E5] pt-6 text-xs leading-relaxed text-[#66737B]">
          <p>&copy; {year} {SITE_NAME}. All rights reserved.</p>
          <p className="mt-2 max-w-2xl">
            Louisiana Morning Ledger is an independent editorial publication produced for demonstration
            purposes. Business Leaders profiles and select community features describe fictional
            individuals and companies for illustrative purposes and should not be read as reporting on
            real people or businesses unless a story states otherwise.
          </p>
        </div>
      </div>
    </footer>
  );
}

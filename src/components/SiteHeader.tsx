import Link from "next/link";
import { SITE_NAME } from "@/config/site";
import { getOrderedCategories } from "@/config/categories";
import NavLinks from "@/components/NavLinks";
import MobileNavigation from "@/components/MobileNavigation";
import SearchForm from "@/components/SearchForm";

export default function SiteHeader() {
  const navItems = [
    { label: "Home", href: "/" },
    ...getOrderedCategories().map((category) => ({
      label: category.label,
      href: `/category/${category.slug}`,
    })),
  ];

  return (
    <header className="relative border-b border-[#D8E1E5] bg-[#FFF9EB]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#263238] sm:text-3xl">
          {SITE_NAME}
        </Link>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-6">
          <NavLinks navItems={navItems} />
          <SearchForm className="w-72" />
        </div>

        <MobileNavigation navItems={navItems} />
      </div>
    </header>
  );
}

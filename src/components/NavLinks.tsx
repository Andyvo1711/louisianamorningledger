"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/site";

export default function NavLinks({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-wrap items-center gap-5 text-sm font-semibold">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-sm transition hover:text-[#2287C9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2287C9]/50 ${
                  isActive ? "text-[#2287C9]" : "text-[#263238]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import type { NavItem } from "@/config/site";

export default function MobileNavigation({ navItems }: { navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-full border border-[#D8E1E5] p-2 text-[#263238] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2287C9]/50"
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        {isOpen ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        id="mobile-nav-panel"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#D8E1E5] bg-white px-4 py-4 shadow-lg"
      >
        <SearchForm className="mb-4" id="mobile-search" />
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-[#263238] hover:bg-[#D9F1FF]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

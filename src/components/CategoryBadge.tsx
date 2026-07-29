import Link from "next/link";
import { getCategoryBySlug } from "@/config/categories";
import type { CategorySlug } from "@/types/article";

interface CategoryBadgeProps {
  category: CategorySlug;
  className?: string;
  /** Set to false when this badge is nested inside another <a>, to avoid invalid nested anchors. */
  asLink?: boolean;
}

export default function CategoryBadge({ category, className = "", asLink = true }: CategoryBadgeProps) {
  const config = getCategoryBySlug(category);
  if (!config) return null;

  const badgeClassName = `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition hover:opacity-80 ${className}`;
  const badgeStyle = { backgroundColor: config.accentSoft, color: config.accent };

  if (!asLink) {
    return (
      <span className={badgeClassName} style={badgeStyle}>
        {config.label}
      </span>
    );
  }

  return (
    <Link href={`/category/${config.slug}`} className={badgeClassName} style={badgeStyle}>
      {config.label}
    </Link>
  );
}

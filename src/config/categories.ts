import type { CategoryConfig, CategorySlug } from "@/types/article";

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "education",
    label: "Education",
    order: 1,
    intro:
      "Classrooms, campuses, and workforce training from across Louisiana, tracking how students and educators are preparing for what comes next.",
    accent: "#2287C9",
    accentSoft: "#D9F1FF",
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    order: 2,
    intro:
      "Hospitals, clinics, and public health efforts working to keep Louisiana communities well, from the coast to the piney hills.",
    accent: "#3F7A63",
    accentSoft: "#DDF2E7",
  },
  {
    slug: "business-leaders",
    label: "Business Leaders",
    order: 3,
    intro:
      "The entrepreneurs and executives building companies and careers in every corner of the state.",
    accent: "#6B4FA1",
    accentSoft: "#EDE7F6",
  },
  {
    slug: "finance-economy",
    label: "Finance & Economy",
    order: 4,
    intro:
      "Ports, industry, and household finance — the economic currents shaping Louisiana's future.",
    accent: "#F47C65",
    accentSoft: "#FDE7E2",
  },
  {
    slug: "food-culture",
    label: "Food & Culture",
    order: 5,
    intro:
      "Kitchens, music venues, and festival grounds where Louisiana's culture is cooked, played, and celebrated.",
    accent: "#FFD75A",
    accentSoft: "#FFF9EB",
  },
  {
    slug: "community",
    label: "Community",
    order: 6,
    intro:
      "Neighbors, nonprofits, and local government at work in the towns and parishes that make up Louisiana.",
    accent: "#3F7A63",
    accentSoft: "#DDF2E7",
  },
  {
    slug: "beauty-wellness",
    label: "Beauty & Wellness",
    order: 7,
    intro:
      "Salons, studios, and wellness practices helping Louisianans look and feel their best in every season.",
    accent: "#F47C65",
    accentSoft: "#FDE7E2",
  },
];

const CATEGORY_SLUGS = new Set<string>(CATEGORIES.map((c) => c.slug));

export function isValidCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORY_SLUGS.has(slug);
}

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getOrderedCategories(): CategoryConfig[] {
  return [...CATEGORIES].sort((a, b) => a.order - b.order);
}

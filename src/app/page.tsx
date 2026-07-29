import type { Metadata } from "next";
import {
  getAllArticles,
  getArticlesByCategory,
  getFeaturedArticles,
  paginateArticles,
} from "@/lib/articles";
import { getCategoryBySlug } from "@/config/categories";
import { SITE_NAME, SITE_DESCRIPTION } from "@/config/site";
import MorningMasthead from "@/components/MorningMasthead";
import LeadStory from "@/components/LeadStory";
import MorningBriefing from "@/components/MorningBriefing";
import VerticalFeature from "@/components/VerticalFeature";
import HealthcareReport from "@/components/HealthcareReport";
import NumberedStoryList from "@/components/NumberedStoryList";
import EditorialColumns from "@/components/EditorialColumns";
import CultureSpotlight from "@/components/CultureSpotlight";
import CommunityNotes from "@/components/CommunityNotes";
import WellnessJournal from "@/components/WellnessJournal";
import LatestStoryStream from "@/components/LatestStoryStream";
import NewsletterCallout from "@/components/NewsletterCallout";

export const metadata: Metadata = {
  title: `${SITE_NAME} | A Fresh Read on Louisiana Life`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const LATEST_PAGE_SIZE = 8;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const allArticles = getAllArticles();
  const featured = getFeaturedArticles();
  const leadStory = featured[0] ?? allArticles[0];

  const briefingArticles = allArticles.filter((a) => a.slug !== leadStory?.slug).slice(0, 4);

  const education = getArticlesByCategory("education");
  const healthcare = getArticlesByCategory("healthcare");
  const business = getArticlesByCategory("business-leaders");
  const finance = getArticlesByCategory("finance-economy");
  const foodCulture = getArticlesByCategory("food-culture");
  const community = getArticlesByCategory("community");
  const wellness = getArticlesByCategory("beauty-wellness");

  const educationCategory = getCategoryBySlug("education");
  const latestResult = paginateArticles(allArticles, currentPage, LATEST_PAGE_SIZE);

  return (
    <>
      <MorningMasthead />

      {leadStory ? <LeadStory article={leadStory} /> : null}

      <MorningBriefing articles={briefingArticles} />

      {education.length > 0 && educationCategory ? (
        <VerticalFeature
          sectionTitle="Education Edition"
          lead={education[0]}
          supporting={education.slice(1, 4)}
          category={educationCategory}
        />
      ) : null}

      {healthcare.length > 0 ? (
        <HealthcareReport
          primary={healthcare[0]}
          medium={healthcare.slice(1, 3)}
          textLinks={healthcare.slice(3, 6)}
        />
      ) : null}

      {business.length > 0 ? (
        <NumberedStoryList featuredImage={business[0]} articles={business.slice(1, 5)} />
      ) : null}

      {finance.length > 0 ? <EditorialColumns articles={finance.slice(0, 6)} /> : null}

      {foodCulture.length > 0 ? (
        <CultureSpotlight feature={foodCulture[0]} secondary={foodCulture.slice(1, 3)} />
      ) : null}

      {community.length > 0 ? <CommunityNotes articles={community.slice(0, 5)} /> : null}

      {wellness.length > 0 ? (
        <WellnessJournal feature={wellness[0]} rows={wellness.slice(1, 3)} />
      ) : null}

      <LatestStoryStream result={latestResult} basePath="/" />

      <NewsletterCallout />
    </>
  );
}

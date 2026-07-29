const ARTICLE_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const EDITION_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatArticleDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return dateString;
  return ARTICLE_DATE_FORMATTER.format(date);
}

export function formatEditionDate(date: Date = new Date()): string {
  return EDITION_DATE_FORMATTER.format(date);
}

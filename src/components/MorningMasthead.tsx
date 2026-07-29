import { SITE_TAGLINE, SITE_SUPPORTING_LINE } from "@/config/site";
import { formatEditionDate } from "@/lib/dates";

export default function MorningMasthead() {
  return (
    <section className="border-b border-[#D8E1E5] bg-gradient-to-b from-[#D9F1FF] to-[#FFF9EB] py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2287C9]">
          {formatEditionDate()} Edition
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#263238] sm:text-5xl">
          {SITE_TAGLINE}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#66737B]">
          {SITE_SUPPORTING_LINE}
        </p>
      </div>
    </section>
  );
}

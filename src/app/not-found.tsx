import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2287C9]">404</p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-[#263238] sm:text-4xl">This Story Has Moved</h1>
      <p className="mt-4 text-base leading-relaxed text-[#66737B]">
        The page you requested may have been updated, archived, or removed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-[#2287C9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1b6ca3]"
      >
        Return to the Morning Edition
      </Link>
    </div>
  );
}

interface SearchFormProps {
  className?: string;
  defaultValue?: string;
  id?: string;
}

export default function SearchForm({ className = "", defaultValue = "", id }: SearchFormProps) {
  const inputId = id ?? "site-search";

  return (
    <form action="/search" method="GET" role="search" className={className}>
      <label htmlFor={inputId} className="sr-only">
        Search Louisiana Morning Ledger
      </label>
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Search..."
          className="w-full min-w-0 flex-1 rounded-full border border-[#D8E1E5] bg-white px-4 py-2 text-sm text-[#263238] placeholder:text-[#66737B] focus:border-[#2287C9] focus:outline-none focus:ring-2 focus:ring-[#2287C9]/40"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-[#2287C9] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1b6ca3] focus:outline-none focus:ring-2 focus:ring-[#2287C9]/50"
        >
          Search
        </button>
      </div>
    </form>
  );
}

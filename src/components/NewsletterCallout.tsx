"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterCallout() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-[#2287C9] py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
          Start Your Morning with Louisiana
        </h2>
        <p className="mt-3 text-base text-[#D9F1FF]">
          A clear, thoughtful look at the stories shaping communities across the state.
        </p>

        {submitted ? (
          <p
            role="status"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2287C9]"
          >
            Thanks for your interest. Newsletter delivery is not connected yet.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full border-0 px-5 py-3 text-sm text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#FFD75A] sm:w-80"
            />
            <button
              type="submit"
              className="rounded-full bg-[#FFD75A] px-6 py-3 text-sm font-semibold text-[#263238] transition hover:bg-[#f5c93f] focus:outline-none focus:ring-2 focus:ring-white"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

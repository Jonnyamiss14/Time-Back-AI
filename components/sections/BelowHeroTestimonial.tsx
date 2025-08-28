"use client"

import { useEffect } from "react"

function useRevealOnce() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]")
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0")
            e.target.classList.remove("opacity-0", "translate-y-2")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.2 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function BelowHeroTestimonial() {
  useRevealOnce()

  return (
    <section
      id="praise"
      aria-labelledby="praise-title"
      className="relative isolate overflow-visible bg-[var(--bg-hero)]"
    >
      <h2 id="praise-title" className="sr-only">
        Client testimonial
      </h2>

      {/* Cove divider (subtle, current trend) */}
      <div className="absolute -top-6 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 48" className="w-full h-12 fill-[rgba(255,255,255,0.04)]">
          <path d="M0,48 C320,6 1120,6 1440,48 L1440,48 L0,48 Z"></path>
        </svg>
      </div>

      {/* Content container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-12 pb-16 md:pb-20">
        {/* Radial glow behind cards */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background: "radial-gradient(60% 40% at 50% 10%, rgba(16,163,154,0.10) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        {/* Two-column grid: stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 items-stretch">
          {/* Testimonial A (existing) */}
          <figure
            data-reveal
            className="rounded-2xl bg-[var(--bg-elev)]/95 border border-white/10
                       shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.35)]
                       backdrop-blur-[2px] px-5 py-5 md:px-7 md:py-7
                       opacity-0 translate-y-2 transition duration-300 ease-out h-full"
          >
            <div className="flex items-start gap-3">
              <svg aria-hidden="true" className="mt-1 h-5 w-5 text-white/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 7c0 3-2 5-4 6v4h6V7h-2Zm10 0c0 3-2 5-4 6v4h6V7h-2Z" />
              </svg>
              <div>
                <blockquote className="text-white/90 text-base md:text-lg leading-7 text-balance">
                  "Jonny did more to get my team thinking about <span className="font-medium">owning problems</span> and
                  coming up with solutions using AI in <span className="font-medium">one hour</span> than I could have
                  achieved in a couple of months."
                </blockquote>
                <figcaption className="mt-3 text-sm text-white/65">
                  — <span className="font-medium">Operations Lead</span>
                </figcaption>
              </div>
            </div>
          </figure>

          {/* Testimonial B (new, adjacent & symmetric) */}
          <figure
            data-reveal
            className="rounded-2xl bg-[var(--bg-elev)]/95 border border-white/10
                       shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.35)]
                       backdrop-blur-[2px] px-5 py-5 md:px-7 md:py-7
                       opacity-0 translate-y-2 transition duration-300 ease-out h-full"
          >
            <div className="flex items-start gap-3">
              <svg aria-hidden="true" className="mt-1 h-5 w-5 text-white/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 7c0 3-2 5-4 6v4h6V7h-2Zm10 0c0 3-2 5-4 6v4h6V7h-2Z" />
              </svg>
              <div>
                <blockquote className="text-white/90 text-base md:text-lg leading-7 text-balance">
                  "Jonny explained AI in a really useful and interactive way—better than I'd ever had it explained
                  before. It's changed my view of AI for the better and made me more efficient in my job."
                </blockquote>
                <figcaption className="mt-3 text-sm text-white/65">
                  — <span className="font-medium">Caseworker</span>
                </figcaption>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}

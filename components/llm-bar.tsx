interface LLMBarProps {
  variant?: "default" | "compact"
}

export function LLMBar({ variant = "default" }: LLMBarProps) {
  return (
    <section
      aria-labelledby="llmbar-title"
      className="bg-[var(--sand-50)] border-b border-[var(--gray-200)] dark:bg-[var(--evergreen-800)] dark:border-[var(--gray-700)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Heading */}
          <div className="lg:max-w-[36ch]">
            <h2 id="llmbar-title" className="text-sm font-medium text-[var(--gray-700)] dark:text-white/80">
              Training with the following LLMs that meet your software and technology needs.
            </h2>
          </div>

          {/* LLM Icons */}
          <div className="grid grid-cols-3 gap-4 lg:flex lg:gap-0">
            {/* Microsoft Copilot */}
            <figure className="flex items-center gap-3 lg:px-6 lg:border-l lg:border-[var(--gray-200)] dark:lg:border-[var(--gray-700)] lg:first:border-l-0 group transition-transform duration-200 hover:translate-y-[-1px] hover:opacity-100 motion-reduce:transform-none">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
                className="h-10 w-10 text-[var(--gray-600)] dark:text-white/70"
              >
                <path d="M12 3 L19 8.5 L12 14 L5 8.5 Z" />
                <path d="M7 16 H17" />
                <path d="M9 19 H15" />
              </svg>
              <figcaption className="text-sm font-medium text-[var(--gray-700)] dark:text-white/80">
                Microsoft Copilot
              </figcaption>
            </figure>

            {/* Google Gemini */}
            <figure className="flex items-center gap-3 lg:px-6 lg:border-l lg:border-[var(--gray-200)] dark:lg:border-[var(--gray-700)] group transition-transform duration-200 hover:translate-y-[-1px] hover:opacity-100 motion-reduce:transform-none">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
                className="h-10 w-10 text-[var(--gray-600)] dark:text-white/70"
              >
                <path d="M12 4 C 13.2 7.2, 16.8 10.8, 20 12 C 16.8 13.2, 13.2 16.8, 12 20 C 10.8 16.8, 7.2 13.2, 4 12 C 7.2 10.8, 10.8 7.2, 12 4 Z" />
              </svg>
              <figcaption className="text-sm font-medium text-[var(--gray-700)] dark:text-white/80">
                Google Gemini
              </figcaption>
            </figure>

            {/* ChatGPT */}
            <figure className="flex items-center gap-3 lg:px-6 lg:border-l lg:border-[var(--gray-200)] dark:lg:border-[var(--gray-700)] group transition-transform duration-200 hover:translate-y-[-1px] hover:opacity-100 motion-reduce:transform-none">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
                className="h-10 w-10 text-[var(--gray-600)] dark:text-white/70"
              >
                <g transform="rotate(0 12 12)">
                  <path d="M12 6 A6 6 0 0 1 18 12 V14 A6 6 0 0 1 12 20" />
                </g>
                <g transform="rotate(60 12 12)">
                  <path d="M12 6 A6 6 0 0 1 18 12 V14 A6 6 0 0 1 12 20" />
                </g>
                <g transform="rotate(120 12 12)">
                  <path d="M12 6 A6 6 0 0 1 18 12 V14 A6 6 0 0 1 12 20" />
                </g>
                <g transform="rotate(180 12 12)">
                  <path d="M12 6 A6 6 0 0 1 18 12 V14 A6 6 0 0 1 12 20" />
                </g>
                <g transform="rotate(240 12 12)">
                  <path d="M12 6 A6 6 0 0 1 18 12 V14 A6 6 0 0 1 12 20" />
                </g>
                <g transform="rotate(300 12 12)">
                  <path d="M12 6 A6 6 0 0 1 18 12 V14 A6 6 0 0 1 12 20" />
                </g>
              </svg>
              <figcaption className="text-sm font-medium text-[var(--gray-700)] dark:text-white/80">ChatGPT</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

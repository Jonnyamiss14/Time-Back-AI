"use client"

import { Navigation } from "@/components/navigation"
import { LLMBar } from "@/components/llm-bar"
import { Footer } from "@/components/footer"
import { EmailInlineForm } from "@/components/email-inline-form"
import { EmailPopup } from "@/components/email-popup"
import BelowHeroTestimonial from "@/components/sections/BelowHeroTestimonial"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Calendar, UserCheck, Target, Ear, Lightbulb, BarChart3, Play } from "lucide-react"

export default function HomePage() {
  const handleCalendlyClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "calendly_click", {
        page: window.location.pathname,
        section: "hero",
      })
    }
  }

  const whatWeDeliver = [
    {
      icon: Calendar,
      title: "SLT Strategy Day",
      description: "Align goals, map use-cases, pick quick wins.",
    },
    {
      icon: UserCheck,
      title: "Train-the-Trainer",
      description: "Champions toolkit & cascade plan.",
    },
    {
      icon: Target,
      title: "Advisor Accelerator",
      description: "Job-app workflow & evidence packs.",
    },
  ]

  const howItWorks = [
    {
      icon: Ear,
      title: "Listen",
      description: "We understand your specific challenges and frontline needs.",
    },
    {
      icon: Lightbulb,
      title: "Design",
      description: "Create bespoke solutions aligned with your outcomes.",
    },
    {
      icon: BarChart3,
      title: "Embed & Measure",
      description: "Implement with ongoing support and impact measurement.",
    },
  ]

  const testimonials = [
    {
      quote: "Jonny got our team owning problems in an hour.",
      author: "Ops Manager, Prime",
    },
    {
      quote: "Practical. Human. Immediate time savings.",
      author: "Assistant Head, MAT",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <LLMBar />

      {/* Hero Section - Dark Evergreen Backdrop */}
      <section className="py-20 lg:py-32 bg-evergreen-700 hero-pattern relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="display-hero text-white mb-6 text-balance">AI that gives staff time back.</h1>
              <p className="body-lead text-white/85 mb-8 max-w-[52ch]">
                Bespoke, human-centred training for schools and employment services — designed by someone who's done the
                job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#10A39A] hover:bg-[#0D867F] text-white button-text px-8 py-3"
                  onClick={handleCalendlyClick}
                  asChild
                >
                  <a
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Book 30-min discovery call
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 hover:text-white button-text px-8 py-3 bg-transparent"
                  asChild
                >
                  <a href="/contact">Contact</a>
                </Button>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 dark:border-white/10 light:border-[var(--gray-200)]">
                <img
                  src="/placeholder.svg?height=400&width=600&text=AI+Training+Dashboard"
                  alt="TimeBack AI training dashboard mockup"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BelowHeroTestimonial />

      {/* Who We Help Section */}
      <section aria-labelledby="who-we-help" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h2 id="who-we-help" className="heading-xl text-center">
            Who we help
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <article
              className="group relative rounded-2xl border shadow-sm transition
                         hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5
                         ring-0 focus-within:ring-2 focus-within:ring-[var(--teal)]/40"
              style={{
                background: "linear-gradient(180deg,#F3FBF9 0%,#FFFFFF 65%)",
                borderColor: "#BFECE3",
              }}
              aria-labelledby="schools-title"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-[.05]"
                style={{
                  backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                  color: "#10A39A",
                }}
              />
              <div className="relative p-6 md:p-8">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: "#E8FAF4" }}
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" style={{ color: "#10A39A" }} aria-hidden="true">
                    <path d="M12 3 2 8l10 5 9-4.5V14h2V8L12 3Zm-7 9v4.5l7 3.5 7-3.5V12l-7 3.5L5 12Z" />
                  </svg>
                </div>

                <h3 id="schools-title" className="heading-lg mt-4">
                  Schools
                </h3>
                <p className="body-lead mt-1 text-[var(--gray-700)]">
                  Cut planning/admin time and raise lesson consistency.
                </p>

                <ul className="mt-4 space-y-2 text-[var(--gray-700)]">
                  <li>45–90 mins saved per teacher per week</li>
                  <li>Ofsted-aware workflows & safe AI use with pupils</li>
                  <li>Better parent comms & differentiated resources</li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-white/70 px-3 py-1 text-[var(--gray-600)]">
                    Tool-agnostic: Copilot • ChatGPT • Gemini
                  </span>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-[var(--gray-600)]">
                    Policy pack included
                  </span>
                </div>

                <div className="mt-6">
                  <a
                    href="/schools"
                    className="button-text inline-flex items-center rounded-lg bg-[var(--teal)] px-4 py-2.5 text-white"
                  >
                    Schools training
                  </a>
                </div>
              </div>
            </article>

            <article
              className="group relative rounded-2xl border shadow-sm transition
                         hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5
                         ring-0 focus-within:ring-2 focus-within:ring-[var(--teal)]/40"
              style={{
                background: "linear-gradient(180deg,#F3F7FF 0%,#FFFFFF 65%)",
                borderColor: "#CFE1FF",
              }}
              aria-labelledby="employment-title"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-[.05]"
                style={{
                  backgroundImage: "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 9px)",
                  color: "#2563EB",
                }}
              />
              <div className="relative p-6 md:p-8">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: "#ECF3FF" }}
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" style={{ color: "#2563EB" }} aria-hidden="true">
                    <path d="M12 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 12 12Zm-7 8a6.5 6.5 0 0 1 13 0H4.5Zm13.75-10.25a2.75 2.75 0 1 0-2.75-2.75 2.75 2.75 0 0 0 2.75 2.75Zm1.75 10.25a5.75 5.75 0 0 0-5.06-5.7 7.47 7.47 0 0 1 2.31-1.05 5 5 0 0 1 2.75.55 5.75 5.75 0 0 1 2.5 6.2Z" />
                  </svg>
                </div>

                <h3 id="employment-title" className="heading-lg mt-4">
                  Employment teams
                </h3>
                <p className="body-lead mt-1 text-[var(--gray-700)]">
                  Increase application quality and evidence—without extra headcount.
                </p>

                <ul className="mt-4 space-y-2 text-[var(--gray-700)]">
                  <li>Faster, better cover letters & evidence packs</li>
                  <li>DWP-safe workflows; bias & safeguarding checks</li>
                  <li>Prompt libraries for low-confidence clients</li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-white/70 px-3 py-1 text-[var(--gray-600)]">
                    Works with: MS 365 • Google • in-house tools
                  </span>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-[var(--gray-600)]">
                    Change-management toolkit
                  </span>
                </div>

                <div className="mt-6">
                  <a
                    href="/employment"
                    className="button-text inline-flex items-center rounded-lg bg-[var(--teal)] px-4 py-2.5 text-white"
                  >
                    Employment training
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* What We Deliver Section */}
      <section className="py-20 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-xl text-gray-900 mb-4">What we deliver</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whatWeDeliver.map((item, index) => (
              <Card key={index} className="card-soft-shadow border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#10A39A] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="heading-lg text-gray-900 mb-3">{item.title}</h3>
                  <p className="body-default text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-xl text-gray-900 mb-4">How it works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#10A39A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="heading-lg text-gray-900 mb-3">{step.title}</h3>
                <p className="body-default text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Short Demo Video */}
      <section className="py-20 bg-sand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-xl text-gray-900 mb-8">See it in action</h2>
            <div className="relative bg-gray-200 rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#10A39A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
                <p className="text-gray-600">60-90s demo video placeholder</p>
                <p className="text-sm text-gray-500 mt-2">Click to play • Transcript available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Feature Band - Social Proof */}
      <section className="py-20 bg-evergreen-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-xl text-white mb-4">What people say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <blockquote className="text-white text-lg mb-4">"{testimonial.quote}"</blockquote>
                  <cite className="text-white/80 text-sm">— {testimonial.author}</cite>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from Blog + Inline Email Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-xl text-gray-900 mb-4">Latest from the blog</h2>
              <p className="body-default text-gray-600">Insights and practical tips for AI implementation</p>
            </div>

            {/* Placeholder for blog posts */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="card-soft-shadow border-0">
                  <CardContent className="p-6">
                    <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-semibold mb-2">Blog Post Title {i}</h3>
                    <p className="text-sm text-gray-600 mb-3">Brief description of the blog post content...</p>
                    <p className="text-xs text-gray-500">5 min read</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <h3 className="heading-lg text-gray-900 mb-4">Get new posts & demos</h3>
              <EmailInlineForm source="inline_home" className="max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Bar */}
      <section className="py-16 bg-sand-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="heading-lg text-gray-900 mb-6">Ready to give your team time back?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#10A39A] hover:bg-[#0D867F] text-white button-text px-8 py-3"
                onClick={handleCalendlyClick}
                asChild
              >
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Book 30-min discovery call
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#10A39A] text-[#10A39A] hover:bg-[#DEF3F2] button-text px-8 py-3 bg-transparent"
                asChild
              >
                <a href="/contact">Contact</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <EmailPopup source="popup_home" />
    </div>
  )
}

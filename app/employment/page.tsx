"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Search, FileText, Package, StickyNote, Users, BarChart3 } from "lucide-react"

export default function EmploymentPage() {
  const handleCalendlyClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "calendly_click", {
        page: window.location.pathname,
        section: "employment_cta",
      })
    }
  }

  const useCases = [
    {
      icon: Search,
      title: "Vacancy sourcing prompts",
      description: "AI-generated search strategies to find hidden job opportunities and expand your reach.",
    },
    {
      icon: FileText,
      title: "Tailored cover letters (UC-aware)",
      description: "Personalised applications that understand Universal Credit requirements and employment gaps.",
    },
    {
      icon: Package,
      title: "Evidence pack builder",
      description: "Compile comprehensive job readiness portfolios with skills evidence and achievements.",
    },
    {
      icon: StickyNote,
      title: "Note summariser",
      description: "Transform lengthy case notes into clear, actionable summaries for better case management.",
    },
    {
      icon: Users,
      title: "Caseload prompts",
      description: "Intelligent reminders and next-step suggestions to keep clients progressing effectively.",
    },
    {
      icon: BarChart3,
      title: "Commissioner report helper",
      description: "Generate outcome-focused reports that demonstrate impact and secure continued funding.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="display-hero text-gray-900 mb-6">More applications. Better evidence. Faster job starts.</h1>
            <p className="body-lead text-gray-700 mb-8 max-w-2xl mx-auto">
              Bespoke AI training for employment advisers. Built by someone who's managed caseloads and hit targets.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-xl text-gray-900 mb-4">How we help employment providers</h2>
            <p className="body-lead text-gray-600 max-w-2xl mx-auto">
              Practical AI applications that improve client outcomes while reducing administrative burden.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#DEF3F2] rounded-lg flex items-center justify-center mb-4">
                    <useCase.icon className="h-6 w-6 text-[#10A39A]" />
                  </div>
                  <h3 className="heading-lg text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="body-default text-gray-600">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-xl text-gray-900 mb-8">See it in action</h2>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#10A39A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">60-90 second demo video</p>
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-xl text-gray-900 mb-6">Ready to improve your client outcomes?</h2>
            <p className="body-lead text-gray-700 mb-8">
              Let's discuss how AI can help you deliver better results while meeting commissioner requirements.
            </p>
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
                  Book 30-min session
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#10A39A] text-[#10A39A] hover:bg-[#DEF3F2] button-text px-8 py-3 bg-transparent"
                asChild
              >
                <a href="/contact">Contact us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

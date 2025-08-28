"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, FileText, Users, MessageSquare, Target, ClipboardCheck, BookOpen } from "lucide-react"

export default function SchoolsPage() {
  const handleCalendlyClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "calendly_click", {
        page: window.location.pathname,
        section: "schools_cta",
      })
    }
  }

  const useCases = [
    {
      icon: FileText,
      title: "Lesson planning scaffold",
      description: "AI-powered templates and frameworks to streamline lesson preparation while maintaining quality.",
    },
    {
      icon: Users,
      title: "Behaviour plan wizard",
      description: "Generate personalised behaviour support plans with evidence-based strategies and interventions.",
    },
    {
      icon: MessageSquare,
      title: "Parent comms drafts",
      description: "Professional, empathetic communication templates for sensitive conversations and updates.",
    },
    {
      icon: Target,
      title: "Quick differentiation",
      description: "Instantly adapt learning materials for different ability levels and learning needs.",
    },
    {
      icon: ClipboardCheck,
      title: "Assessment criteria assistant",
      description: "Create clear, measurable assessment rubrics aligned with curriculum standards.",
    },
    {
      icon: BookOpen,
      title: "CPD note generator",
      description: "Transform training sessions into actionable development plans and reflection notes.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="display-hero text-gray-900 mb-6">Give teachers hours back — safely.</h1>
            <p className="body-lead text-gray-700 mb-8 max-w-2xl mx-auto">
              Bespoke AI training designed by someone who's taught in the classroom. Ofsted-aligned, outcomes-first.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-xl text-gray-900 mb-4">How we help schools</h2>
            <p className="body-lead text-gray-600 max-w-2xl mx-auto">
              Practical AI applications that save time while maintaining professional standards and compliance.
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
            <h2 className="heading-xl text-gray-900 mb-6">Ready to give your teachers time back?</h2>
            <p className="body-lead text-gray-700 mb-8">
              Let's discuss how AI can safely reduce administrative burden while maintaining educational excellence.
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

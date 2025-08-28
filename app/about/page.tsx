"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, GraduationCap, Users, Building, Briefcase, Settings } from "lucide-react"

export default function AboutPage() {
  const handleCalendlyClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "calendly_click", {
        page: window.location.pathname,
        section: "about_cta",
      })
    }
  }

  const experience = [
    {
      icon: GraduationCap,
      title: "Primary teacher",
      description: "Frontline classroom experience understanding daily challenges and time pressures",
    },
    {
      icon: Users,
      title: "SENCO",
      description: "Special Educational Needs Coordinator supporting diverse learners with complex needs",
    },
    {
      icon: Building,
      title: "Prison educator",
      description: "Teaching in challenging environments with high-stakes outcomes and limited resources",
    },
    {
      icon: Briefcase,
      title: "Senior caseworker",
      description: "Supporting people back into employment with evidence-based approaches and measurable outcomes",
    },
    {
      icon: Settings,
      title: "Ops manager",
      description: "Managing large-scale public sector delivery, compliance, and performance targets",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="display-hero text-gray-900 mb-6">Built by someone who's done the job.</h1>
            <p className="body-lead text-gray-700 mb-8 max-w-2xl mx-auto">
              Jonny Rae combines frontline experience with AI expertise to deliver training that actually works for
              schools and employment providers.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-xl text-gray-900 mb-4 text-center">Five key experiences</h2>
            <p className="body-lead text-gray-600 mb-12 text-center max-w-2xl mx-auto">
              Every training module is informed by real-world experience in the roles we're training for.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {experience.map((item, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#DEF3F2] rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-[#10A39A]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="body-default text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-gray-200 mb-12">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#DEF3F2] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="h-5 w-5 text-[#10A39A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Built Beamworks and other tools</h3>
                    <p className="body-default text-gray-600">
                      Developed practical technology solutions for frontline teams, bridging the gap between AI
                      potential and real-world implementation. This experience informs our understanding of what
                      actually works in practice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-xl text-gray-900 mb-8">Bespoke, outcomes-first</h2>
            <div className="prose prose-lg mx-auto">
              <p className="body-lead text-gray-700 mb-6">
                Having worked across education, employment services, and government contracts, I understand the unique
                pressures frontline teams face. My approach is bespoke and outcomes-first — we don't just teach AI
                tools, we help you evidence impact and manage risk.
              </p>
              <p className="body-default text-gray-600 mb-6">
                Every training program is designed around your specific context, compliance requirements, and success
                metrics. Whether you're a school leader needing to show Ofsted how AI supports learning, or an
                employment provider demonstrating better job outcomes, we focus on practical implementation that
                delivers measurable results.
              </p>
              <p className="body-default text-gray-600">
                No jargon. No complexity. Just practical AI training that gives your staff time back while improving
                outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#DEF3F2]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-xl text-gray-900 mb-6">Ready to work together?</h2>
            <p className="body-lead text-gray-700 mb-8">
              Let's discuss how bespoke AI training can help your team work more effectively while meeting your
              compliance and outcome requirements.
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
                className="border-[#10A39A] text-[#10A39A] hover:bg-white button-text px-8 py-3 bg-transparent"
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

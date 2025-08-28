"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Users, Target, Zap, Clock, CheckCircle, ArrowRight } from "lucide-react"

export default function TrainingPage() {
  const handleCalendlyClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "calendly_click", {
        page: window.location.pathname,
        section: "training_cta",
      })
    }
  }

  const offerings = [
    {
      icon: Users,
      title: "SLT Strategy Day",
      duration: "Full day",
      description:
        "Senior leadership workshop to develop AI strategy, governance, and implementation roadmap for your organisation.",
      features: [
        "AI readiness assessment",
        "Risk management framework",
        "Staff capability mapping",
        "Implementation timeline",
      ],
    },
    {
      icon: Target,
      title: "Train-the-Trainer",
      duration: "2 days",
      description: "Equip your internal champions with the skills to cascade AI training throughout your organisation.",
      features: [
        "Facilitation techniques",
        "Common objections handling",
        "Practical exercises library",
        "Ongoing support materials",
      ],
    },
    {
      icon: Zap,
      title: "Advisor Accelerator",
      duration: "Half day",
      description:
        "Intensive hands-on session for frontline staff to master AI tools that directly impact their daily work.",
      features: ["Role-specific use cases", "Live tool demonstrations", "Practice scenarios", "Confidence building"],
    },
  ]

  const benefits = [
    {
      icon: Clock,
      title: "Time savings",
      description: "Reduce admin burden by 30-50% through smart AI integration",
    },
    {
      icon: CheckCircle,
      title: "Quality assurance",
      description: "Maintain professional standards while leveraging AI capabilities",
    },
    {
      icon: Target,
      title: "Measurable outcomes",
      description: "Track impact with clear metrics and success indicators",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="display-hero text-gray-900 mb-6">Training that sticks.</h1>
            <p className="body-lead text-gray-700 mb-8 max-w-2xl mx-auto">
              Bespoke AI training workshops designed for schools and employment providers. Practical, outcomes-focused,
              and delivered by someone who's done the job.
            </p>
          </div>
        </div>
      </section>

      {/* Training Offerings */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-xl text-gray-900 mb-4">What we deliver</h2>
            <p className="body-lead text-gray-600 max-w-2xl mx-auto">
              Three core training formats designed to meet your organisation at its current AI maturity level.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {offerings.map((offering, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-[#DEF3F2] rounded-lg flex items-center justify-center mb-6">
                    <offering.icon className="h-6 w-6 text-[#10A39A]" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="heading-lg text-gray-900">{offering.title}</h3>
                    <span className="text-sm text-[#10A39A] bg-[#DEF3F2] px-2 py-1 rounded-full">
                      {offering.duration}
                    </span>
                  </div>
                  <p className="body-default text-gray-600 mb-6">{offering.description}</p>
                  <ul className="space-y-2">
                    {offering.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-[#10A39A] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-xl text-gray-900 mb-4">Why our training works</h2>
            <p className="body-lead text-gray-600 max-w-2xl mx-auto">
              Real-world experience meets practical application. No jargon, no theory — just results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#DEF3F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-[#10A39A]" />
                </div>
                <h3 className="heading-lg text-gray-900 mb-3">{benefit.title}</h3>
                <p className="body-default text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-xl text-gray-900 mb-4">How it works</h2>
            <p className="body-lead text-gray-600 max-w-2xl mx-auto">
              A simple three-step process that ensures training is relevant, practical, and sustainable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#10A39A] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
                1
              </div>
              <h3 className="heading-lg text-gray-900 mb-3">Listen</h3>
              <p className="body-default text-gray-600">
                We start by understanding your specific challenges, workflows, and success metrics.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#10A39A] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
                2
              </div>
              <h3 className="heading-lg text-gray-900 mb-3">Design</h3>
              <p className="body-default text-gray-600">
                Custom training content built around your real scenarios and existing processes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#10A39A] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
                3
              </div>
              <h3 className="heading-lg text-gray-900 mb-3">Embed & Measure</h3>
              <p className="body-default text-gray-600">
                Ongoing support to ensure adoption and track measurable improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#102B28] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-xl mb-6">Ready to upskill your team?</h2>
            <p className="body-lead mb-8 text-gray-200">
              Let's discuss how bespoke AI training can transform your organisation's productivity and outcomes.
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
                className="border-white text-white hover:bg-white hover:text-[#102B28] button-text px-8 py-3 bg-transparent"
                asChild
              >
                <a href="/contact" className="flex items-center gap-2">
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

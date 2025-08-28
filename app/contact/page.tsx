"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, CheckCircle, AlertCircle, Calendar, Mail } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    sector: "",
    message: "",
    marketingConsent: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: window.location.pathname,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setStatus("success")
      setMessage("Thank you for your message! We'll get back to you within 24 hours.")
      setFormData({
        name: "",
        email: "",
        organization: "",
        role: "",
        sector: "",
        message: "",
        marketingConsent: false,
      })

      // Track successful contact form submission
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "contact_submit", {
          page: window.location.pathname,
          section: "contact_form",
        })
      }
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCalendlyClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "calendly_click", {
        page: window.location.pathname,
        section: "contact_alternative",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="display-hero text-gray-900 mb-6">Let's discuss your AI training needs</h1>
            <p className="body-lead text-gray-700 mb-8 max-w-2xl mx-auto">
              Get in touch to explore how bespoke AI training can help your team work more effectively while meeting
              compliance requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Alternative */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="heading-lg text-gray-900">Send us a message</CardTitle>
                <p className="body-default text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                {status === "success" ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="heading-lg text-gray-900 mb-2">Message Sent!</h3>
                    <p className="body-default text-gray-600 mb-4">{message}</p>
                    <Button
                      variant="outline"
                      onClick={() => setStatus("idle")}
                      className="border-[#10A39A] text-[#10A39A] hover:bg-[#DEF3F2]"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          disabled={isLoading}
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          disabled={isLoading}
                          className="border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium mb-2 text-gray-700">
                          Organisation
                        </label>
                        <Input
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="Your school or organisation"
                          disabled={isLoading}
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium mb-2 text-gray-700">
                          Role
                        </label>
                        <Input
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          placeholder="Your job title"
                          disabled={isLoading}
                          className="border-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="sector" className="block text-sm font-medium mb-2 text-gray-700">
                        Sector
                      </label>
                      <Select onValueChange={(value) => handleSelectChange("sector", value)} disabled={isLoading}>
                        <SelectTrigger className="border-gray-300">
                          <SelectValue placeholder="Select your sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="schools">Schools</SelectItem>
                          <SelectItem value="employment">Employment</SelectItem>
                          <SelectItem value="fe">FE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your AI training needs..."
                        rows={5}
                        disabled={isLoading}
                        className="border-gray-300"
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketingConsent"
                        checked={formData.marketingConsent}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, marketingConsent: checked as boolean }))
                        }
                        disabled={isLoading}
                      />
                      <label htmlFor="marketingConsent" className="text-sm text-gray-600 leading-relaxed">
                        I consent to receiving marketing communications about AI training resources and updates.
                      </label>
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{message}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#10A39A] hover:bg-[#0D867F] text-white button-text"
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Alternative Contact Method */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-lg text-gray-900 mb-4">Prefer to talk directly?</h2>
                <p className="body-default text-gray-600 mb-8">
                  Book a 30-minute session to discuss your specific needs and see how we can help.
                </p>
              </div>

              <Card className="border-[#10A39A] bg-[#DEF3F2]">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-[#10A39A] mx-auto mb-4" />
                  <h3 className="heading-lg text-gray-900 mb-4">Book a 30-minute session</h3>
                  <p className="body-default text-gray-600 mb-6">
                    Free consultation to understand your challenges and explore solutions.
                  </p>
                  <Button
                    size="lg"
                    className="bg-[#10A39A] hover:bg-[#0D867F] text-white button-text px-8 py-3"
                    onClick={handleCalendlyClick}
                    asChild
                  >
                    <a
                      href={`${process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}?utm_source=site&utm_medium=cta&utm_campaign=book30`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Book Now
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#DEF3F2] rounded-lg">
                      <Mail className="h-5 w-5 text-[#10A39A]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Direct Email</h3>
                      <p className="body-default text-gray-600 mb-1">hello@timebackai.uk</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

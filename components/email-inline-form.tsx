"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, AlertCircle } from "lucide-react"

interface EmailInlineFormProps {
  source?: string
  className?: string
}

export function EmailInlineForm({ source = "inline_home", className }: EmailInlineFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe")
      }

      setStatus("success")
      setMessage("Thank you! Please check your email to confirm your subscription.")
      setFormData({ name: "", email: "" })

      // Track GA4 event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "email_subscribe", {
          source,
          page: window.location.pathname,
        })
      }
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (status === "success") {
    return (
      <div className={`text-center py-6 ${className}`}>
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <p className="text-green-600 font-medium">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          name="name"
          placeholder="Name (optional)"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className="flex-1"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isLoading || !formData.email}
          className="bg-[#10A39A] hover:bg-[#0D867F] text-white button-text px-6"
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}
    </form>
  )
}

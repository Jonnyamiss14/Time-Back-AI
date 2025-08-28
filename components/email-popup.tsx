"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Mail, CheckCircle, AlertCircle } from "lucide-react"

interface EmailPopupProps {
  source?: string
}

export function EmailPopup({ source = "popup_exit" }: EmailPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Check if popup was shown in last 7 days
    const lastShown = localStorage.getItem("email-popup-last-shown")
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

    if (lastShown && Number.parseInt(lastShown) > sevenDaysAgo) {
      return
    }

    let timeoutId: NodeJS.Timeout
    let exitIntentListener: (e: MouseEvent) => void

    // Mobile: 30s delay
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      timeoutId = setTimeout(() => {
        setIsVisible(true)
        localStorage.setItem("email-popup-last-shown", Date.now().toString())
      }, 30000)
    } else {
      // Desktop: exit-intent
      exitIntentListener = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsVisible(true)
          localStorage.setItem("email-popup-last-shown", Date.now().toString())
          document.removeEventListener("mouseleave", exitIntentListener)
        }
      }
      document.addEventListener("mouseleave", exitIntentListener)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (exitIntentListener) {
        document.removeEventListener("mouseleave", exitIntentListener)
      }
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false)
      }
    }

    if (isVisible) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isVisible])

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

      // Close popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
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

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto relative">
        <Button variant="ghost" size="sm" className="absolute right-2 top-2 h-8 w-8 p-0" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center pb-4">
          <Mail className="h-12 w-12 text-[#10A39A] mx-auto mb-4" />
          <CardTitle className="heading-lg text-gray-900">Get new posts & demos</CardTitle>
          <p className="body-default text-gray-600">
            Stay updated with the latest AI training insights and practical demos.
          </p>
        </CardHeader>

        <CardContent>
          {status === "success" ? (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-green-600 font-medium">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Name (optional)"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{message}</span>
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 bg-transparent"
                >
                  Maybe later
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !formData.email}
                  className="flex-1 bg-[#10A39A] hover:bg-[#0D867F] text-white"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import { apiClient } from "@/lib/api-client"

interface NewsletterSignupProps {
  title?: string
  description?: string
  className?: string
}

export function NewsletterSignup({
  title = "Stay Updated",
  description = "Get the latest AI education insights and updates delivered to your inbox.",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    try {
      const response = await apiClient.subscribeNewsletter(email)
      setStatus("success")
      setMessage(response.message)
      setEmail("")
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={`border-0 shadow-lg ${className}`}>
      <CardHeader className="text-center">
        <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" ? (
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-green-600 font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !email}>
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
        )}
      </CardContent>
    </Card>
  )
}

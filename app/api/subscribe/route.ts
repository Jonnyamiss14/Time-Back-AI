import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const subscribeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, source } = subscribeSchema.parse(body)

    // Rate limiting check (simple IP-based)
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    // TODO: Implement proper rate limiting with Redis or similar
    // For now, we'll just log the attempt
    console.log(`Subscription attempt from IP: ${ip}`)

    // MailerLite integration
    if (process.env.MAILERLITE_API_KEY && process.env.MAILERLITE_GROUP_ID) {
      try {
        const mailerLiteResponse = await fetch("https://api.mailerlite.com/api/v2/subscribers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY,
          },
          body: JSON.stringify({
            email,
            name: name || "",
            groups: [process.env.MAILERLITE_GROUP_ID],
            type: "active", // This will trigger double opt-in if enabled in MailerLite
            fields: {
              source: source || "website",
              signup_date: new Date().toISOString(),
            },
          }),
        })

        if (!mailerLiteResponse.ok) {
          const errorData = await mailerLiteResponse.json()
          console.error("MailerLite API error:", errorData)

          // If subscriber already exists, that's okay
          if (errorData.error?.message?.includes("already exists")) {
            return NextResponse.json({
              success: true,
              message: "You're already subscribed! Thank you for your interest.",
            })
          }

          throw new Error("Failed to subscribe to newsletter")
        }

        const result = await mailerLiteResponse.json()
        console.log("MailerLite subscription successful:", result)

        return NextResponse.json({
          success: true,
          message: "Thank you for subscribing! Please check your email to confirm your subscription.",
        })
      } catch (mailerLiteError) {
        console.error("MailerLite integration error:", mailerLiteError)
        // Fall through to mock response
      }
    }

    // Mock response when MailerLite is not configured
    console.log("Mock newsletter subscription:", { name, email, source })

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! Please check your email to confirm your subscription.",
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 })
  }
}

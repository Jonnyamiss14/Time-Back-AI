import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  role: z.string().optional(),
  sector: z.enum(["schools", "employment", "fe"]).optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  marketingConsent: z.boolean().optional(),
  source: z.string().optional(),
})

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5

  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validatedData = contactSchema.parse(body)
    const { name, email, organization, role, sector, message, marketingConsent, source } = validatedData

    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    if (process.env.GOOGLE_SHEETS_API_KEY && process.env.GOOGLE_SHEETS_ID) {
      try {
        const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}/values/Contacts:append?valueInputOption=RAW&key=${process.env.GOOGLE_SHEETS_API_KEY}`

        const rowData = [
          new Date().toISOString(),
          name,
          email,
          organization || "",
          role || "",
          sector || "",
          message,
          marketingConsent ? "Yes" : "No",
          source || "website",
          ip,
        ]

        const sheetsResponse = await fetch(sheetsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [rowData],
          }),
        })

        if (!sheetsResponse.ok) {
          console.error("Google Sheets API error:", await sheetsResponse.text())
          // Continue execution - don't fail the entire request if Sheets fails
        } else {
          console.log("Contact data saved to Google Sheets successfully")
        }
      } catch (sheetsError) {
        console.error("Google Sheets integration error:", sheetsError)
        // Continue execution - don't fail the entire request if Sheets fails
      }
    }

    if (process.env.MAILERLITE_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        // Send notification email to team
        const emailContent = `
New contact form submission:

Name: ${name}
Email: ${email}
Organization: ${organization || "Not provided"}
Role: ${role || "Not provided"}
Sector: ${sector || "Not provided"}
Marketing Consent: ${marketingConsent ? "Yes" : "No"}
Source: ${source || "website"}

Message:
${message}

Submitted at: ${new Date().toISOString()}
IP: ${ip}
        `

        // Note: This would typically use a proper email service like Resend
        // For now, we'll log the notification
        console.log("Contact form notification:", emailContent)
      } catch (emailError) {
        console.error("Email notification error:", emailError)
        // Continue execution - don't fail the entire request if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you within 24 hours.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]
      return NextResponse.json({ error: firstError.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}

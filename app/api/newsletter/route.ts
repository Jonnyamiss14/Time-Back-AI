import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // TODO: Integrate with MailerLite or similar newsletter service
    // TODO: Add to newsletter list
    // TODO: Send welcome email

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log("[v0] Newsletter signup:", { email })

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to our newsletter!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Newsletter signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, organization, role, institutionType } = body

    // Validate required fields
    if (!name || !email || !organization) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // TODO: Create trial account
    // TODO: Send welcome email with login credentials
    // TODO: Store in user database
    // TODO: Set up trial expiration

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Trial signup:", { name, email, organization, role, institutionType })

    return NextResponse.json(
      {
        success: true,
        message: "Trial account created successfully! Check your email for login details.",
        trialId: `trial_${Date.now()}`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Trial signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

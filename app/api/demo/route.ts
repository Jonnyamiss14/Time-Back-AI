import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, organization, phone, preferredDate, message } = body

    // Validate required fields
    if (!name || !email || !organization) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // TODO: Integrate with calendar booking system (Calendly API)
    // TODO: Store lead in CRM/Airtable
    // TODO: Send confirmation email
    // TODO: Notify sales team

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log("[v0] Demo booking:", { name, email, organization, phone, preferredDate, message })

    return NextResponse.json(
      {
        success: true,
        message: "Demo request submitted successfully. We'll contact you within 24 hours to schedule.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Demo booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

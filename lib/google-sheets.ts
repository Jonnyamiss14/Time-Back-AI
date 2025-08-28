export interface ContactData {
  name: string
  email: string
  organization?: string
  role?: string
  sector?: string
  message: string
  marketingConsent?: boolean
  source?: string
  ip?: string
}

export async function appendToGoogleSheets(data: ContactData): Promise<boolean> {
  if (!process.env.GOOGLE_SHEETS_API_KEY || !process.env.GOOGLE_SHEETS_ID) {
    console.warn("Google Sheets integration not configured")
    return false
  }

  try {
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}/values/Contacts:append?valueInputOption=RAW&key=${process.env.GOOGLE_SHEETS_API_KEY}`

    const rowData = [
      new Date().toISOString(),
      data.name,
      data.email,
      data.organization || "",
      data.role || "",
      data.sector || "",
      data.message,
      data.marketingConsent ? "Yes" : "No",
      data.source || "website",
      data.ip || "unknown",
    ]

    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [rowData],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Google Sheets API error:", errorText)
      return false
    }

    console.log("Data successfully appended to Google Sheets")
    return true
  } catch (error) {
    console.error("Google Sheets integration error:", error)
    return false
  }
}

export async function setupGoogleSheetsHeaders(): Promise<boolean> {
  if (!process.env.GOOGLE_SHEETS_API_KEY || !process.env.GOOGLE_SHEETS_ID) {
    return false
  }

  try {
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}/values/Contacts:update?valueInputOption=RAW&key=${process.env.GOOGLE_SHEETS_API_KEY}`

    const headers = [
      "Timestamp",
      "Name",
      "Email",
      "Organization",
      "Role",
      "Sector",
      "Message",
      "Marketing Consent",
      "Source",
      "IP Address",
    ]

    const response = await fetch(sheetsUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [headers],
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Error setting up Google Sheets headers:", error)
    return false
  }
}

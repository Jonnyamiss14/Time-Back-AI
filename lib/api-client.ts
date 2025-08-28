interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Request failed")
      }

      return data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  async submitContact(data: {
    name: string
    email: string
    organization?: string
    message: string
  }): Promise<ApiResponse> {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async subscribeNewsletter(email: string): Promise<ApiResponse> {
    return this.request("/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async bookDemo(data: {
    name: string
    email: string
    organization: string
    phone?: string
    preferredDate?: string
    message?: string
  }): Promise<ApiResponse> {
    return this.request("/demo", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async startTrial(data: {
    name: string
    email: string
    organization: string
    role?: string
    institutionType?: string
  }): Promise<ApiResponse> {
    return this.request("/trial", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()

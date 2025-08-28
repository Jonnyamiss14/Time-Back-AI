"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      // Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming
            console.log("[v0] Page Load Time:", navEntry.loadEventEnd - navEntry.loadEventStart)
          }

          if (entry.entryType === "paint") {
            console.log(`[v0] ${entry.name}:`, entry.startTime)
          }
        }
      })

      observer.observe({ entryTypes: ["navigation", "paint"] })

      // Cleanup
      return () => observer.disconnect()
    }
  }, [])

  return null
}

"use client"

import { useEffect } from "react"

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-animate]")
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0")
            e.target.classList.remove("opacity-0", "translate-y-2")
          }
        })
      },
      { threshold: 0.2 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

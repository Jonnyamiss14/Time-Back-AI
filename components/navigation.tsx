"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ExternalLink } from "lucide-react"

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/schools", label: "Schools" },
    { href: "/employment", label: "Employment" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const handleCalendlyClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "calendly_click", {
        page: window.location.pathname,
        section: "header",
      })
    }
  }

  return (
    <header
      className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="focus-ring rounded">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">TimeBack</span>
                <span className="text-2xl font-bold text-[#10A39A] ml-1">AI</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-[#10A39A] transition-colors focus-ring"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <Button
              size="sm"
              className="bg-[#10A39A] hover:bg-[#0D867F] text-white focus-ring ml-4"
              onClick={handleCalendlyClick}
              asChild
            >
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                Book 30-min
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="focus-ring">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-[#10A39A] transition-colors focus-ring"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  className="bg-[#10A39A] hover:bg-[#0D867F] text-white focus-ring mt-4"
                  onClick={() => {
                    handleCalendlyClick()
                    setIsOpen(false)
                  }}
                  asChild
                >
                  <a
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Book 30-min session
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

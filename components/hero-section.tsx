import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  badge?: string
  title: string
  description: string
  primaryCta: string
  secondaryCta?: string
  className?: string
}

export function HeroSection({ badge, title, description, primaryCta, secondaryCta, className }: HeroSectionProps) {
  return (
    <section className={`py-20 lg:py-32 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <Badge variant="secondary" className="mb-6">
              {badge}
            </Badge>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              {primaryCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {secondaryCta && (
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                {secondaryCta}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

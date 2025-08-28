import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CtaSectionProps {
  title: string
  description: string
  primaryCta: string
  secondaryCta?: string
  className?: string
}

export function CtaSection({ title, description, primaryCta, secondaryCta, className }: CtaSectionProps) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-muted-foreground mb-8">{description}</p>
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

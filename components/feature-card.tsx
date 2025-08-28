import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, type LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, features, className }: FeatureCardProps) {
  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      <CardHeader>
        <Icon className="h-12 w-12 text-primary mb-4" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

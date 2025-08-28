import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
  rating?: number
  className?: string
}

export function TestimonialCard({ quote, author, role, company, avatar, rating = 5, className }: TestimonialCardProps) {
  return (
    <Card className={`border-0 shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <blockquote className="text-lg mb-6 leading-relaxed">"{quote}"</blockquote>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar || "/placeholder.svg"} alt={author} />
            <AvatarFallback>
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{author}</div>
            <div className="text-sm text-muted-foreground">
              {role} at {company}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

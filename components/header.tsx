import { Navigation } from "./navigation"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return <Navigation className={className} />
}

import { Linkedin, Twitter, Youtube } from "lucide-react"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const footerSections = [
    {
      title: "Services",
      links: [
        { href: "/schools", label: "Schools" },
        { href: "/employment", label: "Employment" },
        { href: "/training", label: "Training & Workshops" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About Jonny" },
        { href: "/blog?filter=Schools", label: "Schools Posts" },
        { href: "/blog?filter=Employment", label: "Employment Posts" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/cookies", label: "Cookie Policy" },
      ],
    },
  ]

  const socialLinks = [
    { href: "#", icon: Linkedin, label: "LinkedIn" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Youtube, label: "YouTube" },
  ]

  return (
    <footer className={`border-t bg-muted/50 py-12 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="font-bold text-xl text-evergreen-900">TimeBack AI</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Bespoke, human-centred training for schools and employment services — designed by someone who's done the
              job.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              <a href="mailto:hello@timebackai.uk" className="hover:text-[#10A39A] transition-colors focus-ring">
                hello@timebackai.uk
              </a>
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-[#10A39A] transition-colors focus-ring"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-foreground transition-colors focus-ring">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TimeBack AI. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Frontline first. Outcomes obsessed.</p>
        </div>
      </div>
    </footer>
  )
}

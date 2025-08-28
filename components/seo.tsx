import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateSEOMetadata({
  title = "TimeBack AI - Give Staff Time Back with Bespoke AI Training",
  description = "Bespoke, human-centred AI training for schools and employment services. Designed by someone who's done the job. Book a 30-min session today.",
  keywords = "AI training, schools, employment providers, artificial intelligence education, professional development, TimeBack AI",
  image = "/placeholder.svg?height=630&width=1200&text=TimeBack+AI",
  url = "https://timebackai.uk",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: SEOProps): Metadata {
  const baseUrl = "https://timebackai.uk"
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`

  return {
    title,
    description,
    keywords,
    authors: author ? [{ name: author }] : [{ name: "TimeBack AI" }],
    creator: "TimeBack AI",
    publisher: "TimeBack AI",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "TimeBack AI",
      type: type as any,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: "@timebackai",
      site: "@timebackai",
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

export function generateStructuredData(props: SEOProps & { type: "Organization" | "Article" | "WebSite" }) {
  const baseUrl = "https://timebackai.uk"

  switch (props.type) {
    case "Organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TimeBack AI",
        description: props.description,
        url: baseUrl,
        logo: `${baseUrl}/placeholder.svg?height=200&width=200&text=TimeBack+AI`,
        sameAs: ["https://twitter.com/timebackai", "https://linkedin.com/company/timebackai"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "hello@timebackai.uk",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "GB",
          addressLocality: "London",
        },
      }

    case "Article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.title,
        description: props.description,
        image: props.image?.startsWith("http") ? props.image : `${baseUrl}${props.image}`,
        datePublished: props.publishedTime,
        dateModified: props.modifiedTime || props.publishedTime,
        author: {
          "@type": "Person",
          name: props.author || "TimeBack AI Team",
        },
        publisher: {
          "@type": "Organization",
          name: "TimeBack AI",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/placeholder.svg?height=200&width=200&text=TimeBack+AI`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": props.url?.startsWith("http") ? props.url : `${baseUrl}${props.url}`,
        },
      }

    case "WebSite":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TimeBack AI",
        description: props.description,
        url: baseUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }

    default:
      return null
  }
}

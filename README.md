# TimeBack AI

Bespoke AI training for schools and employment providers. Built by someone who's done the job.

## Features

- **Responsive Design**: Mobile-first approach with modern UI components
- **Blog System**: MDX-powered blog with categories, tags, and search
- **Contact Forms**: Comprehensive contact and newsletter signup forms
- **Analytics**: Google Analytics integration with event tracking
- **SEO Optimized**: Structured data, sitemaps, and meta tags
- **API Integrations**: Google Sheets and MailerLite integration

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: shadcn/ui component library
- **Content**: MDX for blog posts
- **Analytics**: Google Analytics 4
- **Integrations**: Google Sheets API, MailerLite API

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://timebackai.uk
NEXT_PUBLIC_CALENDLY_URL=your_calendly_url

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# API Integrations
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
GOOGLE_SHEETS_ID=your_google_sheets_id
MAILERLITE_API_KEY=your_mailerlite_api_key
MAILERLITE_GROUP_ID=your_mailerlite_group_id
NOTIFICATION_EMAIL=hello@timebackai.uk
\`\`\`

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `POST /api/contact` - Contact form submission
- `POST /api/subscribe` - Newsletter subscription

## Deployment

The site is optimized for deployment on Vercel with automatic deployments from the main branch.

## License

© 2024 TimeBack AI. All rights reserved.

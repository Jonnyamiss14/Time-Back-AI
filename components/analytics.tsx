"use client"

import { useEffect } from "react"
import Script from "next/script"

interface AnalyticsProps {
  gaId?: string
  hotjarId?: string
}

export function Analytics({ gaId, hotjarId }: AnalyticsProps) {
  useEffect(() => {
    // Track page views for client-side navigation
    const handleRouteChange = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", gaId || "", {
          page_path: window.location.pathname,
        })
      }
    }

    // Listen for route changes
    window.addEventListener("popstate", handleRouteChange)
    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [gaId])

  return (
    <>
      {/* Google Analytics */}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Hotjar */}
      {hotjarId && (
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${hotjarId},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}
    </>
  )
}

// Extend window type for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    hj: (...args: any[]) => void
  }
}

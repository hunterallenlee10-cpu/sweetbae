import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/shell/Footer";
import { Grain } from "@/components/shell/Grain";
import { MobileBar } from "@/components/shell/MobileBar";
import { Nav } from "@/components/shell/Nav";
import { Preloader } from "@/components/shell/Preloader";
import { SmoothScroll } from "@/components/shell/SmoothScroll";
import { ThemeProvider, themeBootScript } from "@/components/shell/theme";
import { business, concept, pages, siteUrl } from "@/content/site";
import { restaurantJsonLd } from "@/lib/jsonld";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: pages.home.title, template: "%s" },
  description: pages.home.description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  robots: concept ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    url: "/",
    title: pages.home.title,
    description: pages.home.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Sweetbay Restaurant & Bar on Washington Street, Leonardtown, at dusk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pages.home.title,
    description: pages.home.description,
    images: ["/og.jpg"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      data-theme="night"
      suppressHydrationWarning
      className={`${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="theme-surface">
        <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[300] rounded-full bg-[color:var(--cream)] px-4 py-2 text-[color:var(--ink)]">
          Skip to content
        </a>
        <ThemeProvider>
          <Preloader />
          <SmoothScroll />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
          <Grain />
        </ThemeProvider>
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}

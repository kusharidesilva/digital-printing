import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { businessInfo } from "@/data/business";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import AnimationProvider from "@/components/shared/AnimationProvider";
import "./globals.css";

const manrope = localFont({
  src: "../../public/fonts/manrope-variable.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});
export const metadata: Metadata = {
  metadataBase: new URL(businessInfo.siteUrl),
  title: {
    default: "Digital Printing | Professional Printing Solutions",
    template: "%s | Digital Printing",
  },
  description:
    "Professional digital printing services for business cards, flyers, brochures, stickers, banners, invitations and custom printing requirements in Sri Lanka.",
  applicationName: "Digital Printing",
  robots: { index: true, follow: true },
  icons: { icon: "/icons/favicon.svg", apple: "/icons/apple-touch-icon.png" },
  openGraph: {
    title: "Digital Printing | Professional Printing Solutions",
    description:
      "Good ideas. Great prints. Made for you. Professional printing for business, events and everyday needs.",
    url: "/",
    type: "website",
    locale: "en_LK",
    siteName: "Digital Printing",
    images: [
      {
        url: "/images/hero/printed-products.webp",
        alt: "Beautifully printed business cards, packaging and brochures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Printing | Professional Printing Solutions",
    images: ["/images/hero/printed-products.webp"],
  },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = {
  themeColor: "#225c43",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Only verified general information is included; no invented address, phone, reviews or opening hours in schema.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessInfo.name,
    url: businessInfo.siteUrl,
    description:
      "Digital printing solutions for businesses, organisations, events and individuals.",
    areaServed: { "@type": "Country", name: "Sri Lanka" },
  };
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AnimationProvider>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </AnimationProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

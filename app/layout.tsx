import "@fontsource-variable/archivo";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteDescription, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Gavin Park — Software Engineer", template: "%s — Gavin Park" },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: { title: "Gavin Park — Software Engineer", description: siteDescription, type: "website", url: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gavin Park",
    url: siteUrl,
    sameAs: ["https://github.com/Kouen-Park"],
    jobTitle: "Software Engineer",
  };
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}

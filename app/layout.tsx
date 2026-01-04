import type { Metadata } from "next";
import { Poppins, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export const accent = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BuildWithOchife — Website Developer in Nigeria",
    template: "%s | BuildWithOchife",
  },

  description:
    "BuildWithOchife is a professional website developer in Nigeria, building fast, SEO-optimised websites for individuals, startups, healthcare platforms, and growing businesses.",

  keywords: [
    "BuildWithOchife",
    "Ochife",
    "Ogechukwu Ochife",
    "tactical god",
    "Website developer in Nigeria",
    "Web developer Nigeria",
    "Frontend developer Nigeria",
    "WordPress developer Nigeria",
    "Startup website developer",
    "Healthcare website developer",
    "Nursing platform developer",
    "Best website developer in Nigeria",
  ],

  authors: [{ name: "Ogechukwu Ochife" }],
  creator: "Ogechukwu Ochife",
  publisher: "BuildWithOchife",

  metadataBase: new URL("https://buildwithochife.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "BuildWithOchife — Website Developer in Nigeria",
    description:
      "I design and build fast, SEO-optimised websites for individuals, startups, and healthcare professionals.",
    url: "https://buildwithochife.com",
    siteName: "BuildWithOchife",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BuildWithOchife — Professional Website Developer",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BuildWithOchife — Website Developer in Nigeria",
    description:
      "Professional website developer in Nigeria building SEO-optimised websites for businesses, startups, and healthcare platforms.",
    images: ["/og-image.png"],
    creator: "@Tactical_God",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${accent.variable}`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className="antialiased">{children}</body>
      </ThemeProvider>
    </html>
  );
}

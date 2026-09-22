import type { Metadata } from "next";
import { Poppins, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sooner";

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
    default: "Ochife — Business Websites & Web Applications",
    template: "%s | BuildWithOchife",
  },

  description:
    "Ogechukwu Ochife builds conversion-focused business websites, landing pages and web applications. Independent full-stack development, from first conversation to launch.",

  keywords: [
    "BuildWithOchife",
    "Ochife",
    "Ogechukwu Ochife",
    "Website developer in Nigeria",
    "Web developer Nigeria",
    "Frontend developer Nigeria",
    "WordPress developer Nigeria",
    "Startup website developer",
    "Healthcare website developer",
    "Nursing platform developer",
  ],

  authors: [{ name: "Ogechukwu Ochife" }],
  creator: "Ogechukwu Ochife",
  publisher: "BuildWithOchife",

  metadataBase: new URL("https://buildwithochife.vercel.app"),

  openGraph: {
    title: "Ochife — Business Websites & Web Applications",
    description:
      "Business websites and web applications built with purpose. Work directly with Ogechukwu Ochife, an independent full-stack developer.",
    url: "https://buildwithochife.vercel.app",
    siteName: "BuildWithOchife",

    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ochife — Business Websites & Web Applications",
    description:
      "Websites that help businesses win customers. Web applications that make work easier. Built by Ogechukwu Ochife.",
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
    <html
      lang="en"
      className={`${poppins.variable} ${accent.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

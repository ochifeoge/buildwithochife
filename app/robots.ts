import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/securitycheck",
        "/account",
        "/myblogs",
        "/myprojects",
        "/settings",
        "/api/",
        "/_next/",
      ],
    },
    sitemap: "https://buildwithochife.vercel.app/sitemap.xml",
  };
}

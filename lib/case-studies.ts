import type { Project } from "@/lib/types/project";

// Editorial summaries of the existing published CMS descriptions. No inferred metrics.
const stories: Record<
  string,
  {
    name: string;
    category: string;
    headline: string;
    summary: string;
    challenge: string;
    decision: string;
    delivery: string;
    tone: string;
  }
> = {
  "69a89fe6-718a-4e4a-b51b-1972648f6583": {
    name: "EssentialHub",
    category: "Business website",
    headline: "A clearer home for an everyday essentials brand.",
    summary:
      "A responsive WordPress website that makes products easy to explore and day-to-day updates manageable for the business.",
    challenge:
      "Give a lifestyle and everyday essentials brand a credible online presence with clear product and brand information.",
    decision:
      "Prioritise content hierarchy and intuitive navigation, with WordPress so non-technical administrators can manage the site.",
    delivery:
      "End-to-end development: theme customisation, responsive layouts, performance optimisation and deployment.",
    tone: "sage",
  },
  "ece0334b-035d-4521-9432-37b2fe3428f4": {
    name: "The wedding website",
    category: "Custom website · Payment integration",
    headline: "One celebration. Every guest connected.",
    summary:
      "A personal wedding website with monetary gifting, curated gift links and QR access for guests near and far.",
    challenge:
      "Bring the couple’s story and practical guest information together in one accessible place.",
    decision:
      "Pair a personal visual identity with payment integration, Amazon gift links and quick QR-code access.",
    delivery:
      "A responsive wedding experience connecting storytelling with practical tools for local and remote guests.",
    tone: "rose",
  },
  "69e7d001-4111-4318-af9f-8f983e33cb35": {
    name: "Makeup studio concept",
    category: "Landing page · Independent concept",
    headline: "A beauty brand, with a point of view.",
    summary:
      "An editorial landing-page concept exploring video, movement and brand storytelling for a makeup studio.",
    challenge:
      "Explore how a makeup studio could present its visual identity through an immersive landing page.",
    decision:
      "Use swipeable video backgrounds and contextual text to connect the imagery with the brand story.",
    delivery:
      "A responsive independent concept. This is a side project, not a commissioned client engagement.",
    tone: "sand",
  },
  "3d2f7e3b-9ee0-4df7-814c-ecbcef2f8a6c": {
    name: "KredGift",
    category: "Web application · Frontend team lead",
    headline: "Making digital gifting easier to navigate.",
    summary:
      "User-facing pages, a dashboard and API integration for a digital gifting and wallet platform.",
    challenge:
      "Translate gifting and wallet product requirements into a consistent, responsive application interface.",
    decision:
      "Build reusable frontend components and work with the backend team on authentication, API integration and data rendering.",
    delivery:
      "Frontend intern and team lead for approximately two months. The company later paused operations; this is an account of the work delivered.",
    tone: "sage",
  },
};
export function caseStudy(project: Project) {
  return (
    stories[project.id] ?? {
      name: project.title,
      category: "Website & product development",
      headline: project.title,
      summary: project.description.split(/\n\s*\n/)[0],
      challenge: "",
      decision: "",
      delivery: "",
      tone: "sage",
    }
  );
}
export function orderProjects(projects: Project[]) {
  const order = Object.keys(stories);
  return [...projects].sort((a, b) => {
    const ai = order.indexOf(a.id),
      bi = order.indexOf(b.id);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });
}
export function externalUrl(value?: string | null) {
  if (!value) return undefined;
  try {
    const url = new URL(value.trim());
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

// Local copies remove image-host latency. A new CMS upload takes precedence.
const localPreviews: Record<string, { original: string; image: string }> = {
  "69a89fe6-718a-4e4a-b51b-1972648f6583": {
    original: "1767445724631.png",
    image: "/work/essentialhub.png",
  },
  "ece0334b-035d-4521-9432-37b2fe3428f4": {
    original: "1767473135981.png",
    image: "/work/wedding-website.png",
  },
  "69e7d001-4111-4318-af9f-8f983e33cb35": {
    original: "1767506636048.png",
    image: "/work/makeup-concept.png",
  },
  "3d2f7e3b-9ee0-4df7-814c-ecbcef2f8a6c": {
    original: "1767779405170.png",
    image: "/work/kredgift.png",
  },
};
export function projectImage(project: Project) {
  const local = localPreviews[project.id];
  return local && project.preview_image_url?.endsWith(local.original)
    ? local.image
    : project.preview_image_url;
}

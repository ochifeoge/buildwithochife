# Portfolio redesign audit

## Existing architecture

Next.js 16.1 App Router / React 19 / TypeScript. Marketing route group shares navigation and footer; dashboard group authenticates through Supabase. Supabase stores published projects, blog HTML and uploaded media. React Hook Form, Zod and TipTap support the existing CMS. Tailwind 4 and Radix components provide styling and controls. GSAP, Motion and Framer Motion are already installed. No new dependency is needed.

## Findings before implementation

- Homepage: generic workspace hero, no personal introduction or secondary work CTA; repeated rounded cards; work sits below two service/audience sections.
- Contact and About are Coming Soon pages. Existing contact: ochifeoge@gmail.com and WhatsApp +2349022517371.
- Projects nest external anchors inside a Next Link. Featured query does not filter published status. Screenshots are small and tech tags dominate.
- Rotating text, repeated scroll entrances and glowing effects add motion without a clear narrative. Reduced-motion handling is inconsistent.
- Root layout places provider/toaster outside body. Global font rule forcibly applies Poppins to every element, preventing typographic hierarchy.
- Blog detail has a fixed desktop image width that can overflow and metadata reads asynchronous params synchronously.
- Actual original desktop and mobile rendered in Chromium; captures saved under /tmp/portfolio-qa.
- Baseline lint: 13 errors, 11 warnings, largely existing CMS/upload/effect code.

## Evidence and reusable material

- Existing portrait: public/oge-hero.png. Preserve original; use Next Image optimisation.
- Published Supabase entries: EssentialHub (business WordPress site), wedding website (payments, gift links, QR access), makeup landing page (explicitly a side-project concept), KredGift (frontend internship/team lead, operations later paused).
- No published evidence for Nurexi, AcademiaHub Africa, Avid Agency or Fundform Capital. No verified testimonials or numerical outcomes. Do not infer these.
- Reuse Supabase, project IDs/routes, original project descriptions, screenshots, blog publishing, contact destinations, font assets and GSAP.

## Design strategy

Warm ivory, near-black ink and a restrained rust accent. Large sans typography contrasted with editorial serif accents. Portrait integrated into oversized hero composition. Immediate capability proof, then large case studies, services, process, about, final enquiry CTA. Mostly open layouts and rules rather than cards. Dark services section changes the pace. Accessible short email-brief form with an explicit email-client handoff and direct WhatsApp alternative. No fake delivery confirmation.

## Implementation boundaries

Preserve dashboard/auth and content administration. Public project content remains driven by published CMS records; editorial summaries add only facts already documented. Keep all original detailed descriptions. Blog remains accessible but no longer interrupts the primary homepage conversion journey. Testimonials can be added as a dedicated section after work when real quotes are supplied.

## Screenshot provenance

`public/work/wedding-website.png` is an unmodified 1440×960 browser capture of the existing live wedding project after dismissing its music entry screen. The original Supabase image remains stored and the override applies only to that exact old image URL; future CMS uploads take precedence. EssentialHub retains its original published screenshot. Its server returned HTTP 200, but browser navigation was too slow to obtain a replacement. The makeup concept's existing GitHub Pages URL could not be reached from this environment; it remains the original supplied link.

## Content handover

Contact and portrait are centralised in `lib/site.ts`. Curated case-study summaries are in `lib/case-studies.ts`, linked by existing project IDs. To feature Nurexi or the other requested names, provide/publish descriptions, screenshots, URLs, your actual role and any substantiated results. Add testimonials only with genuine approved quotes. No numerical outcome claims were introduced. The enquiry form is explicitly an email-draft handoff, not a server-backed submission system.

## Verification

- Production build and TypeScript passed. Focused lint of all changed TS/TSX files passed.
- Full repository lint: unchanged baseline of 13 errors and 11 warnings in existing dashboard/upload/effect files.
- Chromium checked at 320, 390, 768, 1440 and 1920 pixels with no horizontal overflow.
- Verified mobile menu opens/closes and follows section links, correct heading structure, no nested anchors, service preselection, required-field validation, mailto recipient/body, and clearing a stale prepared draft after editing.
- Published blog detail loads and fits mobile. JavaScript-disabled homepage retains visible content and primary contact navigation.
- Tested routes produced no browser console or hydration errors. Screenshots are in /tmp/portfolio-qa.
- Original public screenshots are copied into public/work to avoid intermittent upstream image optimisation timeouts. Future CMS image changes bypass these snapshots.
- User's existing pnpm-workspace.yaml changes, removed heroImg.jpg, and supplied oge-hero.png were preserved.

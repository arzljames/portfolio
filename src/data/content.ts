// All site copy lives here — edit this file to update the portfolio.

export type IconName = "code" | "globe" | "sparkles" | "bolt" | "palette";

export type ProjectCategory = "fullstack" | "internal" | "backend" | "mobile";

/** Drives the badge on a project's image; `released` shows none. */
export type ProjectStatus = "featured" | "live" | "private" | "retired" | "concept" | "released";

export interface ProjectImage {
  /** Path in /public, e.g. "/images/projects/hideout/voice-channel.png". */
  src: string;
  alt: string;
  /** Short label shown on the image, e.g. "Voice channel". */
  caption: string;
  /** The image already has its own backdrop (e.g. a phone mock-up), so it fills the frame. */
  bleed?: boolean;
}

export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectSource {
  label: string; // e.g. "App source", "API source"
  url: string;
}

export interface ProjectLinks {
  demo: string | null; // live site; null if not deployed / private / retired
  source: string | ProjectSource[] | null; // repo URL, or several repos (e.g. app + API); null if private
}

export interface MobileProjectLinks extends ProjectLinks {
  download: string | null; // store / APK link; null if not published
}

interface BaseProject {
  id: string;
  sort: number;
  title: string;
  /** Short domain label shown after the category, e.g. "Gaming". */
  tagline: string;
  /** Separate paragraphs with a blank line. */
  description: string;
  highlights?: string[];
  stack: string[];
  images: ProjectImage[];
  status: ProjectStatus;
  notice?: string;
  meta?: ProjectMeta[];
  /** Spans the full width of the grid. */
  wide?: boolean;
}

export type Project =
  | (BaseProject & { category: "mobile"; links: MobileProjectLinks })
  | (BaseProject & { category: Exclude<ProjectCategory, "mobile">; links: ProjectLinks });

export const profile = {
  name: "Arzl James",
  shortName: "A.James",
  role: "Fullstack Developer",
  tagline: "Fullstack dev. UI/UX driven. Shipping with agentic AI.",
  disciplines: ["Fullstack", "UI/UX", "Agentic AI"],
  available: true,
  /** Optional portrait in /public, e.g. "/portrait.jpg". */
  portrait: "/portrait.jpg" as string | undefined,
  email: "arzljames15@gmail.com",
  location: "Zamboanga City, Philippines",
  responseTime: "24h",
  socials: [
    { label: "GitHub", href: "https://github.com/arzljames" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/arzljames" },  ],
};

export const about = {
  paragraphs: [
    "I'm a fullstack web developer with 5 years of experience across both sides of the stack — from responsive, performant interfaces in React and TypeScript to APIs, databases, and real-time services with Node.js and NestJS.",
    "I genuinely love designing things, so I bring a UI/UX mindset to everything I build — caring about spacing, typography, and how an interface feels, not just whether it works. Today I pair that with agentic AI workflows to plan, build, and ship faster without cutting corners.",
  ],
  stats: [
    { value: "5+", label: "Years" },
    { value: "FS", label: "Fullstack" },
    { value: "UX", label: "Design" },
    { value: "AI", label: "Agentic" },
  ],
  services: [
    {
      icon: "globe",
      title: "Fullstack Development",
      description:
        "React, TypeScript, Node.js, NestJS, databases — end-to-end products from UI to API",
    },
    {
      icon: "code",
      title: "Frontend Engineering",
      description:
        "Fast, accessible, pixel-perfect interfaces for web and mobile with React and React Native",
    },
    {
      icon: "sparkles",
      title: "Agentic AI Workflows",
      description:
        "Building with AI agents in the loop — planning, scaffolding, reviewing, and shipping faster",
    },
    {
      icon: "bolt",
      title: "Performance & Quality",
      description:
        "Clean code, optimized builds, and smooth user experiences across devices",
    },
    {
      icon: "palette",
      title: "UI/UX Design",
      description:
        "Designing intuitive flows and polished interfaces — layout, typography, and visual craft",
    },
  ] satisfies { icon: IconName; title: string; description: string }[],
};

export interface Job {
  role: string;
  company: string;
  /** Optional company logo in /public, e.g. "/logos/zeniark.png"; the initial renders otherwise. */
  logo?: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  tags: string[];
}

export const experience: Job[] = [
  {
    role: "Fullstack Web Developer",
    company: "Content.one",
    logo: "/logos/content-one.png",
    location: "Remote · San Francisco, CA",
    period: "Sep 2023 — Present",
    current: true,
    description:
      "Building and maintaining a CMS application built around their core product, Zesty CMS. The app is integrated with Zesty APIs and built with React Native, tailored specifically for The Salvation Army Corps. Also handling customer support alongside development.",
    tags: [
      "React",
      "React Native",
      "Zesty CMS",
      "REST APIs",
      "Customer Support",
    ],
  },
  {
    role: "Backend Developer",
    company: "Zeniark",
    logo: "/logos/zeniark.png",
    location: "Remote · Philippines",
    period: "Aug 2022 — Sep 2023",
    description:
      "Worked in an IT firm, collaborating with a team to build SaaS e-commerce and online e-procurement platforms for various local companies. Focused mainly on the backend side using NestJS, MongoDB, and WebSockets.",
    tags: ["NestJS", "MongoDB", "WebSockets", "SaaS"],
  },
  {
    role: "Fullstack Developer",
    company: "ZCMC",
    logo: "/logos/zcmc.png",
    location: "Zamboanga City, Philippines",
    period: "Jun 2022 — Aug 2022",
    description:
      "Developed a telemedicine application for a local hospital, enabling remote healthcare services. Built end-to-end using React, Node.js, Express, and MongoDB.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    role: "Frontend/SEO Intern",
    company: "Digitalroom Inc.",
    logo: "/logos/digitalroom.png",
    location: "Remote · Philippines",
    period: "Sep 2021 — Mar 2022",
    description:
      "Published new web pages and revised existing ones across a portfolio of niche e-commerce brands, keeping content fresh and optimized for search. Also designed layout templates for articles and blog posts.",
    tags: ["SEO", "Content Publishing", "E-commerce", "Page Layout"],
  },
];

const shot = (
  id: string,
  file: string,
  caption: string,
  extra?: Partial<ProjectImage>,
): ProjectImage => ({
  src: `/images/projects/${id}/${file}.png`,
  alt: `${caption} screen`,
  caption,
  ...extra,
});

const retiredNotice =
  "This app is no longer live — the client has since migrated to a newer platform. The image above is a concept visual.";

export const projects: Project[] = [
  {
    id: "hideout",
    sort: 1,
    title: "Hideout",
    category: "fullstack",
    tagline: "Gaming",
    description:
      "Private rooms for your gaming squad — text and voice, invite only. Players sign in with their Steam account, spin up rooms with text and voice channels, and see what friends are playing right now.",
    highlights: [
      "Sign in with Steam, pulling each player's name, avatar and current game",
      "Invite links with expiry and max-use limits, or invite a Steam user directly",
      "Text and voice channels with speaking, muted and deafened states",
    ],
    stack: ["React", "Vite", "Node.js", "Supabase", "Steam OAuth / Web API"],
    images: [
      shot("hideout", "text-channel", "Text channel"),
      shot("hideout", "voice-channel", "Voice channel"),
      shot("hideout", "invite-people", "Invite people"),
      shot("hideout", "sign-in", "Sign in"),
    ],
    status: "featured",
    links: {
      demo: "https://hideout-app.vercel.app",
      source: [
        { label: "App source", url: "https://github.com/arzljames/hideout" },
        { label: "API source", url: "https://github.com/arzljames/hideout-api" },
      ],
    },
    wide: true,
  },
  {
    id: "creatve",
    sort: 3,
    title: "CreatVe",
    category: "fullstack",
    tagline: "Social",
    description:
      "A social media platform that connects people wherever they are — with real-time notifications and an infinite-scrolling feed.",
    stack: ["Next.js", "Express", "Node.js", "MongoDB"],
    images: [shot("creatve", "home-feed", "Home feed"), shot("creatve", "sign-in", "Sign in")],
    status: "live",
    links: {
      demo: "https://creatve-app.vercel.app",
      source: "https://github.com/arzljames/socmed-app",
    },
  },
  {
    id: "docustream",
    sort: 4,
    title: "DocuStream",
    category: "internal",
    tagline: "Docs",
    description:
      "An internal team hub that brings documentation, RCA reports and release notes into one searchable place — organized by Mobile, Frontend and Backend, with in-app document previews and monthly release notes generated from completed Coda projects and tasks.",
    stack: ["Coda API", "OAuth (Google · Microsoft · GitHub)"],
    images: [
      shot("docustream", "all-documents", "All documents"),
      shot("docustream", "document-viewer", "Document viewer"),
      shot("docustream", "monthly-release-notes", "Release notes"),
      shot("docustream", "upload", "Upload"),
      shot("docustream", "sign-in", "Sign in"),
    ],
    status: "private",
    links: { demo: null, source: null },
  },
  {
    id: "telemedicine",
    sort: 6,
    title: "TeleMedicine",
    category: "fullstack",
    tagline: "Health",
    description:
      "Online consultations that connected patients with care during the COVID-19 pandemic — without leaving home.",
    stack: ["React", "Express", "Node.js", "MongoDB"],
    images: [shot("telemedicine", "concept", "Concept visual")],
    status: "retired",
    notice: retiredNotice,
    links: {
      demo: null,
      source: [
        { label: "App source", url: "https://github.com/arzljames/zcmc_telemedicine" },
        { label: "API source", url: "https://github.com/arzljames/telemedicine-api" },
      ],
    },
  },
  {
    id: "lms",
    sort: 7,
    title: "Learning Management System",
    category: "fullstack",
    tagline: "Education",
    description:
      "A web-based classroom for running school activities — quizzes, assignments and student records in one place.",
    stack: ["React", "Express", "Node.js", "MongoDB"],
    images: [shot("lms", "concept", "Concept visual")],
    status: "retired",
    notice: retiredNotice,
    links: { demo: null, source: null },
  },
  {
    id: "jbaker-eprocurement-api",
    sort: 2,
    title: "JBaker eProcurement API",
    category: "backend",
    tagline: "API",
    description:
      "The backend for an online e-procurement platform — e-commerce, but built for companies. Employees browse company catalogs, raise purchase requests (PR) that move through role-based approvals into purchase orders (PO), and approved orders are paid through Purchase Central, an internal payment gateway.",
    highlights: [
      "Catalog browsing with product images served from S3",
      "PR → approval → PO workflow with live status updates over Socket.IO",
      "Role-based access control and payments through Purchase Central",
    ],
    stack: ["NestJS", "Express", "MongoDB", "Socket.IO", "AWS S3"],
    images: [shot("jbaker-eprocurement-api", "architecture", "System architecture")],
    status: "private",
    links: { demo: null, source: null },
    wide: true,
  },
  {
    id: "yakapp",
    sort: 5,
    title: "YakApp",
    category: "mobile",
    tagline: "Full stack",
    description:
      "A mobile translator and learning app for Yakan — an indigenous language of the Philippines with very few digital resources.\n\nTranslate between English and Yakan by typing or by scanning text from an image with OCR, then keep practicing with built-in learning lessons. A React Native app backed by a Node.js and Express API with MongoDB.",
    stack: ["React Native", "Express", "Node.js", "MongoDB"],
    images: [shot("yakapp", "translate", "Translate", { bleed: true })],
    status: "released",
    meta: [
      { label: "Platform", value: "Android" },
      { label: "Features", value: "Translate · Scan · Learn" },
    ],
    links: {
      demo: null,
      source: "https://github.com/arzljames/Yakapp",
      download: null, // TODO: add the APK / Play Store link
    },
    wide: true,
  },
];

/** Projects in display order. */
export const sortedProjects = [...projects].sort((a, b) => a.sort - b.sort);

export const navLinks = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

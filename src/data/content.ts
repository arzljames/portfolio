// All site copy lives here — edit this file to update the portfolio.

export type IconName = "code" | "globe" | "sparkles" | "bolt" | "palette";

export type ProjectCategory = "Frontend" | "Fullstack" | "Backend";
export type ProjectStatus = "Private" | "Live" | "WIP";
export type ProjectVisual = "dashboard" | "phone" | "brand" | "laptop";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  category: ProjectCategory;
  year: number;
  status: ProjectStatus;
  tags: string[];
  /** Optional screenshot in /public; a styled placeholder renders otherwise. */
  image?: string;
  visual: ProjectVisual;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
}

export const profile = {
  name: "John Doe",
  shortName: "J.Doe",
  role: "Frontend Developer",
  tagline: "Frontend dev. Fullstack capable. Design-driven.",
  disciplines: ["Frontend", "Fullstack", "Design Enthusiast"],
  available: true,
  /** Optional portrait in /public, e.g. "/portrait.jpg". */
  portrait: undefined as string | undefined,
  email: "hello@johndoe.com",
  location: "San Francisco, CA",
  responseTime: "24h",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Twitter / X", href: "https://x.com/" },
  ],
};

export const about = {
  paragraphs: [
    "I'm a web developer with a strong focus on frontend — crafting responsive, performant interfaces with React and TypeScript. I've got a solid backend background too, so I'm comfortable going fullstack when the project calls for it.",
    "Design isn't my job title, but it's something I genuinely love. I bring a designer's eye to everything I build — caring about spacing, typography, and the feel of an interface, not just whether it works.",
  ],
  stats: [
    { value: "FE", label: "Primary" },
    { value: "BE", label: "Background" },
    { value: "UI", label: "Enthusiast" },
  ],
  services: [
    {
      icon: "code",
      title: "Frontend Development",
      description:
        "React, TypeScript, Next.js — building fast, accessible, pixel-perfect UIs",
    },
    {
      icon: "globe",
      title: "Fullstack",
      description:
        "Node.js, REST APIs, databases — end-to-end when the project demands it",
    },
    {
      icon: "sparkles",
      title: "AI-Assisted Development",
      description:
        "Leveraging AI tools to ship faster — smarter scaffolding, code review, and problem-solving",
    },
    {
      icon: "bolt",
      title: "Performance & Quality",
      description:
        "Clean code, optimized builds, and smooth user experiences across devices",
    },
    {
      icon: "palette",
      title: "Design Enthusiasm",
      description:
        "Not a pro designer, but deeply care about layout, typography, and visual craft",
    },
  ] satisfies { icon: IconName; title: string; description: string }[],
};

export const experience = [
  {
    role: "Fullstack Web Developer",
    company: "Content.one",
    location: "Remote · San Francisco, CA",
    period: "Sep 2023 — Present",
    current: true,
    description:
      "Building and maintaining a CMS application built around their core product, Zesty CMS. The app is integrated with Zesty APIs and built with React Native, tailored specifically for The Salvation Army Corps. Also handling customer support alongside development.",
    tags: ["React Native", "Zesty CMS", "REST APIs", "Customer Support"],
  },
  {
    role: "Backend Developer",
    company: "Zeniark",
    location: "Remote · Philippines",
    period: "Aug 2022 — Sep 2023",
    description:
      "Worked in an IT firm, collaborating with a team to build SaaS e-commerce and online e-procurement platforms for various local companies. Focused mainly on the backend side using NestJS, MongoDB, and WebSockets.",
    tags: ["NestJS", "MongoDB", "WebSockets", "SaaS"],
  },
  {
    role: "Fullstack Developer",
    company: "ZCMC",
    location: "Zamboanga City, Philippines",
    period: "Jun 2022 — Aug 2022",
    description:
      "Developed a telemedicine application for a local hospital, enabling remote healthcare services. Built end-to-end using React, Node.js, Express, and MongoDB.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
];

export const projects: Project[] = [
  {
    slug: "dashboard-platform",
    title: "Dashboard Platform",
    summary:
      "A data-rich frontend dashboard with real-time updates, charts, and a clean component architecture built in React and TypeScript.",
    description: [
      "An analytics dashboard for a SaaS product, surfacing growth, revenue and traffic metrics in real time.",
      "Built around a small set of composable chart and card primitives so new views could be assembled quickly without drifting from the design system.",
    ],
    category: "Frontend",
    year: 2024,
    status: "Private",
    tags: ["React", "TypeScript", "REST API", "Recharts"],
    visual: "dashboard",
    featured: true,
  },
  {
    slug: "e-commerce-storefront",
    title: "E-Commerce Storefront",
    summary:
      "End-to-end e-commerce app with a React frontend, Node.js backend, and integrated payment flow.",
    description: [
      "A mobile-first storefront for a boutique retailer, from product catalogue to checkout.",
      "The Node.js API handles inventory, orders and payment webhooks, backed by PostgreSQL.",
    ],
    category: "Fullstack",
    year: 2024,
    status: "Private",
    tags: ["React", "Node.js", "PostgreSQL"],
    visual: "phone",
    featured: true,
  },
  {
    slug: "dev-portfolio",
    title: "Dev Portfolio",
    summary:
      "A personal portfolio site with a focus on clean layout, smooth animations, and performance — designed and built from scratch.",
    description: [
      "This site. Designed and built from scratch with an emphasis on typography, rhythm and motion that stays out of the way.",
      "Ships a small bundle, supports light and dark themes, and respects reduced-motion preferences.",
    ],
    category: "Frontend",
    year: 2023,
    status: "Live",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    visual: "brand",
    featured: true,
  },
  {
    slug: "real-estate-api",
    title: "Real Estate API",
    summary:
      "A listings and search API powering a luxury real-estate marketplace, with geo queries and image processing.",
    description: [
      "A REST API serving property listings, agent profiles and saved searches.",
      "Includes geo-radius search, background image processing and rate-limited public endpoints.",
    ],
    category: "Backend",
    year: 2023,
    status: "Private",
    tags: ["NestJS", "MongoDB", "Redis"],
    visual: "laptop",
  },
  {
    slug: "ui-component-library",
    title: "UI Component Library",
    summary:
      "A themeable React component library with accessible primitives, documented in Storybook.",
    description: [
      "A set of accessible, themeable React components shared across internal products.",
      "Every component is keyboard-navigable, documented in Storybook and covered by visual regression tests.",
    ],
    category: "Frontend",
    year: 2023,
    status: "WIP",
    tags: ["React", "TypeScript", "Storybook"],
    visual: "dashboard",
  },
];

export const navLinks = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

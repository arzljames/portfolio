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
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "Twitter / X", href: "https://x.com/" },
  ],
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

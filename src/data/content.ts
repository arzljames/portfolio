// All site copy lives here — edit this file to update the portfolio.

export type ProjectCategory = "fullstack" | "frontend" | "internal" | "backend" | "mobile";

/** Drives the badge on a project's image. */
export type ProjectStatus = "live" | "private" | "internal" | "source" | "retired";

export interface ProjectImage {
  /** Path in /public, e.g. "/images/projects/hideout/voice-channel.png". */
  src: string;
  alt: string;
  /** Short label shown on the image, e.g. "Voice channel". */
  caption: string;
  /** The image already has its own backdrop (e.g. a phone mock-up), so it fills the frame. */
  bleed?: boolean;
  /** A recreation rather than a real screenshot; labelled "Concept visual". */
  concept?: boolean;
  /** Sentence shown under the image in the project page gallery. */
  description?: string;
}

/** A "What it does" row on the project page. */
export interface ProjectFeature {
  title: string;
  description: string;
  image: ProjectImage;
}

/** An "Under the hood" card, e.g. the client or the API. */
export interface ProjectPart {
  label: string;
  title: string;
  description: string;
  repo?: ProjectSource;
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
  /** One or two sentences for the project cards. */
  summary: string;
  /** Full write-up for the project page. Separate paragraphs with a blank line. */
  description: string;
  highlights?: string[];
  stack: string[];
  images: ProjectImage[];
  status: ProjectStatus;
  notice?: string;
  meta?: ProjectMeta[];
  /** Spans the full width of the projects grid. */
  wide?: boolean;
  /** Shown as "Type" on the project page; defaults to one based on the category. */
  type?: string;
  /** Your role on the project; defaults to "Solo design & build". */
  role?: string;
  /** `heading` can contain "\n" for a line break. */
  features?: { heading: string; items: ProjectFeature[] };
  architecture?: { heading: string; parts: ProjectPart[] };
}

export type Project =
  | (BaseProject & { category: "mobile"; links: MobileProjectLinks })
  | (BaseProject & { category: Exclude<ProjectCategory, "mobile">; links: ProjectLinks });

export const categoryLabels: Record<ProjectCategory, string> = {
  fullstack: "Full stack",
  frontend: "Frontend",
  internal: "Internal tool",
  backend: "Backend",
  mobile: "Mobile",
};

/** Default "Type" on the project page when a project doesn't set one. */
export const categoryTypes: Record<ProjectCategory, string> = {
  fullstack: "Full-stack web app",
  frontend: "Website",
  internal: "Internal web tool",
  backend: "Backend API",
  mobile: "Mobile app",
};

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  private: "Private",
  internal: "Internal",
  source: "Source only",
  retired: "No longer live",
};

export const profile = {
  name: "Arzl James",
  shortName: "A.James",
  role: "Fullstack Developer",
  /** Hero headline: the first part is bright, the second muted. */
  headline: ["Fullstack dev. UI/UX driven.", "Shipping with agentic AI."],
  intro:
    "Five years building React and Node products end to end. Currently fullstack at Content.one, working remotely with a San Francisco team from the Philippines.",
  available: true,
  /** Optional portrait in /public, e.g. "/portrait.jpg". */
  portrait: "/portrait.jpg" as string | undefined,
  email: "arzljames15@gmail.com",
  location: "Zamboanga City, Philippines",
  country: "Philippines",
  /** IANA time zone for the live local clock. */
  timeZone: "Asia/Manila",
  utcOffset: "UTC+8",
  responseTime: { value: "Within 24h", detail: "on weekdays" },
  socials: [
    { label: "GitHub", href: "https://github.com/arzljames" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/arzljames" },
  ],
};

export const stats = [
  { value: "5+ years", label: "Building for the web since 2021" },
  { value: "Full stack", label: "Interface, API and database" },
  { value: "4 teams", label: "Most of it remote" },
  { value: "UTC+8", label: "Replies within a day" },
];

export const about = {
  paragraphs: [
    "I'm a fullstack developer with five years across both sides of the stack — responsive, fast interfaces in React and TypeScript, and the APIs, databases and real-time services behind them in Node.js and NestJS.",
    "I genuinely love designing, so I care about spacing, typography and how an interface feels — not just whether it works. Today I pair that with agentic AI workflows to plan, build and ship faster without cutting corners.",
  ],
  services: [
    {
      title: "Fullstack development",
      description:
        "Whole products, from the interface to the API and database — fast, accessible, and tidy under the hood.",
      tags: ["React", "TypeScript", "React Native", "Node", "NestJS", "MongoDB"],
    },
    {
      title: "UI/UX design",
      description:
        "Intuitive flows and polished interfaces, designed with the same care as the code that runs them.",
      tags: ["Flows", "Layout", "Typography", "Interaction"],
    },
    {
      title: "Agentic AI workflows",
      description:
        "AI agents in the loop to plan, scaffold and review — so features ship faster without cutting corners.",
      tags: ["Plan", "Scaffold", "Review", "Ship"],
    },
  ],
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
      "Building a React Native CMS app on the Zesty CMS APIs, tailored for The Salvation Army Corps — and handling customer support alongside development.",
    tags: ["React", "React Native", "Zesty CMS", "REST APIs"],
  },
  {
    role: "Backend Developer",
    company: "Zeniark",
    logo: "/logos/zeniark.png",
    location: "Remote · Philippines",
    period: "Aug 2022 — Sep 2023",
    description:
      "Backends for SaaS e-commerce and online e-procurement platforms for local companies, as part of a product team.",
    tags: ["NestJS", "MongoDB", "WebSockets"],
  },
  {
    role: "Fullstack Developer",
    company: "ZCMC",
    logo: "/logos/zcmc.png",
    location: "Zamboanga City, Philippines",
    period: "Jun 2022 — Aug 2022",
    description:
      "A telemedicine app for a local hospital, enabling remote healthcare — built end to end.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    role: "Frontend / SEO Intern",
    company: "Digitalroom Inc.",
    logo: "/logos/digitalroom.png",
    location: "Remote · Philippines",
    period: "Sep 2021 — Mar 2022",
    description:
      "Published and revised pages across niche e-commerce brands, optimized for search, and designed article layout templates.",
    tags: ["SEO", "Content publishing", "Page layout"],
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
    summary:
      "Private rooms for your gaming squad — text and voice, invite only. Sign in with Steam and see what friends are playing right now.",
    description:
      "Private rooms for your gaming squad — text and voice, invite only. Players sign in with Steam, spin up rooms, and see what friends are playing right now.",
    highlights: [
      "Sign in with Steam, pulling each player's name, avatar and current game",
      "Invite links with expiry and max-use limits, or invite a Steam user directly",
      "Text and voice channels with speaking, muted and deafened states",
    ],
    stack: ["React", "Vite", "Node.js", "Supabase", "Steam OAuth / Web API"],
    images: [
      shot("hideout", "text-channel", "Text channel", {
        description:
          "Text channels for plans, clips and everything else — with typing indicators and edits.",
      }),
      shot("hideout", "voice-channel", "Voice channel", {
        description:
          "Voice channels show who's speaking, muted or deafened — and what each person is playing.",
      }),
      shot("hideout", "invite-people", "Invite people", {
        description: "Invite links with an expiry and a use limit, or invite a Steam user directly.",
      }),
      shot("hideout", "sign-in", "Sign in", {
        description: "One click with Steam — Hideout only reads a public profile.",
      }),
    ],
    features: {
      heading: "A clubhouse for your squad\n— no strangers, no setup.",
      items: [
        {
          title: "Sign in with Steam",
          description:
            "One click with the account players already have. Hideout only reads a public profile — name, avatar and current game — so friends can see what everyone's playing.",
          image: shot("hideout", "sign-in", "Sign in"),
        },
        {
          title: "Invite only, on your terms",
          description:
            "Rooms stay private. Share a link that expires after a set time or a set number of uses — or invite a Steam user directly.",
          image: shot("hideout", "invite-people", "Invite people"),
        },
        {
          title: "Voice that feels live",
          description:
            "Text and voice channels side by side. See who's speaking, muted or deafened at a glance — and what each of them is playing.",
          image: shot("hideout", "voice-channel", "Voice channel"),
        },
      ],
    },
    architecture: {
      heading: "Two repos, one product.",
      parts: [
        {
          label: "Client",
          title: "React + Vite",
          description: "The rooms, channels, chat and voice UI.",
          repo: { label: "arzljames/hideout", url: "https://github.com/arzljames/hideout" },
        },
        {
          label: "API",
          title: "Node.js",
          description: "Rooms, invites and the Steam integration.",
          repo: { label: "arzljames/hideout-api", url: "https://github.com/arzljames/hideout-api" },
        },
        {
          label: "Data & identity",
          title: "Supabase + Steam",
          description:
            "Supabase for app data; Steam OAuth and Web API for sign-in, profiles and current games.",
        },
      ],
    },
    status: "live",
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
    sort: 4,
    title: "CreatVe",
    category: "fullstack",
    tagline: "Social",
    summary:
      "A social platform that connects people wherever they are — real-time notifications and an infinite-scrolling feed.",
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
    sort: 5,
    title: "DocuStream",
    category: "internal",
    tagline: "Docs",
    summary:
      "One searchable hub for docs, RCA reports and release notes — with monthly notes generated from completed Coda projects and tasks.",
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
    status: "internal",
    links: { demo: null, source: null },
  },
  {
    id: "telemedicine",
    sort: 7,
    title: "TeleMedicine",
    category: "fullstack",
    tagline: "Health",
    summary:
      "Online consultations that connected patients with care during the COVID-19 pandemic — without leaving home.",
    description:
      "Online consultations that connected patients with care during the COVID-19 pandemic — without leaving home.",
    stack: ["React", "Express", "Node.js", "MongoDB"],
    images: [shot("telemedicine", "concept", "Concept visual", { concept: true })],
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
    sort: 8,
    title: "Learning Management System",
    category: "fullstack",
    tagline: "Education",
    summary:
      "A web classroom for running school activities — quizzes, assignments and student records in one place.",
    description:
      "A web-based classroom for running school activities — quizzes, assignments and student records in one place.",
    stack: ["React", "Express", "Node.js", "MongoDB"],
    images: [shot("lms", "concept", "Concept visual", { concept: true })],
    status: "retired",
    notice: retiredNotice,
    links: { demo: null, source: null },
  },
  {
    id: "jbaker-eprocurement-api",
    sort: 2,
    title: "JBaker eProcurement API",
    role: "Backend developer, working with a team of backend devs",
    category: "backend",
    tagline: "API",
    summary:
      "The backend for a B2B e-procurement platform: purchase requests move through role-based approvals into orders, live over Socket.IO.",
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
  },
  {
    id: "yume",
    sort: 3,
    title: "Yume",
    category: "frontend",
    tagline: "Photography",
    type: "Client website",
    summary:
      "A cinematic portfolio for a photo and film studio — debuts, prenups, weddings and celebrations, told in chapters.",
    description:
      "A portfolio website commissioned by Yume, a photo and film studio in Zamboanga City. It opens on a playing reel, tells the studio's work in chapters — debuts, prenups, weddings and celebrations — and ends with a filterable archive of every event, their films and coverage packages.",
    highlights: [
      "A full-width video reel in the hero, with films that play in the page",
      "Work told in four chapters — debuts, prenups, weddings and celebrations",
      "A filterable archive of every event, with a photo preview for each",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
    images: [
      shot("yume", "hero", "Hero reel", {
        description: "The site opens on the studio's reel — \"The days you'll want to live twice.\"",
      }),
      shot("yume", "debuts", "Debuts", {
        description: "Each kind of event gets its own chapter, with an editorial photo layout.",
      }),
      shot("yume", "weddings", "Weddings", {
        description: "Weddings told from the morning preparations to the last dance.",
      }),
      shot("yume", "archive", "Archive", {
        description: "Every event in order, filterable by type, with a photo preview for each one.",
      }),
      shot("yume", "films", "Films", {
        description: "Highlight films and same-day edits that play right in the page.",
      }),
      shot("yume", "coverage", "Coverage", {
        description: "Coverage packages for photography, film, or both — with starting prices.",
      }),
    ],
    features: {
      heading: "A studio's work,\ntold like a film.",
      items: [
        {
          title: "Chapters, not galleries",
          description:
            "Debuts, prenups, weddings and celebrations each get a chapter of their own — a short line about the occasion and an editorial spread of the day.",
          image: shot("yume", "weddings", "Weddings"),
        },
        {
          title: "Every event, in order",
          description:
            "An archive of every event the studio has covered, filterable by type, with a photo preview for each one and a link to the full albums.",
          image: shot("yume", "archive", "Archive"),
        },
        {
          title: "Press play",
          description:
            "A video reel up top and films further down — highlight films and same-day edits that visitors can watch without leaving the page.",
          image: shot("yume", "films", "Films"),
        },
      ],
    },
    status: "live",
    links: {
      demo: "https://yume-photography.vercel.app",
      source: "https://github.com/arzljames/yume",
    },
  },
  {
    id: "yakapp",
    sort: 6,
    title: "YakApp",
    category: "mobile",
    tagline: "Full stack",
    summary:
      "Translate between English and Yakan — an indigenous language of the Philippines — by typing or scanning text, then keep practicing with lessons.",
    description:
      "A mobile translator and learning app for Yakan — an indigenous language of the Philippines with very few digital resources.\n\nTranslate between English and Yakan by typing or by scanning text from an image with OCR, then keep practicing with built-in learning lessons. A React Native app backed by a Node.js and Express API with MongoDB.",
    stack: ["React Native", "Express", "Node.js", "MongoDB"],
    images: [shot("yakapp", "translate", "Translate", { bleed: true })],
    status: "source",
    meta: [
      { label: "Platform", value: "Android" },
      { label: "Features", value: "Translate · Scan · Learn" },
    ],
    links: {
      demo: null,
      source: "https://github.com/arzljames/Yakapp",
      download: null, // TODO: add the APK / Play Store link
    },
  },
];

/** Projects in display order. */
export const sortedProjects = [...projects].sort((a, b) => a.sort - b.sort);

export const navLinks = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Work", id: "projects" },
  { label: "Contact", id: "contact" },
];

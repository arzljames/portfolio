# Portfolio

Personal portfolio built with React 19, TypeScript, Vite 8, Tailwind CSS 4, Framer Motion and React Router.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run lint     # lint the project
npm run preview  # preview the production build
```

## Editing content

All copy lives in [`src/data/content.ts`](src/data/content.ts): name, bio, services, experience, projects, contact details and social links.

- **Portrait**: put an image in `public/` and set `profile.portrait` (for example `"/portrait.jpg"`). Until then, initials are shown.
- **Project screenshots**: put images in `public/images/projects/<id>/` and list them in the project's `images`. Several images become a carousel; set `bleed: true` on an image that brings its own backdrop (like a phone mock-up).
- **Project order and layout**: `sort` sets the order, and `wide: true` makes a card span the full width. The first three projects also appear on the home page, the first one as the large featured card. `summary` is the short text on cards; `description` is the full write-up on the project page.
- **Project pages** (`/projects/:id`) grow with the data you add. These are all optional: `type` and `role` for the info card, a `description` on each image for the gallery caption, `features` for the "What it does" rows, and `architecture` for the "Under the hood" cards. `role` defaults to "Solo design & build".
- **Project links**: set `demo`, `source` (and `download` for mobile apps) to `null` to hide that button. `source` can also be a list like `[{ label: "API source", url: "…" }]` for projects split across repos.

## Routes

| Path | Page |
|---|---|
| `/` | Home: hero, about, experience, featured work, contact |
| `/projects` | All projects, filterable by category |
| `/projects/:id` | Project details |

This is a single-page app using client-side routing, so the host must serve `index.html` for unknown paths (for example a `_redirects` rule on Netlify or a rewrite on Vercel).

## Theming

Colors are CSS variables in [`src/index.css`](src/index.css). The site is dark-only, with an orange accent (`--accent`).

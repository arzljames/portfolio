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
- **Project screenshots**: put images in `public/projects/` and set `image` on each project. Until then, a styled CSS mock-up is shown.
- **Featured projects**: set `featured: true`. The first featured project is shown large on the home page, the next two below it. Every project appears on `/projects`.

## Routes

| Path | Page |
|---|---|
| `/` | Home: hero, about, experience, featured work, contact |
| `/projects` | All projects, filterable by category |
| `/projects/:slug` | Project details |

This is a single-page app using client-side routing, so the host must serve `index.html` for unknown paths (for example a `_redirects` rule on Netlify or a rewrite on Vercel).

## Theming

Colors are CSS variables in [`src/index.css`](src/index.css), with a dark (default) and a light palette. The navbar toggle switches between them and remembers the choice.

# Patrick Maxiao Ma — Portfolio Website

A responsive, single-page portfolio built with React 19, TypeScript, Vite,
Tailwind CSS, Framer Motion, and Lucide icons.

## Development

Use Node.js 22.12+ and npm. From the repository root, `nvm use` reads the
checked-in `.nvmrc` and selects the correct version.

```bash
nvm use
npm install
npm run dev
```

The development server is available at `http://localhost:5173`.

Available commands:

- `npm run dev` starts Vite.
- `npm run lint` runs ESLint.
- `npm run build` type-checks and creates the production build.
- `npm run preview` serves the production build locally.

## Architecture

```text
src/
├── components/
│   ├── ui/          Shared design-system components
│   └── *Navigation Navigation for desktop and mobile
├── config/          Shared section configuration
├── content/         Portfolio data and external links
├── hooks/           Scroll and interaction behavior
├── lib/             Class and animation helpers
├── pages/           Route-level composition
├── sections/        Home-page sections
└── types/           Portfolio content types
```

The `/` route is a single scrolling page with Home, About, Experience,
Projects, and Contact sections. The `/email` route contains the Netlify contact
form.

## Updating content

Most portfolio content lives in `src/content/portfolio.ts`. Update projects,
experience, skills, social links, and contact links there instead of editing
rendering components.

Long-form About copy currently lives in `src/sections/AboutSection.tsx`.

## Updating the design

- Change global color values in `src/index.css`.
- Change semantic Tailwind mappings and shadows in `tailwind.config.js`.
- Change reusable buttons, cards, tags, headings, and expandable panels in
  `src/components/ui/`.
- Change section-specific layout in `src/sections/`.
- Change shared animation behavior in `src/lib/motion.ts`.

The `cyber-*` Tailwind names remain as compatibility aliases. New reusable
components should prefer semantic names such as `background`, `surface`,
`foreground`, `muted`, `border`, and `accent-*`.

## Contact form

The React form posts to Netlify Forms. `public/__forms.html` is the static form
declaration Netlify detects during deployment. Keep its field names synchronized
with `src/pages/EmailMe.tsx`.

No API server or `VITE_API_URL` is required. Notification setup and deployment
instructions are in the repository's `DEPLOYMENT_GUIDE.md`.

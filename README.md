# umangjpatel.dev

Personal portfolio website styled as a retro terminal/developer console using the Dracula color theme.

## Pages

- **Home** (`/`) — Scrollable single-page with Hero, Experience, Skills, Education, and Contact sections. Includes a side dot-nav for desktop.
- **Goodies** (`/goodies`) — Toy projects hub with a card grid linking to individual experiments.
  - **Tic-Tac-Toe** (`/goodies/tictactoe`) — Classic 3×3 game with two-player and AI modes (easy/hard via minimax).
- **404** — Catch-all not-found page.

## Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | React 19, TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Routing | React Router DOM 7 |
| Animations | GSAP 3 + ScrollTrigger |
| Components | shadcn/ui, Lucide React |
| Linting | ESLint 10 (`typescript-eslint`, `react-hooks`, `react-refresh`) |
| Formatting | Prettier + `prettier-plugin-tailwindcss` |

## Getting Started

```bash
npm install
npm run dev
```

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier on all TS/TSX files |
| `npm run typecheck` | TypeScript type-check without emitting |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── main.tsx              # Entry point, router setup, providers
├── App.tsx               # Root layout (background + header + outlet + footer)
├── index.css             # Tailwind imports, Dracula theme variables, custom effects
├── components/
│   ├── ui/               # shadcn/ui primitives (badge, button, card, separator, tooltip)
│   ├── hero-section.tsx
│   ├── experience-section.tsx
│   ├── skills-section.tsx
│   ├── education-section.tsx
│   ├── contact-section.tsx
│   ├── projects-section.tsx
│   ├── terminal-header.tsx
│   ├── side-nav.tsx
│   ├── footer.tsx
│   ├── pixel-background.tsx
│   ├── pixel-logos.tsx
│   ├── skill-logo-carousel.tsx
│   └── theme-provider.tsx
├── pages/
│   ├── home.tsx
│   ├── goodies.tsx
│   ├── tic-tac-toe.tsx
│   └── not-found.tsx
├── hooks/
│   └── use-tilt.ts
└── lib/
    ├── data.ts           # All static content
    └── utils.ts          # cn() utility
```

## Design Language

- Terminal/console aesthetic with Dracula color palette
- Monospace typography (JetBrains Mono)
- Retro effects: scanlines, noise texture, pixel grid background, blinking cursor
- GSAP-powered scroll animations and parallax layers

## Deployment

GitHub Pages via GitHub Actions. SPA 404 fallback handled by copying `dist/index.html` to `dist/404.html` at build time.

## Adding UI Components

```bash
npx shadcn@latest add <component>
```

Components are placed in `src/components/ui/` and imported via the `@/` path alias:

```tsx
import { Button } from "@/components/ui/button"
```

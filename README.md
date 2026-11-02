# Dev Portfolio

A professional personal portfolio built with React, TypeScript, and modern web technologies. Showcasing projects, skills, and experience as a full-stack developer.

**Live:** [Coming soon]  
**GitHub:** [Dev-Tiwari-CS](https://github.com/Dev-Tiwari-CS)

## Features

- **Smooth Animations** — Engaging interactions using Framer Motion, GSAP, and Three.js
- **Responsive Design** — Beautiful on desktop, tablet, and mobile
- **Dark & Light Themes** — Toggle between modes with persistent preference
- **3D Effects** — Interactive 3D orb in the hero section
- **Fast Performance** — Optimized builds with TanStack Start and Vite
- **SEO Optimized** — Proper meta tags, Open Graph, and structured data
- **Accessible** — Built with accessibility best practices and ARIA attributes

## Tech Stack

- **React 19** — Modern React with latest hooks and features
- **TypeScript** — Type-safe code throughout the project
- **TanStack Start** — Full-stack React framework with SSR
- **Tailwind CSS v4** — Utility-first styling with custom theme
- **Framer Motion** — Declarative animations and transitions
- **GSAP & ScrollTrigger** — Advanced scroll-based animations
- **Three.js & @react-three/fiber** — 3D graphics and WebGL
- **Lenis** — Smooth scroll library
- **Radix UI** — Accessible component primitives
- **TanStack Router** — Modern client-side routing
- **TanStack Query** — Data fetching and caching
- **React Hook Form** — Efficient form state management
- **Vite** — Lightning-fast build tool

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Hero section with 3D orb and headline
│   ├── HeroOrb.tsx           # Three.js 3D orb component
│   ├── Chrome.tsx            # Navigation, theme toggle, scroll progress
│   ├── Cursor.tsx            # Custom animated cursor
│   ├── Sections.tsx          # Portfolio sections (About, Skills, Projects, etc.)
│   ├── Preloader.tsx         # Loading animation
│   ├── fx.tsx                # Animation utilities (Reveal, Magnetic, etc.)
│   └── ui/                   # Reusable UI components (button, dialog, etc.)
├── data/
│   └── portfolio.ts          # Portfolio content (edit this to customize)
├── routes/
│   ├── index.tsx             # Home page and main layout
│   └── __root.tsx            # Root layout with error handling
├── lib/
│   ├── site.ts               # Scroll and theme utilities
│   ├── contact.ts            # Contact form validation and submission
│   ├── error-capture.ts      # Error handling and reporting
│   └── utils.ts              # General utilities
├── styles.css                # Global styles, theme variables, animations
├── router.tsx                # Router configuration
├── start.ts                  # Server middleware setup
└── server.ts                 # SSR error handling wrapper
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dev-portfolio.git
cd dev-portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page will reload as you make changes.

### Production Build

```bash
npm run build
```

Build output is generated in the `.output/` directory, ready for deployment.

### Preview Build

```bash
npm run preview
```

Locally preview the production build before deploying.

## Customization

### Update Portfolio Content

All portfolio content is centralized in `src/data/portfolio.ts`. Edit this file to customize:

- Name, title, and introduction
- Skills and categories
- Projects and work
- Experience and education
- Social links and contact info
- Resume URL (when available)
- Contact form endpoint (Formspree)

**Do not modify React components to change content** — update `src/data/portfolio.ts` instead.

### Add a Resume

1. Place your resume PDF at `public/resume.pdf`
2. Update `profile.resumeUrl` in `src/data/portfolio.ts`:
   ```typescript
   resumeUrl: "resume.pdf"
   ```

### Connect Contact Form

1. Create a free form at [Formspree](https://formspree.io/)
2. Copy your form endpoint (e.g., `https://formspree.io/f/YOUR_FORM_ID`)
3. Update `src/data/portfolio.ts`:
   ```typescript
   formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID"
   ```

The contact form will automatically validate and submit messages to your email.

### Customize Styling

Global styles and theme variables are in `src/styles.css`:

- **CSS Variables** — Update colors, spacing, radii
- **Tailwind Config** — Extend or override Tailwind settings
- **Animations** — Global animations and transitions
- **Theme Switching** — Dark and light theme values

## Deployment

This project can be deployed to any platform supporting Node.js:

### Vercel (Recommended)

Vercel is the official deployment platform for TanStack Start:

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy .output/public for static or use Netlify Functions for SSR
```

### Cloudflare Pages

```bash
npm run build
# Deploy from .output/server using Wrangler
```

### Traditional Hosting

```bash
npm run build
cd .output/server
node index.mjs  # or use your hosting provider's Node.js runtime
```

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run build:dev  # Build in development mode
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm run test       # Run tests with Vitest
npm run test:watch # Run tests in watch mode
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The portfolio is optimized for performance:

- **Code Splitting** — Route-based code splitting
- **CSS-in-JS** — Only loaded CSS for rendered components
- **Image Optimization** — Optimized assets in public/
- **Smooth Animations** — GPU-accelerated transforms
- **Production Build** — Minified and optimized by Vite

Lighthouse scores: 90+ Performance, 100 Accessibility, 100 Best Practices

## Accessibility

This project follows web accessibility best practices:

- Semantic HTML
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader friendly

## Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TanStack Start](https://tanstack.com/start/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Three.js](https://threejs.org)

## License

This project is open source under the MIT License. See LICENSE file for details.

## Author

**Dev Kumar Tiwari**

- 💼 [LinkedIn](https://linkedin.com/in/dev-kumar-tiwari-44006724a)
- 🐙 [GitHub](https://github.com/Dev-Tiwari-CS)
- 📧 [Email](mailto:devtiwarimp@gmail.com)
- 📍 Pune, Maharashtra, India

## Feedback & Support

Found a bug or have a suggestion? Open an issue on GitHub or reach out via email.

---

**Last Updated:** October 2026


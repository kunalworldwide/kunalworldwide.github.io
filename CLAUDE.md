# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and technical blog for Kunal Das (kunaldas.net), built with Astro. The site showcases DevOps expertise, cloud architecture knowledge, blog posts, conference talks, and media appearances.

## Development Commands

```bash
# Start local development server (from astro-site/ directory)
cd astro-site && npm run dev

# Build for production
cd astro-site && npm run build

# Preview production build
cd astro-site && npm run preview
```

Deployment is automated via GitHub Actions on push to `main` branch.

## Architecture

```
astro-site/
├── astro.config.mjs          # Site config (integrations, sitemap)
├── src/
│   ├── components/
│   │   ├── ui/               # Navbar, Footer, etc.
│   │   └── sections/         # Page sections (React components)
│   ├── content/
│   │   ├── talks/            # Talk MDX files
│   │   └── projects/         # Project MDX files
│   ├── layouts/
│   │   └── BaseLayout.astro  # Main layout (includes easter eggs)
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── about.astro       # About page
│   │   ├── contact.astro     # Contact page
│   │   ├── media.astro       # Media/YouTube appearances
│   │   ├── communities.astro # Community involvement
│   │   ├── posts/            # Blog listing
│   │   ├── talks/            # Talks listing & detail pages
│   │   └── projects/         # Projects listing & detail pages
│   └── styles/
│       └── global.css        # Global styles
├── public/
│   ├── robots.txt            # SEO robots file
│   └── [static assets]       # Images, favicons, etc.
└── package.json
```

## Content Conventions

- **Talks**: Create as `astro-site/src/content/talks/talk-slug.mdx`
- **Projects**: Create as `astro-site/src/content/projects/project-slug.mdx`
- **Media**: Edit the videos array in `astro-site/src/pages/media.astro`

## Key Configuration

- **astro.config.mjs**: Site URL, integrations (MDX, React, Sitemap)
- **public/robots.txt**: Sitemap reference for SEO
- **public/CNAME**: Custom domain (kunaldas.net)

## Easter Eggs

The site includes hidden easter eggs in `BaseLayout.astro`:
- Type "devops" anywhere → Retro terminal mode (green CRT effect)
- Type "kubectl" anywhere → Screen glitch effect
- Hint in footer: "psst... it's just a devops phase"

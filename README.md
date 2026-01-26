# [kunaldas.net](https://kunaldas.net) [![Deploy Astro Site](https://github.com/kunalworldwide/kunalworldwide.github.io/actions/workflows/deploy-astro.yml/badge.svg)](https://github.com/kunalworldwide/kunalworldwide.github.io/actions/workflows/deploy-astro.yml)

Personal portfolio and technical blog built with Astro.

## Overview

This website serves as my personal portfolio and blog, featuring:

- Technical articles and tutorials
- Conference talks and presentations
- Media appearances (podcasts, livestreams)
- Project showcases
- Community involvement

## Tech Stack

- **Framework**: [Astro](https://astro.build/) with React components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: GitHub Actions → GitHub Pages
- **Domain**: kunaldas.net

## Local Development

```bash
# Navigate to the Astro site
cd astro-site

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
astro-site/
├── src/
│   ├── components/    # React & Astro components
│   ├── content/       # MDX content (talks, projects)
│   ├── layouts/       # Page layouts
│   ├── pages/         # Route pages
│   └── styles/        # Global styles
├── public/            # Static assets
└── astro.config.mjs   # Astro configuration
```

## Deployment

Pushes to `main` branch trigger automatic deployment via GitHub Actions.

## License

This project is licensed under the terms in the [LICENSE](LICENSE) file.

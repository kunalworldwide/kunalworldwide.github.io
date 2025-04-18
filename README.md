# [kunaldas.dev](https://kunaldas.dev) [![Deploy Quarto Website](https://github.com/kunalworldwide/kunalworldwide.github.io/actions/workflows/deploy-quarto-website.yml/badge.svg)](https://github.com/kunalworldwide/kunalworldwide.github.io/actions/workflows/deploy-quarto-website.yml)

Welcome to the repository for my personal website! This site is built using Quarto and automatically deployed using GitHub Actions.

## 📋 Overview

This website serves as my personal portfolio and blog, where I share:

- Technical articles and tutorials
- Talks and presentations
- Project showcases
- Professional experience

## 🛠️ Technology Stack

- **Framework**: [Quarto](https://quarto.org/) - An open-source scientific and technical publishing system
- **Deployment**: GitHub Actions with automated build and deployment to GitHub Pages
- **Hosting**: GitHub Pages with custom domain (kunaldas.dev)

## 🚀 Deployment Process

The site follows a modern CI/CD workflow:

1. Content is authored in the `main` branch using Quarto's `.qmd` format
2. When changes are pushed to `main`, GitHub Actions automatically:
   - Renders the Quarto project
   - Publishes the built site to the `gh-pages` branch
3. GitHub Pages serves the content from the `gh-pages` branch

## 📊 Build Status

The status badge at the top of this README shows the current state of the deployment workflow. Click on it to view detailed workflow runs and logs.

If the badge shows:
- ✅ **Passing (green)**: The site has been successfully built and deployed
- ❌ **Failing (red)**: There's an issue with the build or deployment process
- 🟡 **In progress (yellow)**: A deployment is currently in progress

## 🧑‍💻 Local Development

To work on this website locally:

1. Clone this repository
2. Install [Quarto CLI](https://quarto.org/docs/get-started/)
3. Navigate to the `mywebsite/` directory
4. Run `quarto preview` to start a local development server
5. Make your changes and see them live at `http://localhost:4000`

## 📝 License

This project is licensed under the terms included in the [LICENSE](LICENSE) file.


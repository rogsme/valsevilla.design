# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
hugo server --bind 0.0.0.0    # Dev server with hot reload at http://localhost:1313
hugo                           # Build static site to public/
```

No package manager, bundler, or test runner — Hugo is the only build tool. Requires Hugo Extended v0.161.0+.

## Architecture

Custom Hugo site (no theme) for a designer portfolio. Single-page homepage with anchor navigation plus individual project case study pages.

### Homepage composition

`layouts/index.html` assembles 6 section partials in order:

```
sections/hero.html → sections/services.html → sections/about.html
→ sections/portfolio.html → sections/blog.html → sections/contact.html
```

### Data-driven sections

Repeating content lives in `data/*.toml`, iterated in partials via `hugo.Data`:
- `services.toml` — 4 service cards (`[[items]]` with title, description, icon path, color)
- `timeline.toml` — 5 career entries (`[[entries]]` with title, period, description, dotColor)
- `social.toml` — 3 social links (`[[links]]` with name, url, icon filename)

### Content

Projects use page bundles: `content/projects/{slug}/index.md`. Front matter requires `title`, `category`, `summary`, `thumbnail` (filename in `static/images/projects/`), and `weight` (sort order). The portfolio section renders them with `(where site.RegularPages "Section" "projects").ByWeight`.

### SCSS pipeline

`assets/scss/style.scss` is the single entry point, compiled via Hugo Pipes in `layouts/partials/head.html`:
```
resources.Get "scss/style.scss" | toCSS | minify | fingerprint
```

Import order: `_variables` → `_fonts` → `_reset` → `_typography` → `_layout` → `components/*` → `pages/*`

### Design system

**Fonts:** DM Sans (body, Google Fonts) + Cabinet Grotesk (headings/nav/buttons, self-hosted woff2 in `static/fonts/`)

**Color palette (Webflow pastels):** purple `#d8b3f4`, pink `#fdcbf5`, green `#d1f3a3`, red `#ffa3a3`, blue `#c9e3fa`, orange `#ffc669`, dark `#1d1d1d`, primary `#7575c8`

**Signature patterns:**
- `$border: 2px solid $dark` on cards, images, badges, buttons
- `.btn-3d` component: `.btn-front` (white, bordered) + `.btn-edge` (colored, offset -6px) for pseudo-3D effect
- `.badge` component: orange bg, dark border, Cabinet Grotesk 14px/800, uppercase
- `.background-{color}` classes on `.wrapper` and `.card` elements
- Breakpoint mixins: `@include respond-to(sm|md|lg|xl)` (mobile-first min-width)
- Typography scale: `.display-1` (70px) through `.display-7`, `.paragraph-large` (24px)
- Decorative SVG doodles positioned absolutely within `.position-relative` parents

### JS

`assets/js/main.js` — vanilla JS, mobile menu toggle only. Processed via Hugo Pipes (`minify | fingerprint`).

## Conventions

- Colors applied via `.background-{palette-name}` classes (purple, green, red, pink, blue, orange)
- Section wrappers: `<div class="wrapper background-purple border-bottom">` pattern
- Spacing utilities: `.margin-bottom-{15,20,25,30,35,45}`, `.margin-bottom-none`
- Image paths are absolute from root: `/images/projects/`, `/images/doodles/`, `/images/social/`
- Social icons are SVGs at `static/images/social/{name}.svg`
- Contact form uses Formspree (`formspreeEndpoint` param in hugo.toml — currently placeholder)

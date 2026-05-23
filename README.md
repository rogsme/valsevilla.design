# valsevilla.design

Portfolio website for Val Sevilla, a UX/Product Designer. Built with Hugo (no theme) as a single-page homepage with individual project case study pages.

**Live site:** [valsevilla.design](https://valsevilla.design/)

## Prerequisites

- [Hugo Extended](https://gohugo.io/) v0.161.0+

No package manager, bundler, or test runner required.

## Development

```bash
hugo server --bind 0.0.0.0    # Dev server with hot reload at http://localhost:1313
hugo                           # Build static site to public/
```

## Project Structure

```
├── assets/
│   ├── scss/                  # SCSS pipeline (single entry point: style.scss)
│   │   ├── components/        # Buttons, badges, header, hero, portfolio, etc.
│   │   └── pages/             # Project and blog page styles
│   └── js/main.js             # Vanilla JS — mobile menu toggle only
├── content/
│   ├── projects/              # Case study page bundles (slug/index.md)
│   └── blog/                  # Blog articles
├── data/                      # Data-driven content (TOML)
│   ├── services.toml          # Service cards
│   ├── timeline.toml          # Career timeline entries
│   └── social.toml            # Social media links
├── layouts/
│   ├── index.html             # Homepage — assembles 6 section partials
│   ├── partials/sections/     # hero, services, about, portfolio, blog, contact
│   ├── projects/single.html   # Case study template
│   └── blog/single.html       # Blog post template
├── static/
│   ├── fonts/                 # Cabinet Grotesk (woff2)
│   └── images/                # Doodles, icons, project assets, social SVGs
├── hugo.toml                  # Site configuration
└── build.sh                   # Production build with WebP conversion
```

## Content

### Projects

Projects live in `content/projects/{slug}/index.md` as Hugo page bundles. Front matter fields:

| Field | Purpose |
|---|---|
| `title` | Project name |
| `category` | e.g. "UI/UX", "Web Design" |
| `summary` | Short description for the portfolio grid |
| `thumbnail` | Filename in `static/images/projects/` |
| `weight` | Sort order (lower = first) |
| `hero_image` | Full-width image on the case study page |
| `hero_color` | Background color class for the hero section |
| `prototype_url` | Link to interactive prototype |

### Blog

Blog posts use the same page bundle pattern: `content/blog/{slug}/index.md`.

### Shortcodes

```
{{< image-pair "left.webp" "right.webp" "Alt left" "Alt right" >}}
{{< youtube-embed "VIDEO_ID" >}}
```

## Design System

**Fonts:** DM Sans (body, Google Fonts) + Cabinet Grotesk (headings, self-hosted)

**Color palette:**

| Color | Hex | Class |
|---|---|---|
| Purple | `#d8b3f4` | `.background-purple` |
| Pink | `#fdcbf5` | `.background-pink` |
| Green | `#d1f3a3` | `.background-green` |
| Red | `#ffa3a3` | `.background-red` |
| Blue | `#c9e3fa` | `.background-blue` |
| Orange | `#ffc669` | `.background-orange` |
| Dark | `#1d1d1d` | — |
| Primary | `#7575c8` | — |

**Signature patterns:**

- `2px solid $dark` borders on cards, images, badges, buttons
- `.btn-3d` — pseudo-3D button with `.btn-front` + `.btn-edge` (colored, offset -6px)
- `.badge` — orange uppercase label (Cabinet Grotesk 800)
- Decorative SVG doodles positioned absolutely within relative parents
- Breakpoints via `@include respond-to(sm|md|lg|xl)` (mobile-first)

## Deployment

Automated via GitHub Actions on push to `master`:

1. CI builds with Hugo Extended to verify the site compiles
2. Deploys to the production server over SSH
3. Server runs `build.sh` — converts images to WebP, then builds with `hugo --minify`

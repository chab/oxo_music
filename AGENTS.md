# OXO Music - AI Session Handoff

Use this file to quickly understand the current website state when starting a new session.

## Project Type
- Static website (GitHub Pages)
- Stack: plain HTML + CSS + vanilla JS
- No build step

## Live Routes
- `/` -> `index.html` (homepage)
- `/products/oxo_steps/` -> `products/oxo_steps/index.html` (product page)
- `/support/` -> `support/index.html` (support page)

## Key Files
- `assets/css/styles.css` -> global design system and all page styling
- `assets/js/carousel.js` -> Oxo Steps gallery carousel logic
- `assets/js/site.js` -> shared site JS (currently footer year)

## Visual Direction
- Dark, technical, minimal look
- Product page visual rhythm is the reference style
- Home and Support are aligned to Product page structure (`product-detail`, `product-hero`, `detail-block`)
- Keep heading brightness soft (not pure white)
- Keep icon borders subtle

## Design Tokens
- Backgrounds:
  - `#000000`
  - `#0C0C0E`
  - `#151518`
- Accents:
  - `#607594`
  - `#3DC2D2`
  - `#DD9DB2`
  - `#6EA49B`
  - `#BEA96D`
  - `#C183BE`
  - `#CBCACB`
- Active accent is controlled centrally via `--accent-active` in `:root`

## Typography
- Main body font stack is `font-a` via `--font-body`
- Current stack:
  - `"SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif`
- Avoid reintroducing old debug font classes

## Content/Tone
- Keep copy personal and practical (not corporate)
- Preferred framing: "we build plugins we want to use"

## Media Notes
- Homepage card uses:
  - `images/oxo_steps_preview.png`
  - `images/oxo_steps_icon_1024.png`
- Product page title icon uses:
  - `images/oxo_steps_icon_1024.png`
- Product gallery expects:
  - `products/oxo_steps/images/gallery_1.png` ... `gallery_15.png`
  - Missing images are auto-skipped by JS

## Edit Guidelines
- Keep changes minimal and scoped
- Reuse existing utility classes/patterns before adding new ones
- Prefer shared JS (`site.js`) over repeated inline scripts
- Preserve mobile responsiveness

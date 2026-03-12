# Brunson Impact Mapper

## Overview
A front-end prototype designed to map Jalen Brunson's predicted scoring band to the Knicks' win likelihood. This tool pivots away from generic data dashboards and sports-betting visual vernacular, opting instead for a highly analytical, transparent, and grounded editorial aesthetic.

## Constraints & Execution
- **No External Dependencies:** Built entirely with plain HTML, CSS, and JS.
- **Data Handling:** All data is strictly local and embedded directly in `app.js`. No `fetch` calls or remote APIs are used.
- **Typography:** Avoided `Inter`, `Roboto`, `Arial`, and `system-ui`. The stack relies exclusively on `Georgia` (serif) and `Courier New` (monospace) to evoke an architectural blueprint or classified dossier.
- **Colour Palette:** Avoided safe purple-on-white. Uses a stark 'Parchment' (`#EBE6DD`), 'Ink' (`#0A0A0A`), and a vivid 'Knicks Orange' (`#FF5A00`) for high-contrast, purposeful highlighting.
- **Language:** Enforces UK spelling (Analyse, behaviour, colour) and avoids the word 'probability' in favour of 'likelihood'.
- **Responsive & Accessible:** Includes a fluid CSS Grid layout and a `@media (prefers-reduced-motion: reduce)` fallback to disable hover transitions.

## The Unforgettable Design Move
**Data Brutalism:** The interface strips away all border-radii, drop shadows, and decorative chart libraries. Information is contained within heavy, uniform ink-black borders. The 'Win Likelihood' matrix and 'Recent Form' charts are built using raw HTML DOM elements—turning typographic scale and block-level colours into the primary data visualisation tools. It feels less like an app and more like an interactive physical document.

## How to Run
1. Save `index.html`, `styles.css`, and `app.js` in the same directory.
2. Open `index.html` in any modern web browser.
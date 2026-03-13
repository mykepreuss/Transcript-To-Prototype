# Agent Management Scorecard

## Purpose
This prototype explores a paradigm shift in engineering: treating AI agents as direct reports. Instead of tracking raw code output, this interface evaluates how effectively senior engineers manage, prompt, and direct their AI counterparts via "upward reviews" from the LLMs themselves.

## Assumptions
- **Static Mock Data**: For this V1 prototype, all metrics, table rows, and upward reviews are static mock data intended to illustrate the concept. They do not represent live or real-time performance.
- **Browser Support**: Built using modern CSS (Grid, Flexbox, CSS Variables). No external polyfills or frameworks are required.
- **UK Localisation**: Enforces UK English spelling standards (e.g., behaviour, optimise) as per the brief.

## Getting Started
1. Ensure `index.html`, `styles.css`, and `app.js` are in the same directory.
2. Open `index.html` in any modern web browser.
3. No local server is strictly required, though using one (like `python -m http.server`) is recommended to avoid strict `file://` CORS restrictions if modifying the script to fetch external data later.

## Design Direction
- **Tone**: Authoritative, analytical, and slightly brutalist.
- **Typography**: Pairs a classic serif (Palatino/Georgia) for managerial hierarchy with strict monospace (Menlo/Consolas) for technical data.
- **Memorable Detail**: The "Upward Reviews" section visually treats AI feedback as official HR dossiers, contrasting human management scores with machine generated critiques.
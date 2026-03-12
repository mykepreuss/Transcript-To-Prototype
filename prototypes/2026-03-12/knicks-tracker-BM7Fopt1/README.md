# Knicks Tracker V1

## Purpose
Provide a simple, zero-bloat tracking tool for upcoming fixtures and recent player scoring behaviour. Designed specifically for deterministic output using local fixtures, ensuring zero network variance.

## Execution
Simply open `index.html` in a web browser. The interface simulates a terminal environment to favour data density and quick comprehension. 

## Architecture
- **Decoupled Data**: Local fixtures are embedded in `app.js` but structured to allow seamless API integration in V2.
- **Styling**: Utilises a strict monospace design system with CSS variables controlling the colour palette (Amber on Charcoal). Includes a segmented bar chart effect built purely with CSS repeating gradients to mimic terminal block characters.
- **Accessibility**: Includes responsive grid degradation for smaller viewports and respects `prefers-reduced-motion` by bypassing the initial terminal typing sequence.
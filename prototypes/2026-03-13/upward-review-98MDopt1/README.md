# Agent Upward Review Prototype

## Purpose
This prototype visualises a flipped code review paradigm where AI agents evaluate their human counterparts. It focuses on 'management' skills—specifically prompting behaviour and delegation efficiency—rather than raw coding metrics.

## Aesthetic Direction: "Machine Audit"
To differentiate from standard SaaS dashboards, this interface adopts a "Machine Audit" aesthetic. It uses a strict monospace typographic scale, high-contrast dark mode, and terminal-inspired accents (phosphor green, amber) to reinforce the concept that the *machine* is evaluating the *human*. We avoid safe system fonts and purple-on-white defaults entirely.

## Assumptions & Notes
- **Mock Data:** All data presented is static and mock. There is no live LLM integration in this V1 prototype.
- **Agentic Delivery Ideal:** The metric "Zero-Touch PRs" represents the ideal state of parallelised agentic delivery discussed in the brief.
- **UK Localisation:** User-facing copy utilises UK spelling (e.g., behaviour, optimise).
- **Browser Support:** Designed for modern browsers supporting CSS Variables, Grid, and Flexbox. Fallbacks for reduced motion are included.

## File Structure
- `index.html`: The semantic structure of the dashboard.
- `styles.css`: The "Machine Audit" styling, strictly using built-in monospace fonts and custom CSS variables.
- `app.js`: Vanilla JavaScript that embeds the prototype data and dynamically renders the UI components.
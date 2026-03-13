# Brunson Impact Forecaster

## Purpose
This prototype translates raw player statistics into actionable team narratives. It shifts the focus from simple data display (e.g., standard game logs) to forecasting Jalen Brunson's scoring behaviour and explicitly evaluating its impact on the Knicks' historical win likelihood.

## Assumptions & Architecture
- **Fixture-Backed Baseline:** V1 relies entirely on a deterministic, local 10-game baseline. There are no live external API dependencies to ensure the prototype is robust for demonstrations.
- **Transparent Logic:** The interface actively displays the variables driving the projection (recent form, home/away splits, opponent history) to avoid the opaque "black-box" feel of sports betting apps.
- **Band over Precision:** The forecast explicitly uses a scoring band (e.g., 28–32) rather than a hyper-specific decimal. This sets appropriate expectations for predictive accuracy.

## Running the Prototype
1. Save the provided files locally as `index.html`, `styles.css`, and `app.js` in the same directory.
2. Open `index.html` in any modern web browser.
3. No build tools or local servers are required.

## Design Notes
- **Aesthetic:** Adopts a stark, data-dense "Almanack / Terminal" aesthetic using stark contrasts, monospaced typography for data, and heavy structural borders. This purposefully differentiates it from standard, overly padded SaaS dashboards.
- **Typography:** Uses robust, universally available web-safe serif and monospace stacks, avoiding standard sans-serif system defaults to establish an authoritative, analytical tone.
- **Spelling:** All user-facing copy employs UK English spelling (analyse, behaviour, etc.).
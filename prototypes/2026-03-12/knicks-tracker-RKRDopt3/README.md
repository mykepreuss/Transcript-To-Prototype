# Knicks Tracker - Data Prototype V1

## Purpose
This prototype validates the data logic for tracking the upcoming Knicks schedule and Jalen Brunson's rolling scoring averages. It operates entirely offline using deterministic, decoupled local data to prove the architecture before V2 API integration.

## Execution
1. Download or extract the files (`index.html`, `styles.css`, `app.js`).
2. Open `index.html` in any modern web browser.
3. No build steps, servers, or external network connections are required.

## Design Notes
- **Aesthetic**: "Tactical Telemetry". A data-dense, dark-mode-first interface using monospaced typography to emphasise factual, neutral information retrieval.
- **Memorable Move**: The interface features a distinct visual threshold flag system. When the 3-game rolling average hits or exceeds 30 points, the telemetry UI shifts behaviour to highlight the alert using high-contrast colours.
- **Localisation**: Uses UK spelling (colour, behaviour) in source comments and UI descriptions.

# Brunson Impact Forecaster

## Purpose
This prototype translates individual player forecasting into team outcomes. Rather than presenting a black-box probability or a generic stat sheet, it explicitly connects Jalen Brunson's likely scoring output to the Knicks' historical chances of winning.

## Design & Aesthetic
The design direction is "Analytical Broadsheet." It deliberately avoids the visual tropes of sports betting apps or generic SaaS dashboards. By utilising a stark, high-contrast, typographic layout (relying on serif and monospace pairings), the interface signals rigorous analysis. The layout favours density and clear hierarchy over decorative elements.

## Memorable Detail
The "Forecasting Baseline" section is the standout feature. Instead of hiding the projection logic behind a tooltip or a complex chart, the system's reasoning is printed plainly on the screen in a monospaced memo format. This builds trust and aligns with the transcript's mandate for transparent logic.

## Constraints & Assumptions
- **UK English:** Used throughout (e.g., behaviour, colour, defence).
- **Local Execution:** Runs entirely on local HTML/CSS/JS without external dependencies or fonts.
- **Data:** As V1 is mandated to be deterministic, the data embedded in the application is illustrative and hardcoded to prove the product logic. It is not currently connected to a live sports API.

## Setup
1. Save `index.html`, `styles.css`, and `app.js` into the same directory.
2. Open `index.html` in any modern web browser.
# Knicks Tracker Prototype

## Overview
A deterministic, local-first prototype designed to provide a rapid, factual view of the upcoming Knicks schedule and Jalen Brunson's recent scoring behaviour. Favouring data density over decoration, this V1 release uses a decoupled architecture with local fixture data, allowing for reliable testing without network variance.

## Execution
1. Ensure all files (`index.html`, `styles.css`, `app.js`) are in the same directory.
2. Open `index.html` in any modern web browser.
3. Zero infrastructure or local server setup is required.

## Features
- **Deterministic Output:** Driven entirely by local fixture data embedded in the application logic.
- **Threshold Flagging:** Automatically calculates moving averages and surfaces a high-visibility alert when the 3-game scoring average meets or exceeds 30 points.
- **Data-Dense Layout:** A highly legible, monospace-driven interface designed for analytical comprehension.
- **Accessible:** Includes responsive layout scaling and honours reduced-motion user preferences.
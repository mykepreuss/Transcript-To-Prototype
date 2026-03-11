# Knicks Brunson Tracker Prototype

## Overview
A deterministic, local-only web view designed to track Jalen Brunson's scoring trends and the upcoming Knicks schedule. Built for internal validation of data structures and threshold triggers.

## Features
- **Zero Dependencies**: Pure HTML, CSS, and vanilla JavaScript.
- **Local Fixtures**: Data is embedded directly in the application logic. No external network calls.
- **Threshold Flag**: Highlights automatically when the 3-game moving average (L3) hits or exceeds 30 points.
- **Aesthetic**: A bold, high-contrast 'telemetry' design direction, favouring data density and quick comprehension over decorative elements.

## Execution
1. Ensure all files (`index.html`, `styles.css`, `app.js`) are in the same directory.
2. Open `index.html` in any modern web browser.
3. Verify behaviour: The L5 average should read 31.2, the L3 average should read 33.7, and the L3 module should aggressively highlight via the threshold trigger.
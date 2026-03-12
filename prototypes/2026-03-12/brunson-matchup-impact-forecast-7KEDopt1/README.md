# Brunson Matchup & Impact Forecast

## Overview
This prototype demonstrates a predictive analytics interface connecting player performance (Jalen Brunson) to team outcomes (New York Knicks). It moves away from generic stat-tracking to offer a specific, insight-driven point of view for the next fixture.

## Design Philosophy
- **Purpose:** Shift from displaying trivia to providing actionable insight.
- **Tone:** Authoritative, transparent, and analytical. We avoid "magic" or sports betting tropes by making the logic explicitly visible.
- **Aesthetic:** A stark, high-contrast "scouting terminal" approach. We use a pairing of a robust serif for editorial context and a rigid monospace for data, avoiding common sans-serif defaults. The layout is dense but legible, utilising a dark palette with electric orange accents to draw attention to critical insights.
- **Unforgettable Move:** The dramatic contrast in scale and typography between the narrative context and the raw forecast data. The primary prediction dominates the visual hierarchy.

## Technical Details
- Pure HTML, CSS, and Vanilla JavaScript.
- Zero external dependencies (no frameworks, no external fonts, no CDNs).
- Responsive CSS Grid layout.
- Reduced motion support via media queries.
- Data is deterministic and embedded within `app.js` to ensure the prototype is always functional for demos.
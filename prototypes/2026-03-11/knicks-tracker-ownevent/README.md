# Knicks Tracker Prototype

## Purpose
A minimal, deterministic web view to track Jalen Brunson's recent scoring trends and the upcoming Knicks schedule. Built for fast comprehension and data density.

## Run Instructions
1. Save all files (`index.html`, `styles.css`, `app.js`) in the same directory.
2. Open `index.html` in any modern web browser.
3. No server or build process is required.

## Acceptance Checks
- [x] Page renders locally without network calls.
- [x] 5-game average calculates to 31.2.
- [x] 3-game average calculates to 33.7.
- [x] 30+ threshold flag displays correctly (alerts visually due to L3 average >= 30).
- [x] Output is strictly deterministic (hardcoded fixture data).
- [x] Employs UK spelling internally and externally.

## Design Notes
- Aesthetic: 'Financial Data Terminal'. 
- Typography: Strict monospace stack to avoid system defaults and enforce data alignment.
- Interaction: Minimal, focusing purely on factual presentation.
# Knicks Data Tracker

## Purpose
Provide a fast, deterministic view of upcoming games and player scoring trends without network dependency. Designed as a brutalist, high-density analytics ledger.

## Execution
1. Download `index.html`, `styles.css`, and `app.js` into the same directory.
2. Open `index.html` in any modern web browser.
3. Zero build steps, zero infrastructure bloat.

## Acceptance Checks
- [x] Local data loads deterministically.
- [x] L5 average calculates accurately (31.2).
- [x] L3 average calculates accurately (33.7).
- [x] Threshold flag activates at >= 30 points.
- [x] Tone remains neutral and factual.
- [x] UK spelling applied (e.g., 'behaviour').

## Architecture
- **HTML/CSS/JS**: Vanilla, strict separation of concerns.
- **Data**: Static JSON fixture embedded directly in `app.js` for deterministic V1 testing. Ready to be decoupled for V2 API integration.
- **Aesthetic**: Terminal/Financial Ledger. Uses system monospaced and serif typography to avoid external font loading while maintaining high visual differentiation.
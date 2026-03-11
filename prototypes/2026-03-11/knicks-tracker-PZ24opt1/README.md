# Knicks Tracker - V1 Prototype

## Purpose
A rapid, high-density dashboard providing deterministic upcoming fixture schedules and recent player scoring behaviour. Built for internal analysts requiring instantaneous data comprehension without decorative bloat.

## Constraints & Architecture
- **Zero Infrastructure Bloat:** Operates entirely locally. 
- **No External Network Calls:** Uses decoupled, static array fixture data embedded directly in `app.js`.
- **Typography:** Avoids generic system sans-serifs in favour of a monospaced, CLI-inspired brutalist ledger format for strict data alignment.
- **UK Spelling:** User-facing copy adheres to UK English (e.g., behaviour, colour).

## Setup & Execution
1. Save `index.html`, `styles.css`, and `app.js` into the same local directory.
2. Open `index.html` in any modern web browser.
3. Verify behaviour and acceptance checks.

## Acceptance Checks
- [x] Command/file executes correctly without external dependencies.
- [x] Averages calculate accurately based on the data fixture (L5 = 31.2, L3 = 33.7).
- [x] Threshold flag triggers correctly at >= 30, shifting visually to a positive highlight state.
- [x] Output remains deterministic.
- [x] Copy is neutral and factual.

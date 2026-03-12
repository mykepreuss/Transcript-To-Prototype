# Knicks Tracker & Event Scheduler

## Purpose
Provide a deterministic, high-density data view of the upcoming schedule and recent scoring stats for team organisers and analysts.

## Execution
1. Download the provided files: `index.html`, `styles.css`, and `app.js`.
2. Ensure all three files are placed in the same directory.
3. Open `index.html` in any modern web browser.
4. No build steps or external dependencies are required.

## Acceptance Checks
- [x] Command executes correctly (opening the file works seamlessly).
- [x] Averages calculate accurately (L5 = 31.2, L3 = 33.7).
- [x] Threshold flag works at >= 30 (Visually activates on the L3 average).
- [x] Output stays deterministic (Utilises local fixture data only).
- [x] Copy remains neutral and factual.
- [x] Features UK English spelling (behaviour, colour, organise).
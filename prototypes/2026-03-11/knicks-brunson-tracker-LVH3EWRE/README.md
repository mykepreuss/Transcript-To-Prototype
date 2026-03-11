# knicks brunson tracker

Generated from Slack transcript event `Ev0ALVH3EWRE`.

## What this prototype does

**Recap**
* Track the upcoming 5-game Knicks schedule and Jalen Brunson's recent scoring.
* Strictly local, static fixture data for V1 to ensure deterministic behaviour.
* Calculate 5-game and 3-game moving averages with a threshold flag (>=30).
* Exclude predictive modelling; keep the interface dense and factual.

**Prototype Opportunities**
1. **Command-Line Interface:** "The first prototype opportunity is a CLI. It prints the upcoming five games..."
2. **Minimal Web View:** "Second option would be a minimal web view. Maybe just a table for the schedule and a basic bar visual..."
3. **Slack Summary Generator:** "Something that outputs a short line like, next Boston at home..."

**Plan: Minimal Web View**
*Steps:*
1. Create a single `index.html` file embedding the static JSON fixtures (5 schedule dates, 5 scoring totals).
2. Write vanilla JavaScript to calculate the L5 (31.2) and L3 (33.7) scoring averages.
3. Render the 5-game schedule in a dense HTML data table.
4. Build a basic CSS bar visual for the scoring trend, adding a neutral flag if the L3 average >= 30.

*Acceptance Checks:*
* Opens locally in a browser with a single double-click (zero infrastructure bloat).
* Absolutely no external API network calls occur.
* Averages calculate accurately.
* Threshold flag visually triggers when L3 average is >= 30.
* Copy remains neutral and factual, using UK spelling (e.g., *colour*, *behaviour*).

## Included files

- `index.html` — browser shell
- `styles.css` — presentation layer
- `app.js` — rendering logic and calculations
- `fixtures/schedule.json` — local schedule data
- `fixtures/brunson_points.json` — local scoring data

## Notes

- Deterministic V1 using local fixture data only
- No external API calls
- Intended for quick review in a prototype playground repo

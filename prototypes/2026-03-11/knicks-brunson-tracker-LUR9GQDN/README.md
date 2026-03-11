# knicks brunson tracker

Generated from Slack transcript event `Ev0ALUR9GQDN`.

## What this prototype does

**Recap**
• Build a Knicks schedule and Jalen Brunson scoring tracker.
• Strictly use deterministic local fixtures; zero external APIs.
• Calculate 5-game and 3-game rolling averages with a ≥30 threshold flag.
• Favour data density and neutral, factual copy.

**Prototype Opportunities**
1. **CLI Tool**: "The first prototype opportunity is a CLI. It prints the upcoming five games..."
2. **Minimal Web View**: "Second option would be a minimal web view. Maybe just a table for the schedule..."
3. **Slack Summary Generator**: "Third option could be a Slack summary generator."

**Plan: Minimal Web View**
*(Chosen per task instruction for a browser-viewable demo)*

**Steps:**
1. Create a single `index.html` file with embedded CSS and JS to minimise infrastructure bloat.
2. Define static JS arrays for the upcoming 5-game schedule and Brunson's recent scores (31, 24, 39, 27, 35).
3. Write local script logic to calculate the 5-game and 3-game moving averages.
4. Render a dense HTML table for the schedule and a basic bar visual for the scoring trend.
5. Apply a distinct colour flag to the UI if the 3-game average is ≥ 30.

**Acceptance Checks:**
• Executes locally in-browser with deterministic output and zero network calls.
• Averages calculate accurately (L5 = 31.2, L3 = 33.7).
• Threshold flag renders correctly based on the 3-game average.
• All interface copy remains strictly factual and uses UK spelling.

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

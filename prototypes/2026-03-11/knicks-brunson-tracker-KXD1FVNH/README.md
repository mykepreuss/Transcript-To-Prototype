# knicks brunson tracker

Generated from Slack transcript event `Ev0AKXD1FVNH`.

## What this prototype does

**Recap**
• Build a Knicks schedule and Jalen Brunson scoring tracker.
• Use static local data for V1; strictly no external network calls.
• Calculate 5-game and 3-game scoring averages with a 30+ points threshold flag.
• Maintain neutral, factual copy.

**Opportunities**
1. **CLI Tool**: "prints the upcoming five games... and then some threshold flag"
2. **Minimal Web View**: "just a table for the schedule and a basic bar visual"
3. **Slack Summary**: "outputs a short line like... Brunson L5 thirty-one point two"

**Plan: Minimal Web View**
*(Chosen per request for a simple browser-viewable demo)*

**Steps:**
1. Create one `index.html` file with embedded JS for zero infrastructure bloat.
2. Hardcode the localised schedule and Brunson’s scores (31, 24, 39, 27, 35) as static arrays.
3. Render a dense HTML table to organise the next 5 fixtures.
4. Calculate 5-game and 3-game moving averages in JS.
5. Render a basic bar visual, using a distinct colour flag if the 3-game average is ≥ 30.

**Acceptance Checks:**
• Opens directly in a browser with no build steps or external APIs.
• Schedule correctly renders all 5 games (Boston, Miami, Philly, Chicago, Cleveland).
• Averages calculate deterministically (L5: 31.2, L3: 33.7).
• Threshold flag activates for the L3 average (33.7 ≥ 30).

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

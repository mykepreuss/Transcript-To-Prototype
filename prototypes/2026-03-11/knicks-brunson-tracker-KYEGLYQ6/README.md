# knicks brunson tracker

Generated from Slack transcript event `Ev0AKYEGLYQ6`.

## What this prototype does

**Recap**
• Build a deterministic Knicks tracker using local static fixtures (no external APIs).
• Display a 5-game schedule and Jalen Brunson's last 5 scoring outputs.
• Calculate 5-game and 3-game averages, flagging if the 3-game average hits 30+.
• Favour data density and neutral, factual copy.

**Prototype Opportunities**
1. **CLI Tool**: "The first prototype opportunity is a CLI. It prints the upcoming five games..."
2. **Minimal Web View**: "Second option would be a minimal web view. Maybe just a table for the schedule..."
3. **Slack Summary Generator**: "Third option could be a Slack summary generator. Something that outputs a short line..."

**Plan: Minimal Web View**
*Chosen to provide a simple, browser-viewable demo with zero infrastructure.*

**Steps:**
1. Create a single `index.html` file with embedded CSS and JS.
2. Hardcode schedule and scoring arrays (31, 24, 39, 27, 35) as local JS variables.
3. Write JS to calculate the 5-game average (31.2) and 3-game moving average (33.7).
4. Render a dense HTML table for the schedule and a basic bar visual for scoring.
5. Apply a distinct colour flag to the 3-game average if it meets the >= 30 threshold.

**Acceptance Checks:**
• File loads directly in a browser (no server required).
• Upcoming 5-game schedule displays deterministically.
• 5-game and 3-game averages calculate accurately.
• Threshold flag triggers correctly for the 33.7 average.
• Copy and interface remain neutral, factual, and use UK spelling.

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

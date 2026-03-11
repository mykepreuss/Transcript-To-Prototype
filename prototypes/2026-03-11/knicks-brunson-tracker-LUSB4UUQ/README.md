# knicks brunson tracker

Generated from Slack transcript event `Ev0ALUSB4UUQ`.

## What this prototype does

**Recap**
• Track upcoming Knicks schedule and Jalen Brunson's scoring stats.
• Use local fixture data to guarantee deterministic behaviour (no APIs).
• Calculate 5-game and 3-game averages, flagging if the 3-game average is 30+.
• Favour data density and factual copy over decorative elements.

**Prototype Opportunities**
1. **CLI Script**: "The first prototype opportunity is a CLI. It prints the upcoming five games..."
2. **Minimal Web View**: "Second option would be a minimal web view. Maybe just a table for the schedule..."
3. **Slack Summary**: "Third option could be a Slack summary generator. Something that outputs a short line..."

**Plan: Minimal Web View** 
*(Chosen to satisfy the browser-viewable requirement while maintaining simplicity)*

**Steps:**
1. Create a single `index.html` file with embedded CSS/JS (zero bloat).
2. Hardcode the static arrays (schedule and points: 31, 24, 39, 27, 35) as local JS variables.
3. Write JS to calculate 5-game (31.2) and 3-game (33.7) moving averages.
4. Render a dense HTML table for fixtures and basic CSS data bars for scoring.
5. Apply a subtle background colour to flag when the 3-game average hits 30+.

**Acceptance Checks:**
• File opens locally in any browser with no network calls.
• Fixture schedule renders accurately.
• Both averages compute and display accurately.
• Threshold flag automatically appears for averages >= 30.
• Copy is strictly factual (no hype language) and uses UK spelling.

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

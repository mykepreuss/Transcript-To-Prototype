# knicks brunson tracker

Generated from Slack transcript event `Ev0AKYLUKWTG`.

## What this prototype does

**Recap**
• V1 needs a deterministic Knicks schedule and Brunson scoring tracker.
• Must use static local fixtures with zero external network calls.
• Requires 5-game and 3-game averages, plus a threshold flag if the 3-game average hits 30+.
• Design must favour strict data density and use neutral, factual copy.

**Prototype Opportunities**
1. **CLI App** - *"The first prototype opportunity is a CLI. It prints the upcoming five games..."*
2. **Minimal Web View** - *"Second option would be a minimal web view. Maybe just a table for the schedule and a basic bar visual..."*
3. **Slack Summary** - *"Third option could be a Slack summary generator."*

**Plan: Minimal Web View**
*(Chosen to satisfy the prompt's preference for a browser-viewable demo)*

**Steps:**
1. Create a single `index.html` file with embedded CSS and JS to minimise infrastructure bloat.
2. Hardcode the local fixture arrays (5 scheduled games, 5 historic scores: 31, 24, 39, 27, 35).
3. Write JS logic to calculate the 5-game average and 3-game moving average.
4. Render a dense schedule table and scoring summary, injecting a flag if the 3-game average is ≥ 30.

**Acceptance Checks:**
• File loads instantly in a browser with no network calls or build step.
• L5 and L3 averages calculate accurately from the static arrays.
• Threshold flag triggers correctly (≥ 30).
• UI uses neutral copy and favours data density.

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

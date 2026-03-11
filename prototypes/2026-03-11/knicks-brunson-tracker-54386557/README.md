# knicks brunson tracker

Generated from Slack transcript event `local-replay-1773254386557`.

## What this prototype does

Recap + plan:
- Goal: build a deterministic, browser-viewable knicks brunson tracker prototype.
- Constraints: local fixtures only, no external APIs, neutral copy, minimal implementation.
- Data: 5 schedule entries and 5 scoring entries parsed from the transcript.
- Build: static web view with next fixture Boston (Home) on 2026-03-12, L5 31.2 ppg, L3 33.7 ppg.
- Acceptance: direct browser open, deterministic calculations, threshold flag: 30+ form.

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

# Knicks Brunson Tracker

Generated from Slack transcript event `Ev0AL21ZGW6N`.

## What this prototype does

Recap + plan:
- Goal: build a deterministic, browser-viewable knicks brunson tracker prototype.
- Constraints: local fixtures only, no external APIs, neutral copy, minimal implementation.
- Data: 5 schedule entries and 5 scoring entries parsed from the transcript.
- Build: static web view with next fixture Boston (Home) on 2026-03-12, L5 31.2 ppg, L3 33.7 ppg.
- Acceptance: direct browser open, deterministic calculations, threshold flag: 30+ form.

## Design direction

- Purpose: Turn the transcript into a browser demo that makes the next fixture and recent performance legible in under ten seconds.
- Audience: Internal stakeholders reviewing whether the idea is worth promoting into a product spike.
- Tone: Editorial sports desk with a broadcast-style scoreboard edge.
- Memorable detail: Oversized performance numbers against a dramatic, high-contrast match-night canvas.

## Included files

- `index.html` — browser shell
- `styles.css` — presentation layer
- `app.js` — rendering logic
- `fixtures/prototype-spec.json` — structured contract chosen for this build
- `fixtures/extracted-data.json` — deterministic data extracted from the transcript

## Notes

- Deterministic V1 using local fixture data only
- No external API calls
- Intended for quick review in a prototype playground repo

# https jvk9696 com archives

Generated from Slack transcript event `Ev0ALV3U2AQY`.

## What this prototype does

**Recap**
* Team needs a tool to organise daily tasks and schedules.
* Highlighted the desire to track and score positive team behaviours.
* Agreed to build a standalone V1 demo without external APIs.

**Prototype Opportunities**
1. **Schedule Organiser View**
*"We need a simple view to organise the weekly schedule."*
2. **Behaviour Scoring Tracker**
*"Let's track when people show good behaviour and assign points."*
3. **Combined Colour-Coded Dashboard**
*"We want both schedules and scores in one colour-coded place."*

**Prototype Plan: Behaviour Scoring Tracker**
A simple, zero-dependency HTML/JS prototype using local state to track team scores (falling back to mock data as no fixtures were provided).

**Steps:**
1. Scaffold a static HTML/CSS/JS page.
2. Initialise an array of mock users with a baseline score of 0.
3. Render a list of users with "Add Point" buttons.
4. Add logic to increment scores and dynamically update the card's colour when reaching 5 points.

**Acceptance Checks:**
* [ ] App loads locally in a browser without errors or external API calls.
* [ ] Displays at least three mock users.
* [ ] Clicking "Add Point" increments the score instantly.
* [ ] Card colour updates to reflect positive behaviour thresholds.

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

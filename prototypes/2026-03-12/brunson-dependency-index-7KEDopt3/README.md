# Brunson Dependency Index

## Purpose
A prototype designed to highlight upcoming games where the Knicks are most reliant on Jalen Brunson's scoring to secure a win. It organises fixtures by 'Pressure Level' rather than just chronological order.

## Design & Behaviour
- **Aesthetic**: 'Analytical Terminal'. High contrast dark mode using strict serif and monospace typography. Avoiding safe, generic dashboard aesthetics and forbidden fonts.
- **Typography**: `Georgia` for editorial headers, `'Courier New'` for tabular and data elements.
- **Colour Palette**: Deep black background (`#0A0A0A`) with off-white text (`#EAEAEA`) and a stark, utilitarian 'Knicks Alert Orange' (`#FF5722`) for emphasis.
- **Memorable Detail**: The Pressure Level indicator uses raw, geometric blocks rather than generic text or overly complex chart junk to categorise dependency.
- **UK Spelling**: Enforced across all user-facing copy (behaviour, colour, organise, categorise).

## Setup
No build step required. Open `index.html` in any modern web browser. The logic and data are strictly local, bundled within `app.js` to ensure deterministic behaviour without reliance on live APIs.
# Brunson Matchup Dependency Index

## Overview
This prototype implements the "Matchup Dependency Index" for the New York Knicks, focusing on Jalen Brunson's required scoring output. It explicitly avoids functioning as a generic schedule tracker or a black-box sports betting predictor. Instead, it frames player statistics through the lens of team necessity—highlighting games where the structural burden on Brunson's scoring is highest.

## Design & Aesthetic Direction
- **Theme**: "Analytical Dossier". To differentiate from generic SaaS dashboards and overly flashy sports apps, the interface relies on a stark, high-contrast pairing of Serif (headers) and Monospace (data) typography. It feels like an internal analyst's report: raw, transparent, and strictly functional.
- **UK English**: Adheres to requested spelling conventions (e.g., analysing, categorise).
- **Colour Palette**: Restrained dark mode. Knicks-inspired orange and blue are used strictly as semantic indicators for "Burden Level" (Orange = High Burden, Blue = Low Burden) rather than decorative branding.

## Technical Constraints Honoured
- **Zero External Dependencies**: No CDNs, no remote fonts, no component libraries. pure HTML, CSS, and vanilla JS.
- **Local Fixtures Only**: As requested by the team for V1, all schedule and scoring baseline data is deterministically hardcoded in `app.js` to ensure flawless offline demos without API unreliability.
- **Methodology Honesty**: The UI explicitly uses the term "Likelihood" instead of "Probability" and includes a prominent methodology section to demystify the logic.

## Demo Flow
1. Read the introductory lede establishing the concept of "Offensive Burden".
2. Review the top highlights to anchor the baseline (10-game trailing average) against the peak dependency (Boston away).
3. Scan the Fixtures table. Notice how the "Burden Level" directly dictates the "Required Scoring Band".
4. Cross-reference with the "Historical Win Likelihood" chart, which visually reinforces why scores below 25 points constitute a systemic risk to team success.
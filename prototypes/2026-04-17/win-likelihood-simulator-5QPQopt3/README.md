# Win Likelihood Simulator Prototype

## Purpose
This prototype demonstrates the direct relationship between Jalen Brunson's expected scoring output and the Knicks' likelihood of winning their next fixture. It moves away from flat, generic stat trackers to provide a context-driven, analytical perspective.

## Constraints & Assumptions
- **V1 Data Fixtures**: The prototype is strictly backed by local, static data fixtures. This ensures a deterministic, reliable demo without reliance on external APIs.
- **Scope**: Focuses exclusively on the immediate next fixture and the 10-game historical baseline. It does not predict exact probabilities via machine learning, but rather maps historical likelihoods.
- **Localisation**: Follows UK spelling conventions (e.g., behaviour, visualise) as per the design brief.

## Design Direction
- **Aesthetic**: Analytical, dense, and stark. We avoid safe component-library aesthetics and generic system fonts, opting for a dark theme with high-contrast brand accents (Knicks Orange) to signify focus and interaction. Typography relies on standard websafe non-system fonts (`Georgia` for editorial authority, `Trebuchet MS` for clean UI, `Courier New` for tabular data).
- **The 'Unforgettable Move'**: The core interactive simulator. Rather than a static chart, it presents a tactile, high-contrast control panel. Selecting a scoring band triggers a dramatic, immediate update to the main likelihood display, physically demonstrating the impact of player performance on team outcomes.

## Usage
1. Open `index.html` in any modern web browser.
2. Review the context highlights at the top.
3. Interact with the "Historical Win Likelihood by Point Band" simulator to see how outcomes shift.
4. Scroll down to review the 10-game baseline data that informs the model.
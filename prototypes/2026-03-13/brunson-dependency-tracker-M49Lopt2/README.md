# Brunson Dependency Tracker

## Overview
A prototype evaluating upcoming Knicks fixtures to identify where a high-scoring Jalen Brunson performance is historically required to secure a win. This tool moves beyond generic statistics, offering an analytical "Schedule Pressure Index" based on historical data rather than opaque predictive models.

## Design Direction
- **Aesthetic**: "Analyst Notebook". High-density, high-contrast, avoiding standard component-library looks. Typography relies on classic serif for narrative and monospace for precise data representation, deliberately avoiding `Inter`, `Roboto`, or `system-ui`.
- **Tone**: Transparent, practical, analytical. 
- **Key Move**: The Pressure Index is represented not just with colours, but with explicit historical requirements, reinforcing the connection between individual performance and team win likelihood.

## Assumptions & Constraints
- **Data**: V1 relies on static local fixtures (embedded in `app.js`). This guarantees stable demonstrations without API dependencies.
- **Language**: UK English spelling is enforced (e.g., "behaviour", "offence", "colour").
- **Logic Visibility**: The relationship between opponent, venue, and required scoring band is kept surface-level and explicit.

## Setup
No build step required. Open `index.html` in any modern web browser to view the prototype.
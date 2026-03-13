# Brunson Impact Forecaster

## Overview
This prototype demonstrates a 'Scoring Impact Forecaster' for Jalen Brunson of the New York Knicks. It pivots away from a generic schedule tracker to offer targeted, predictive insights. The tool forecasts Brunson's likely scoring band for the next fixture based on recent form and venue, then analyses how that output correlates with the Knicks' historical win likelihood.

## Key Assumptions & Framing
*   **Historical Likelihood vs Absolute Probability:** The prototype explicitly frames outcomes as 'historical likelihoods' rather than absolute probabilities to avoid implying the existence of a rigorously backtested machine-learning model.
*   **Illustrative Data:** All statistics and historical records are illustrative for this V1 demo and are powered entirely by local JSON fixtures. They do not represent live or official data.
*   **Scope:** The baseline logic is restricted to the last 10 games to balance recency with sample size, ensuring the logic remains transparent and easy to follow.

## Technical Implementation
*   **No External Dependencies:** Built with pure HTML, CSS, and JavaScript. No external libraries, fonts, or CDNs are used.
*   **Aesthetic Direction:** Adopts a stark, 'quant-terminal' monospace aesthetic. This differentiates it from generic sports dashboards and reinforces the clinical, analytical tone requested in the brief.
*   **Responsive & Accessible:** Includes a responsive CSS grid layout and respects `prefers-reduced-motion` settings.

## Usage
Simply open `index.html` in a modern web browser. All data and styling are loaded locally.
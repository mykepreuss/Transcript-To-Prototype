# Brunson Dependency Ranker

## Purpose
This prototype translates player stat predictions into a "dependency ranking" that frames the New York Knicks' vulnerability for upcoming fixtures. It deliberately avoids being a generic stat-tracking dashboard, instead offering a focused, predictive storyline before tipoff.

## Design & Aesthetic
The interface employs a "Technical Dossier" aesthetic. It pairs a strict monospace typeface (`Courier New`) for data and UI elements with an editorial serif (`Georgia`) for prose. This signals an analytical, serious tool rather than a consumer entertainment app. The dark theme with stark, high-visibility accents emphasises transparency and data density.

## Constraints & Assumptions
*   **Data Source:** All data is currently deterministic, local JSON. This ensures the prototype functions flawlessly during presentations without relying on fragile external APIs. The internal schema is designed to accept a real-data adapter in future iterations.
*   **Form Baseline:** The recent form calculations strictly use the last 10 games to balance signal and noise without flattening recent trends.
*   **Methodology:** The win likelihood is presented as historical correlation, avoiding opaque "black-box" machine learning or sports betting framing.
*   **Localisation:** UK English spelling is enforced throughout the interface and documentation (e.g., *offence*, *favourable*, *colour*).

## Getting Started
Open `index.html` in any modern web browser. No build steps or local servers are required.
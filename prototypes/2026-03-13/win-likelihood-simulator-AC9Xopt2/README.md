# Knicks Tracker: Win Likelihood Simulator

## Purpose & Context
This V1 prototype visualises the historical dependency of the New York Knicks on Jalen Brunson's scoring output. Rather than presenting generic game logs, it contextualises raw statistics into a deterministic model that maps scoring bands to team win probability.

## Design Direction
To reflect the "clinical, transparent, and deterministic" brief, the interface completely avoids safe, generic dashboard aesthetics (rounded corners, soft drop shadows, standard sans-serifs). Instead, it adopts a stark, schematic-driven layout.

- **Typography**: Strictly monospaced, mimicking raw terminal output or analytical software, enforcing the idea of "transparent logic" over "mystery math".
- **Colour**: High-contrast dark mode with selective use of franchise-adjacent accent colours (Orange/Blue) only when denoting specific data states or highlights.
- **Layout**: A rigid, exposed-grid system. The dependency logic is the primary visual anchor.

## Technical Implementation
- Pure HTML/CSS/JS with zero external dependencies.
- Hardcoded deterministic fixture data (as mandated for V1 to prevent API flakiness).
- Responsive CSS Grid architecture with reduced motion fallbacks.
- UK spelling conventions applied globally (e.g., 'Analyse', 'behaviour', 'colour').

## Usage
Simply open `index.html` in a modern web browser. The logic and interactions (hover states linking scoring bands to recent form) are self-contained.
# Agentic Delivery: Parallel Experiment Simulator

## Purpose
This prototype demonstrates the acceleration of product delivery when teams transition from writing code manually to orchestrating autonomous agents. It visualises the shift from linear human capacity to parallelised agentic experimentation.

## Design & Aesthetic
The UI adopts a "Tactical Orchestration" aesthetic. By avoiding generic SaaS dashboard conventions (white backgrounds, soft shadows, safe sans-serifs), it uses a strict monospaced typographic scale, high-contrast dark theming, and rigid grid structures to feel like a command centre for engineering orchestration.

### The Bold Move
The "Delivery Velocity" chart is the focal point. It visually represents the "linear capacity limit" as a physical barrier. When agentic parallelisation is activated, the data bars violently break past this threshold, shifting in visual weight to emphasise the paradigm shift in delivery capability.

## Constraints & Assumptions Honoured
- **Local Data Only**: All experiment and velocity data is embedded within `app.js`.
- **UK Spelling**: Applied throughout user-facing copy (e.g., *colours*, *behaviour*, *organise*, *parallelised*).
- **No Banned Fonts**: Utilises a strict monospace stack (`"Lucida Console", Monaco, monospace`) to avoid Inter, Roboto, Arial, and `system-ui` entirely.
- **Static Demo State**: The prototype uses illustrative data to ensure a deterministic demonstration of the concept without implying live connection to GitHub or Linear.

## Usage
Open `index.html` in any modern web browser. The layout is responsive and includes reduced-motion fallbacks.
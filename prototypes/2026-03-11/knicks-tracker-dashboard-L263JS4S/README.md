# Knicks Tracker - Deterministic V1

## Purpose
Provide a high-density, factual overview of recent scoring trends and upcoming fixtures for Jalen Brunson and the NY Knicks. Designed for sports analysts requiring quick comprehension without decorative bloat.

## Architecture
- **Zero-Dependency**: No external network calls, fonts, or frameworks.
- **Deterministic**: Relies strictly on injected static fixture arrays to guarantee predictable outputs for verification.
- **Aesthetic**: "Terminal High-Contrast" — avoids safe, generic corporate dashboards in favour of a stark, monospace-driven layout where the data is the primary visual. 
- **Key Interaction**: The interface highlights a strict threshold behaviour. When the 3-game moving average hits or exceeds 30 points, the visual language pivots to a harsh amber to signal variance, fulfilling the acceptance criteria.

## Usage
1. Place `index.html`, `styles.css`, and `app.js` in a single directory.
2. Open `index.html` in any modern web browser.
3. Observe the deterministic L5 (31.2) and L3 (33.7) averages, and the threshold flag execution.

## Development Notes
- UK spelling conventions applied to user-facing copy and internal comments (e.g., colour, behaviour, organise).
- Reduced motion media queries are included for accessibility.
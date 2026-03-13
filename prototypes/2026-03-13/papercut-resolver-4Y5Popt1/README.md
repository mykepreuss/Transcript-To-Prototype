# Papercut Resolver Prototype

## Purpose
This prototype demonstrates the "Papercut Resolver", a workflow interface designed for non-technical team members (like customer support or product managers) to review and approve AI-generated code fixes for minor UX issues. 

## Design & Aesthetic
The interface abandons standard "dashboard" aesthetics in favour of an industrial, high-contrast dark theme. 
- **Typography:** Avoids standard modern sans-serifs (Inter/Roboto), opting for `Georgia` for authoritative, document-like headings, `Trebuchet MS` for readable body copy, and `Courier New` for metadata, creating a structural, technical feel without overwhelming the user with actual code.
- **Colour Palette:** A deep slate background (`#111318`) paired with an "Amber/Safety" accent (`#F59E0B`). This signals action and triage, distinct from typical SaaS blues or purples.
- **Layout:** Focuses on a dense left-side triage list and a clear, plain-English focal point on the right. The "Review Proposed Change" area highlights the core value proposition: hiding code complexity behind natural language summaries.

## Constraints & Assumptions
- **Static Data:** As per the brief, V1 uses static mock data. No live APIs or real LLMs are connected. State changes (like approving a fix) are simulated in memory.
- **UK Spelling:** The interface adheres to UK spelling conventions (e.g., "behaviour", "colour") in user-facing copy.
- **Interpolated Data:** The brief provided specific detail for one review item ("Hover colour contrast"). Placeholder text maintaining the same structural framing has been added to the other table rows so the interactive prototype feels complete.
- **No External Assets:** All styling and logic are self-contained. No external fonts or icon libraries are used.

## Usage
1. Open `index.html` in a modern web browser.
2. Observe the high-level metrics.
3. Click through the rows in the "Incoming Feedback Triage" table.
4. Read the "Current Behaviour" vs "AI Proposed Fix" in the review panel.
5. Click "Approve & Merge Fix" to simulate the deployment workflow.
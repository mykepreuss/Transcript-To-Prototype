# Papercut Dispatcher Prototype

## Purpose
This prototype demonstrates a streamlined workflow for support teams to translate minor customer-reported UX issues (paper cuts) directly into draft pull requests using AI agents. It bridges the gap between frontline support triage and engineering execution.

## Design Direction
- **Aesthetic**: "Tactical Terminal" — A high-contrast, dark-mode interface with monospace typography and strict grid layouts. It avoids typical "safe" SaaS aesthetics to visually reinforce that support agents are now interfacing directly with engineering tools.
- **Typography**: Uses a generic monospace stack (`'SF Mono', 'Cascadia Code', 'Consolas', monospace`) to avoid standard web fonts while maintaining a technical feel.
- **Primary Action**: The "Dispatch AI" workflow is the most prominent visual element, using an electric amber accent colour to draw focus immediately to the core task.

## Constraints & Assumptions
- **UK Spelling**: Strictly enforced in user-facing copy (e.g., *colour*, *behaviour*).
- **Mock Data**: All ticket IDs, metrics, and agent statuses are static dummy data designed for this demo. There is no live integration with Zendesk, Jira, or GitHub.
- **Simulated Activity**: Dispatching an AI agent triggers a simulated delay to represent the agent spinning up and beginning work. This is entirely frontend-driven.
- **Permissions**: It is assumed the user has authorisation to dispatch agents for frontend tasks but cannot merge directly to production (as noted in the Safeguards section).

## How to Use
1. Open `index.html` in a modern web browser.
2. Review the **Triage Queue** for incoming UI issues.
3. Click **Dispatch AI** on any ticket to initiate the engineering agent.
4. Observe the ticket move from the queue into the **Active Agent Activity** feed, updating the top-level metrics automatically.
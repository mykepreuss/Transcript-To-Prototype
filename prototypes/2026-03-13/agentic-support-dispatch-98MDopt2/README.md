# Agentic Support Dispatch Prototype

## Overview
This prototype demonstrates a V1 interface for customer support teams to bypass the traditional engineering backlog. It enables non-technical staff to dispatch AI agents (acting as "junior engineers") to fix minor UX issues and "paper cuts". The AI translates support tickets directly into draft pull requests for senior engineering review.

## Design Direction
The aesthetic is an "Industrial Operator Console". We avoided safe, generic SaaS dashboards in favour of a high-contrast, brutalist design utilizing terminal-like monospace typography and stark layout structures. This enforces the mental model of the user as an orchestrator or dispatcher at a control panel, managing autonomous agents rather than writing code.

## Assumptions & Constraints
- **Simulation:** No actual code is generated or deployed. The prototype simulates the PR creation process.
- **State Management:** The interactive demo allows you to click "Dispatch Agent" on an eligible ticket. This action immediately moves the ticket from the queue to the "Dispatched Agents" active floor and updates the system log.
- **Review Requirement:** As per the brief, agents draft code but do not merge. Final status before deployment is always "Awaiting Eng Review".
- **Local Execution:** All files (HTML, CSS, JS) run locally without external dependencies or fonts.

## How to Use
1. Save `index.html`, `styles.css`, and `app.js` in the same directory.
2. Open `index.html` in a web browser.
3. Observe the "Eligible Tickets" queue and interact with the "Dispatch Agent" buttons to see the simulated workflow.
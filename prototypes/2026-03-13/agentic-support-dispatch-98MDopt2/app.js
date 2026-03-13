/**
 * Application State & Data
 * Data is extracted directly from the provided brief.
 * UK spelling is strictly maintained (e.g., colour, behaviour).
 */
const appState = {
  highlights: [
    { label: "Active PRs", value: "4", detail: "Drafted by agents this week", tone: "positive" },
    { label: "Avg. Turnaround", value: "2 hrs", detail: "From ticket dispatch to drafted PR", tone: "positive" },
    { label: "Agent-Eligible Backlog", value: "12", detail: "Low-complexity issues ready for dispatch", tone: "neutral" }
  ],
  tickets: [
    { id: "#4192", desc: "Update button colour on pricing page to match brand guidelines", conf: "High (92%)", action: "Dispatch Agent", eligible: true },
    { id: "#4195", desc: "Typo in the password reset email template", conf: "High (98%)", action: "Dispatch Agent", eligible: true },
    { id: "#4198", desc: "Inconsistent scroll behaviour on the mobile navigation menu", conf: "Medium (74%)", action: "Review Ticket", eligible: false }
  ],
  dispatchedAgents: [
    { id: "#4188", agent: "Agent Alpha", status: "Awaiting Eng Review", output: "PR #102" },
    { id: "#4190", agent: "Agent Beta", status: "Drafting Code", output: "In Progress" },
    { id: "#4185", agent: "Agent Alpha", status: "Merged", output: "PR #99" }
  ],
  activityLog: [
    "Agent Alpha merged PR #99: Fixed padding alignment on settings modal.",
    "Agent Beta assigned to Ticket #4190 by Support Lead.",
    "Agent Alpha submitted PR #102 for engineering review.",
    "System flagged 3 new tickets as agent-eligible."
  ]
};

/**
 * Utility: Formatting status badges
 */
function getStatusClass(status) {
  if (status.includes("Drafting")) return "status-drafting";
  if (status.includes("Merged")) return "status-merged";
  if (status.includes("Review")) return "status-review";
  return "";
}

/**
 * Render Functions
 */
function renderHighlights() {
  const container = document.getElementById('highlights-container');
  container.innerHTML = appState.highlights.map(hl => `
    <div class="metric-card">
      <div class="metric-label">${hl.label}</div>
      <div class="metric-value">${hl.value}</div>
      <div class="metric-detail">${hl.detail}</div>
    </div>
  `).join('');
}

function renderTickets() {
  const container = document.getElementById('tickets-container');
  if (appState.tickets.length === 0) {
    container.innerHTML = `<div class="empty-message">No eligible tickets currently in the queue.</div>`;
    return;
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Ticket ID</th>
          <th>Description</th>
          <th>Agent Confidence</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  appState.tickets.forEach(ticket => {
    const btnClass = ticket.eligible ? 'btn-dispatch' : 'btn-disabled';
    const btnAttrs = ticket.eligible ? `onclick="dispatchAgent('${ticket.id}')"` : 'disabled';
    
    html += `
        <tr>
          <td class="ticket-id">${ticket.id}</td>
          <td>${ticket.desc}</td>
          <td>${ticket.conf}</td>
          <td>
            <button class="${btnClass}" ${btnAttrs}>${ticket.action}</button>
          </td>
        </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function renderDispatchedAgents() {
  const container = document.getElementById('agents-container');
  if (appState.dispatchedAgents.length === 0) {
    container.innerHTML = `<div class="empty-message">No agents currently dispatched.</div>`;
    return;
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Ticket ID</th>
          <th>Assigned Agent</th>
          <th>Status</th>
          <th>Output</th>
        </tr>
      </thead>
      <tbody>
  `;

  appState.dispatchedAgents.forEach(agent => {
    html += `
        <tr>
          <td class="ticket-id">${agent.id}</td>
          <td>${agent.agent}</td>
          <td><span class="status-badge ${getStatusClass(agent.status)}">${agent.status}</span></td>
          <td>${agent.output}</td>
        </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function renderActivityLog() {
  const container = document.getElementById('log-container');
  if (appState.activityLog.length === 0) {
    container.innerHTML = `<li style="color: var(--text-muted);">No recent activity.</li>`;
    return;
  }

  container.innerHTML = appState.activityLog.map(log => `<li><span>${log}</span></li>`).join('');
}

/**
 * Actions
 */
window.dispatchAgent = function(ticketId) {
  // Find the ticket
  const ticketIndex = appState.tickets.findIndex(t => t.id === ticketId);
  if (ticketIndex === -1) return;
  
  const ticket = appState.tickets[ticketIndex];

  // Remove from tickets
  appState.tickets.splice(ticketIndex, 1);

  // Assign a random "Junior Engineer" agent name for flavour
  const agents = ["Agent Gamma", "Agent Delta", "Agent Epsilon"];
  const assignedAgent = agents[Math.floor(Math.random() * agents.length)];

  // Add to Dispatched Agents
  appState.dispatchedAgents.unshift({
    id: ticket.id,
    agent: assignedAgent,
    status: "Drafting Code",
    output: "In Progress"
  });

  // Update Metrics visually
  const activePrs = appState.highlights.find(h => h.label === "Active PRs");
  const backlog = appState.highlights.find(h => h.label === "Agent-Eligible Backlog");
  if(activePrs) activePrs.value = (parseInt(activePrs.value) + 1).toString();
  if(backlog) backlog.value = (parseInt(backlog.value) - 1).toString();

  // Add to Activity Log
  const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
  appState.activityLog.unshift(`[${timestamp}] ${assignedAgent} assigned to Ticket ${ticket.id} by Support Dispatch.`);

  // Re-render UI
  renderAll();
};

function renderAll() {
  renderHighlights();
  renderTickets();
  renderDispatchedAgents();
  renderActivityLog();
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
});

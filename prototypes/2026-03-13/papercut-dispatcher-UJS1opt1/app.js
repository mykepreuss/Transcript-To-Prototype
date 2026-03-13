// Initial State based on prototype spec
const state = {
  highlights: [
    { label: "Agents Dispatched", value: 14, detail: "This week", tone: "positive" },
    { label: "Pending Review", value: 6, detail: "Draft PRs awaiting engineers", tone: "neutral" },
    { label: "Avg. Resolution", value: "4m", detail: "From ticket to draft PR", tone: "positive" }
  ],
  triageQueue: [
    {
      id: "#8492",
      behaviour: "Hover state colour missing on primary nav",
      component: "Navigation"
    },
    {
      id: "#8495",
      behaviour: "Tooltip overlaps with submit button on mobile",
      component: "Forms"
    },
    {
      id: "#8501",
      behaviour: "Inconsistent date format in billing table",
      component: "Settings"
    }
  ],
  activeActivity: [
    "Drafting fix for #8488: Aligning table columns in dashboard view",
    "Running local UI tests for #8472: Correcting mobile padding on login screen",
    "PR #102 opened for #8450: Updating legacy icon assets"
  ]
};

// DOM Elements
const els = {
  highlights: document.getElementById('highlights-container'),
  triageBody: document.getElementById('triage-tbody'),
  activityList: document.getElementById('activity-list'),
  emptyQueueMsg: document.getElementById('empty-queue-msg'),
  emptyActivityMsg: document.getElementById('empty-activity-msg')
};

// Render Functions
function renderHighlights() {
  els.highlights.innerHTML = state.highlights.map(h => `
    <div class="metric-card tone-${h.tone}">
      <div class="label">${h.label}</div>
      <div class="value">${h.value}</div>
      <div class="detail">${h.detail}</div>
    </div>
  `).join('');
}

function renderTriageQueue() {
  if (state.triageQueue.length === 0) {
    els.triageBody.innerHTML = '';
    els.emptyQueueMsg.classList.remove('hidden');
    return;
  }

  els.emptyQueueMsg.classList.add('hidden');
  els.triageBody.innerHTML = state.triageQueue.map(ticket => `
    <tr data-id="${ticket.id}">
      <td class="ticket-id">${ticket.id}</td>
      <td>${ticket.behaviour}</td>
      <td>${ticket.component}</td>
      <td class="action-col">
        <button class="btn-dispatch" data-action="dispatch" data-target="${ticket.id}">
          Dispatch AI
        </button>
      </td>
    </tr>
  `).join('');
}

function renderActivityList() {
  if (state.activeActivity.length === 0) {
    els.activityList.innerHTML = '';
    els.emptyActivityMsg.classList.remove('hidden');
    return;
  }

  els.emptyActivityMsg.classList.add('hidden');
  
  // Highlight ticket numbers in activity text for better scanning
  const formatActivityText = (text) => {
    return text.replace(/(#[0-9]+)/g, '<span class="ticket-ref">$1</span>');
  };

  els.activityList.innerHTML = state.activeActivity.map(activity => `
    <li class="activity-item">${formatActivityText(activity)}</li>
  `).join('');
}

// Actions
function dispatchAgent(ticketId) {
  const row = document.querySelector(`tr[data-id="${ticketId}"]`);
  if (row) {
    row.classList.add('dispatching');
    const btn = row.querySelector('button');
    btn.textContent = 'Initiating...';
  }

  // Simulate network/agent boot time
  setTimeout(() => {
    // Find and remove from queue
    const ticketIndex = state.triageQueue.findIndex(t => t.id === ticketId);
    if (ticketIndex > -1) {
      const ticket = state.triageQueue[ticketIndex];
      state.triageQueue.splice(ticketIndex, 1);
      
      // Add to activity list at the top
      const newActivity = `Initiating agent for ${ticket.id}: Resolving "${ticket.behaviour}"`;
      state.activeActivity.unshift(newActivity);
      
      // Keep activity list to max 5 items for UI neatness
      if (state.activeActivity.length > 5) {
        state.activeActivity.pop();
      }

      // Update stats
      state.highlights[0].value = typeof state.highlights[0].value === 'number' 
        ? state.highlights[0].value + 1 
        : parseInt(state.highlights[0].value) + 1;

      // Re-render
      renderTriageQueue();
      renderActivityList();
      renderHighlights();

      // Simulate agent progressing after a few seconds
      setTimeout(() => {
        const activityIndex = state.activeActivity.findIndex(a => a === newActivity);
        if (activityIndex > -1) {
          state.activeActivity[activityIndex] = `Drafting fix for ${ticket.id}: Adjusting ${ticket.component.toLowerCase()} logic`;
          renderActivityList();
        }
      }, 3000);
    }
  }, 800);
}

// Event Listeners
function setupEventListeners() {
  els.triageBody.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-dispatch');
    if (btn) {
      const ticketId = btn.getAttribute('data-target');
      dispatchAgent(ticketId);
    }
  });
}

// Init
function init() {
  renderHighlights();
  renderTriageQueue();
  renderActivityList();
  setupEventListeners();
}

// Run
document.addEventListener('DOMContentLoaded', init);
/**
 * Application State: Deterministic Illustrative Data
 * Extracts logic from transcript to construct a V1 prototype without external API dependencies.
 */
const forecasterData = {
  highlights: [
    {
      label: "Next Matchup",
      value: "BOS (Away)",
      detail: "Upcoming fixture context",
      tone: "neutral"
    },
    {
      label: "Projected Band",
      value: "28–32 pts",
      detail: "Based on 10-game recent form",
      tone: "positive"
    },
    {
      label: "Win Likelihood",
      value: "68%",
      detail: "When scoring in projected band",
      tone: "neutral"
    }
  ],
  baseline: [
    "Recent form: Averaging 31.4 points over the last 10 games.",
    "Venue split: Away game behaviour adjusts projection slightly downward.",
    "Opponent defence: Boston allows 108.5 points per game (high resistance)."
  ],
  outcomes: [
    {
      band: "Under 25 pts",
      games: "14",
      winRate: "35%"
    },
    {
      band: "25 to 29 pts",
      games: "22",
      winRate: "55%"
    },
    {
      band: "30+ pts",
      games: "31",
      winRate: "71%"
    }
  ]
};

/**
 * DOM Elements
 */
const DOM = {
  highlightContainer: document.getElementById('highlight-container'),
  baselineList: document.getElementById('baseline-list'),
  outcomesTableBody: document.getElementById('outcomes-table-body')
};

/**
 * Render Functions
 */
function renderHighlights() {
  DOM.highlightContainer.innerHTML = '';
  
  forecasterData.highlights.forEach(item => {
    const div = document.createElement('div');
    div.className = 'highlight-card';
    
    // Tone mapping dictates colour behaviour
    const valueClass = item.tone === 'neutral' ? 'hl-value neutral' : 'hl-value';
    
    div.innerHTML = `
      <span class="hl-label">${item.label}</span>
      <strong class="${valueClass}">${item.value}</strong>
      <span class="hl-detail">${item.detail}</span>
    `;
    DOM.highlightContainer.appendChild(div);
  });
}

function renderBaseline() {
  DOM.baselineList.innerHTML = '';
  
  if (forecasterData.baseline.length === 0) {
    DOM.baselineList.innerHTML = '<li>No baseline data available.</li>';
    return;
  }

  forecasterData.baseline.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    DOM.baselineList.appendChild(li);
  });
}

function renderOutcomes() {
  DOM.outcomesTableBody.innerHTML = '';
  
  if (forecasterData.outcomes.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="3">No historical outcomes available.</td>`;
    DOM.outcomesTableBody.appendChild(tr);
    return;
  }

  forecasterData.outcomes.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.band}</td>
      <td class="num-col">${row.games}</td>
      <td class="num-col"><strong>${row.winRate}</strong></td>
    `;
    DOM.outcomesTableBody.appendChild(tr);
  });
}

/**
 * Initialise App
 */
document.addEventListener('DOMContentLoaded', () => {
  renderHighlights();
  renderBaseline();
  renderOutcomes();
});
// Hardcoded deterministic data conforming to prototype constraints
const appData = {
  highlights: [
    {
      label: "Recent Form Baseline",
      value: "31.4 pts",
      detail: "Trailing 10-game average",
      tone: "neutral"
    },
    {
      label: "Highest Burden Fixture",
      value: "Boston (Away)",
      detail: "Requires exceptional scoring band",
      tone: "warning"
    },
    {
      label: "Base Reliance",
      value: "Significant",
      detail: "Win rate halves when scoring <25",
      tone: "neutral"
    }
  ],
  fixtures: [
    { date: "12 Mar", opponent: "Boston", venue: "Away", burden: "High", reqPoints: "35+ pts" },
    { date: "14 Mar", opponent: "Miami", venue: "Home", burden: "Medium", reqPoints: "28-34 pts" },
    { date: "16 Mar", opponent: "Charlotte", venue: "Home", burden: "Low", reqPoints: "22-27 pts" },
    { date: "18 Mar", opponent: "Philadelphia", venue: "Away", burden: "High", reqPoints: "35+ pts" },
    { date: "20 Mar", opponent: "Detroit", venue: "Away", burden: "Low", reqPoints: "22-27 pts" }
  ],
  likelihood: [
    { label: "Under 25 pts", value: 38, detail: "Low probability of victory" },
    { label: "25 to 29 pts", value: 54, detail: "Even matchup" },
    { label: "30+ pts", value: 76, detail: "High probability of victory" }
  ]
};

// Render Logic
document.addEventListener('DOMContentLoaded', () => {
  renderHighlights();
  renderFixtures();
  renderLikelihood();
});

function renderHighlights() {
  const container = document.getElementById('highlights-container');
  
  appData.highlights.forEach(item => {
    const card = document.createElement('article');
    card.className = 'highlight-card';
    card.dataset.tone = item.tone;
    
    card.innerHTML = `
      <span class="highlight-label">${item.label}</span>
      <div class="highlight-value">${item.value}</div>
      <div class="highlight-detail">${item.detail}</div>
    `;
    container.appendChild(card);
  });
}

function renderFixtures() {
  const tbody = document.getElementById('fixtures-body');
  
  if (appData.fixtures.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No upcoming fixtures available.</td></tr>`;
    return;
  }

  appData.fixtures.forEach(game => {
    const tr = document.createElement('tr');
    const burdenClass = `burden-${game.burden.toLowerCase()}`;
    
    tr.innerHTML = `
      <td>${game.date}</td>
      <td>${game.opponent}</td>
      <td>${game.venue}</td>
      <td><span class="burden-badge ${burdenClass}">${game.burden}</span></td>
      <td class="align-right">${game.reqPoints}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderLikelihood() {
  const container = document.getElementById('likelihood-container');
  
  if (appData.likelihood.length === 0) {
    container.innerHTML += `<p>Insufficient historical data to calculate win likelihood.</p>`;
    return;
  }

  appData.likelihood.forEach(point => {
    const row = document.createElement('div');
    row.className = 'likelihood-row';
    
    // Determine bar colour based on crossing the 50% parity threshold
    const barColour = point.value >= 50 ? 'var(--text-primary)' : 'var(--burden-high)';
    
    row.innerHTML = `
      <div class="likelihood-info">
        <span class="likelihood-label">${point.label}</span>
        <span class="likelihood-value">${point.value}%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: 0%; background-color: ${barColour}"></div>
      </div>
      <div class="likelihood-detail">${point.detail}</div>
    `;
    
    container.appendChild(row);
    
    // Trigger animation after append
    setTimeout(() => {
      const fill = row.querySelector('.bar-fill');
      if (fill) fill.style.width = `${point.value}%`;
    }, 50);
  });
}
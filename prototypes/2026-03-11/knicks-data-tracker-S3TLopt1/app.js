/**
 * Knicks Tracker Prototype
 * V1: Local Deterministic Fixtures
 */

const fixtureData = {
  schedule: [
    { date: "2026-03-12", opponent: "Boston", homeAway: "Home" },
    { date: "2026-03-14", opponent: "Miami", homeAway: "Away" },
    { date: "2026-03-16", opponent: "Philly", homeAway: "Home" },
    { date: "2026-03-18", opponent: "Chicago", homeAway: "Away" },
    { date: "2026-03-20", opponent: "Cleveland", homeAway: "Home" }
  ],
  scoring: [
    { date: "game-1", opponent: "Opponent 1", points: 31 },
    { date: "game-2", opponent: "Opponent 2", points: 24 },
    { date: "game-3", opponent: "Opponent 3", points: 39 },
    { date: "game-4", opponent: "Opponent 4", points: 27 },
    { date: "game-5", opponent: "Opponent 5", points: 35 }
  ],
  config: {
    threshold: 30,
    yAxisMax: 50 // Chart ceiling for visual scaling
  }
};

/**
 * Core Calculation Engine
 */
function calculateMetrics(scoringData) {
  const points = scoringData.map(game => game.points);
  
  // Last 5 Average
  const sumL5 = points.reduce((acc, val) => acc + val, 0);
  const avgL5 = (sumL5 / points.length).toFixed(1);

  // Last 3 Average (tail of the array)
  const l3Points = points.slice(-3);
  const sumL3 = l3Points.reduce((acc, val) => acc + val, 0);
  const avgL3 = (sumL3 / l3Points.length).toFixed(1);

  const thresholdActive = parseFloat(avgL3) >= fixtureData.config.threshold;

  return {
    avgL5,
    avgL3,
    thresholdActive
  };
}

/**
 * View Renderers
 */
function renderHighlights(metrics) {
  const container = document.getElementById('highlights-container');
  
  const cards = [
    {
      label: "L5 Scoring Average",
      value: metrics.avgL5,
      detail: "Points per game",
      isPositive: false
    },
    {
      label: "L3 Scoring Average",
      value: metrics.avgL3,
      detail: "Points per game",
      isPositive: false
    },
    {
      label: "L3 Threshold Status",
      value: metrics.thresholdActive ? "Active" : "Inactive",
      detail: "Average ≥ 30 points",
      isPositive: metrics.thresholdActive
    }
  ];

  container.innerHTML = cards.map(card => `
    <div class="highlight-card">
      <div class="highlight-label">${card.label}</div>
      <div class="highlight-value ${card.isPositive ? 'positive' : ''}">${card.value}</div>
      <div class="highlight-detail">${card.detail}</div>
    </div>
  `).join('');
}

function renderSchedule(scheduleData) {
  const tbody = document.getElementById('schedule-body');
  
  if (!scheduleData || scheduleData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3">No upcoming fixtures found.</td></tr>`;
    return;
  }

  tbody.innerHTML = scheduleData.map(game => `
    <tr>
      <td>${game.date}</td>
      <td>${game.opponent}</td>
      <td>${game.homeAway}</td>
    </tr>
  `).join('');
}

function renderScoringChart(scoringData) {
  const chartBars = document.getElementById('chart-bars');
  const thresholdLine = document.getElementById('threshold-line');
  
  const { threshold, yAxisMax } = fixtureData.config;

  // Position threshold line
  const thresholdPercentage = (threshold / yAxisMax) * 100;
  thresholdLine.style.bottom = `${thresholdPercentage}%`;

  // Render Bars
  chartBars.innerHTML = scoringData.map((game, index) => {
    const heightPercentage = (game.points / yAxisMax) * 100;
    const exceedsThreshold = game.points >= threshold;
    
    return `
      <div class="bar-group">
        <div class="bar ${exceedsThreshold ? 'exceeds' : ''}" style="height: 0%;" data-target-height="${heightPercentage}%">
           <span class="bar-value">${game.points}</span>
        </div>
        <span class="bar-label">G${index + 1}</span>
      </div>
    `;
  }).join('');

  // Animate bars after a brief tick
  requestAnimationFrame(() => {
    setTimeout(() => {
      const bars = document.querySelectorAll('.bar');
      bars.forEach(bar => {
        bar.style.height = bar.getAttribute('data-target-height');
      });
    }, 50);
  });
}

/**
 * Application Boot
 */
function init() {
  const metrics = calculateMetrics(fixtureData.scoring);
  renderHighlights(metrics);
  renderSchedule(fixtureData.schedule);
  renderScoringChart(fixtureData.scoring);
}

document.addEventListener('DOMContentLoaded', init);

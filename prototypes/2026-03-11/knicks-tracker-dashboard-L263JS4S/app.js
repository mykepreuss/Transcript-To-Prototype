/**
 * Knicks Tracker - Deterministic V1 Logic
 * Strictly utilises local fixture data as per constraints.
 */

const staticData = {
  schedule: [
    { date: "2026-03-12", opponent: "Boston", homeAway: "Home" },
    { date: "2026-03-14", opponent: "Miami", homeAway: "Away" },
    { date: "2026-03-16", opponent: "Philly", homeAway: "Home" },
    { date: "2026-03-18", opponent: "Chicago", homeAway: "Away" },
    { date: "2026-03-20", opponent: "Cleveland", homeAway: "Home" }
  ],
  // Historicals only, chronological order assumed based on L3 calculation requirement
  scoring: [
    { label: "Game 1", points: 31, detail: "Opponent 1" },
    { label: "Game 2", points: 24, detail: "Opponent 2" },
    { label: "Game 3", points: 39, detail: "Opponent 3" },
    { label: "Game 4", points: 27, detail: "Opponent 4" },
    { label: "Game 5", points: 35, detail: "Opponent 5" }
  ]
};

const config = {
  thresholdPoint: 30,
  maxChartPoints: 50 // Used to calculate bar percentages
};

/**
 * Calculate averages
 */
function calculateAverages(games) {
  const l5Scores = games.map(g => g.points);
  const l5Total = l5Scores.reduce((acc, curr) => acc + curr, 0);
  const l5Avg = (l5Total / 5).toFixed(1);

  // Last 3 games (assuming array ends with most recent)
  const l3Scores = l5Scores.slice(-3);
  const l3Total = l3Scores.reduce((acc, curr) => acc + curr, 0);
  const l3Avg = (l3Total / 3).toFixed(1);

  return { l5Avg, l3Avg };
}

/**
 * Render Highlights
 */
function renderHighlights(l5Avg, l3Avg) {
  const container = document.getElementById('highlights-container');
  const isThresholdMet = parseFloat(l3Avg) >= config.thresholdPoint;
  
  const html = `
    <div class="metric-card">
      <span class="metric-label">L5 Average</span>
      <span class="metric-value">${l5Avg}</span>
      <span class="metric-detail">Points across last 5 starts</span>
    </div>
    <div class="metric-card ${isThresholdMet ? 'threshold-active' : ''}">
      <span class="metric-label">L3 Average</span>
      <span class="metric-value">${l3Avg}</span>
      <span class="metric-detail">${isThresholdMet ? 'FLAG: THRESHOLD MET (>= 30)' : 'Threshold flag: >= 30'}</span>
    </div>
  `;
  
  container.innerHTML = html;
}

/**
 * Render Scoring Chart
 * Visualises points relative to the deterministic 50 max.
 */
function renderChart(games) {
  const container = document.getElementById('scoring-chart-container');
  
  const barsHtml = games.map((game, index) => {
    const heightPercent = (game.points / config.maxChartPoints) * 100;
    const isAboveThreshold = game.points >= config.thresholdPoint;
    const barClass = isAboveThreshold ? 'bar bar-threshold' : 'bar';
    
    return `
      <div class="bar-group">
        <div class="${barClass}" style="height: ${heightPercent}%">
          <span class="bar-value">${game.points}</span>
        </div>
        <span class="bar-label">G${index + 1}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = barsHtml;
}

/**
 * Render Schedule Table
 */
function renderSchedule(schedule) {
  const tbody = document.getElementById('schedule-tbody');
  
  const rowsHtml = schedule.map(game => `
    <tr>
      <td>${game.date}</td>
      <td>${game.opponent}</td>
      <td>${game.homeAway}</td>
    </tr>
  `).join('');

  tbody.innerHTML = rowsHtml;
}

/**
 * Initialise App
 */
function init() {
  // 1. Calculations
  const { l5Avg, l3Avg } = calculateAverages(staticData.scoring);
  
  // 2. DOM Updates
  renderHighlights(l5Avg, l3Avg);
  renderChart(staticData.scoring);
  renderSchedule(staticData.schedule);
}

// Execute on load
document.addEventListener('DOMContentLoaded', init);

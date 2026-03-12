// Deterministic Local Fixtures
const scheduleData = [
  { date: '2026-03-12', opponent: 'Boston', location: 'Home' },
  { date: '2026-03-14', opponent: 'Miami', location: 'Away' },
  { date: '2026-03-16', opponent: 'Philly', location: 'Home' },
  { date: '2026-03-18', opponent: 'Chicago', location: 'Away' },
  { date: '2026-03-20', opponent: 'Cleveland', location: 'Home' }
];

const scoringData = [
  { label: 'G1', value: 31, detail: 'Opponent 1' },
  { label: 'G2', value: 24, detail: 'Opponent 2' },
  { label: 'G3', value: 39, detail: 'Opponent 3' },
  { label: 'G4', value: 27, detail: 'Opponent 4' },
  { label: 'G5', value: 35, detail: 'Opponent 5' }
];

const THRESHOLD = 30;

// Calculations
const calculateAverages = (data) => {
  const scores = data.map(d => d.value);
  const sum5 = scores.reduce((a, b) => a + b, 0);
  const avg5 = (sum5 / scores.length).toFixed(1);
  
  const last3 = scores.slice(-3);
  const sum3 = last3.reduce((a, b) => a + b, 0);
  const avg3 = (sum3 / last3.length).toFixed(1);

  return { avg5, avg3 };
};

const formatNextEvent = (event) => {
  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return {
    value: event.opponent,
    detail: `${formattedDate} (${event.location})`
  };
};

// Render Logic
const renderHighlights = () => {
  const { avg5, avg3 } = calculateAverages(scoringData);
  const nextEvent = formatNextEvent(scheduleData[0]);
  const isThresholdMet = parseFloat(avg3) >= THRESHOLD;

  const container = document.getElementById('telemetry-highlights');
  
  container.innerHTML = `
    <div class="telemetry-card">
      <div class="telemetry-label">L5 Scoring Avg</div>
      <div class="telemetry-value">${avg5}</div>
      <div class="telemetry-detail">Last 5 games</div>
    </div>
    <div class="telemetry-card ${isThresholdMet ? 'active-state' : ''}">
      <div class="status-beacon ${isThresholdMet ? 'active' : ''}" title="Threshold Status"></div>
      <div class="telemetry-label">L3 Scoring Avg</div>
      <div class="telemetry-value">${avg3}</div>
      <div class="telemetry-detail">Last 3 games ${isThresholdMet ? '(Target Met)' : ''}</div>
    </div>
    <div class="telemetry-card">
      <div class="telemetry-label">Next Event</div>
      <div class="telemetry-value">${nextEvent.value}</div>
      <div class="telemetry-detail">${nextEvent.detail}</div>
    </div>
  `;
};

const renderSchedule = () => {
  const container = document.getElementById('schedule-container');
  
  let rows = scheduleData.map(game => `
    <tr>
      <td>${game.date}</td>
      <td>${game.opponent}</td>
      <td>${game.location}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Opponent</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};

const renderScoringChart = () => {
  const container = document.getElementById('scoring-container');
  const maxScore = Math.max(...scoringData.map(d => d.value), THRESHOLD + 5);
  
  const thresholdPercent = (THRESHOLD / maxScore) * 100;

  let bars = scoringData.map(game => {
    const heightPercent = (game.value / maxScore) * 100;
    const isAbove = game.value >= THRESHOLD;
    return `
      <div class="bar-wrapper">
        <span class="bar-value">${game.value}</span>
        <div class="bar ${isAbove ? 'above-threshold' : ''}" style="height: ${heightPercent}%"></div>
        <span class="bar-label">${game.label}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="chart-threshold-line" style="bottom: ${thresholdPercent}%">
      <span class="chart-threshold-label">Target: ${THRESHOLD}pts</span>
    </div>
    ${bars}
  `;
};

// Initialise
document.addEventListener('DOMContentLoaded', () => {
  renderHighlights();
  renderSchedule();
  renderScoringChart();
});

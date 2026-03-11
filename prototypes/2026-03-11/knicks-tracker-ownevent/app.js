/**
 * Knicks Tracker Prototype
 * Local fixture data execution to guarantee deterministic outputs for internal testing.
 */

const dataFixture = {
  schedule: [
    { date: "12 Mar 2026", opponent: "Boston", location: "Home" },
    { date: "14 Mar 2026", opponent: "Miami", location: "Away" },
    { date: "16 Mar 2026", opponent: "Philly", location: "Home" },
    { date: "18 Mar 2026", opponent: "Chicago", location: "Away" },
    { date: "20 Mar 2026", opponent: "Cleveland", location: "Home" }
  ],
  scoring: [
    { label: "G1", points: 31 },
    { label: "G2", points: 24 },
    { label: "G3", points: 39 },
    { label: "G4", points: 27 },
    { label: "G5", points: 35 }
  ],
  config: {
    thresholdValue: 30
  }
};

class TelemetryDashboard {
  constructor(data) {
    this.data = data;
    this.init();
  }

  init() {
    this.calculateMetrics();
    this.renderSchedule();
    this.renderScoringChart();
  }

  calculateMetrics() {
    const scores = this.data.scoring.map(g => g.points);
    
    // Calculate L5 Average
    const sumL5 = scores.reduce((acc, curr) => acc + curr, 0);
    const avgL5 = (sumL5 / scores.length).toFixed(1);
    
    // Calculate L3 Average
    const l3Scores = scores.slice(-3);
    const sumL3 = l3Scores.reduce((acc, curr) => acc + curr, 0);
    const avgL3 = (sumL3 / l3Scores.length).toFixed(1);

    // Update DOM
    document.getElementById('l5-value').textContent = avgL5;
    document.getElementById('l3-value').textContent = avgL3;

    // Threshold Logic & Visual Behaviour
    const l3Card = document.getElementById('l3-card');
    const l3Detail = document.getElementById('l3-detail');
    
    if (parseFloat(avgL3) >= this.data.config.thresholdValue) {
      l3Card.classList.add('threshold-active');
      l3Detail.textContent = `Threshold >= ${this.data.config.thresholdValue} reached`;
    } else {
      l3Card.classList.remove('threshold-active');
      l3Detail.textContent = `Below threshold`;
    }
  }

  renderSchedule() {
    const tbody = document.querySelector('#schedule-table tbody');
    tbody.innerHTML = '';

    if (this.data.schedule.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--fg-muted);">No upcoming fixtures found.</td></tr>`;
      return;
    }

    this.data.schedule.forEach(game => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${game.date}</td>
        <td>${game.opponent}</td>
        <td>${game.location}</td>
      `;
      tbody.appendChild(row);
    });
  }

  renderScoringChart() {
    const chartContainer = document.getElementById('scoring-chart');
    chartContainer.innerHTML = '';
    
    const maxAxisValue = 50; // Fixed max for historical consistency in visual scale

    this.data.scoring.forEach(game => {
      const percentage = (game.points / maxAxisValue) * 100;
      
      const wrapper = document.createElement('div');
      wrapper.className = 'bar-wrapper';
      
      wrapper.innerHTML = `
        <span class="bar-value">${game.points}</span>
        <div class="bar" style="height: ${percentage}%;"></div>
        <span class="bar-label">${game.label}</span>
      `;
      
      chartContainer.appendChild(wrapper);
    });
  }
}

// Bootstrap app upon DOM load to ensure elements are available
document.addEventListener('DOMContentLoaded', () => {
  new TelemetryDashboard(dataFixture);
});
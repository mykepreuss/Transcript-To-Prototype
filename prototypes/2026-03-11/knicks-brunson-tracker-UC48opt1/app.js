/**
 * Local Fixture Data
 * Decoupled to allow API swapping in V2.
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
        chartMax: 50 // Fixed ceiling for visual scale
    }
};

/**
 * Application Logic
 */
class TrackerApp {
    constructor(data) {
        this.data = data;
        this.init();
    }

    init() {
        this.renderSchedule();
        this.calculateAndRenderAverages();
        this.renderChart();
    }

    renderSchedule() {
        const tbody = document.querySelector('#schedule-table tbody');
        tbody.innerHTML = '';

        this.data.schedule.forEach(game => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${game.date}</td>
                <td>${game.opponent}</td>
                <td class="home-away" data-venue="${game.homeAway}">${game.homeAway}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    calculateAndRenderAverages() {
        const points = this.data.scoring.map(s => s.points);
        
        // L5 Average
        const l5Sum = points.reduce((acc, val) => acc + val, 0);
        const l5Avg = (l5Sum / points.length).toFixed(1);
        document.getElementById('l5-val').textContent = l5Avg;

        // L3 Average
        const l3Points = points.slice(-3);
        const l3Sum = l3Points.reduce((acc, val) => acc + val, 0);
        const l3Avg = (l3Sum / l3Points.length).toFixed(1);
        
        const l3ValEl = document.getElementById('l3-val');
        const l3DetailEl = document.getElementById('l3-detail');
        const l3Block = document.getElementById('l3-block');

        l3ValEl.textContent = l3Avg;

        // Threshold Logic
        if (parseFloat(l3Avg) >= this.data.config.threshold) {
            l3Block.classList.add('threshold-active');
            l3DetailEl.textContent = `THRESHOLD FLAG ACTIVE (≥ ${this.data.config.threshold} PTS)`;
        } else {
            l3Block.classList.remove('threshold-active');
            l3DetailEl.textContent = `Below ${this.data.config.threshold}-pt threshold`;
        }
    }

    renderChart() {
        const barsWrapper = document.getElementById('chart-bars');
        const labelsWrapper = document.getElementById('chart-labels');
        const thresholdLine = document.getElementById('threshold-line');
        
        barsWrapper.innerHTML = '';
        labelsWrapper.innerHTML = '';

        const max = this.data.config.chartMax;
        const threshold = this.data.config.threshold;

        // Position Threshold Line
        const thresholdPercentage = (threshold / max) * 100;
        thresholdLine.style.bottom = `${thresholdPercentage}%`;

        this.data.scoring.forEach((game, index) => {
            // Render Bar
            const heightPercentage = (game.points / max) * 100;
            const barGroup = document.createElement('div');
            barGroup.className = 'bar-group';
            
            // Set initial height to 0 for animation effect if motion allowed
            const barHtml = `
                <div class="bar" style="height: 0%;">
                    <span class="bar-val">${game.points}</span>
                </div>
            `;
            barGroup.innerHTML = barHtml;
            barsWrapper.appendChild(barGroup);

            // Animate to actual height
            setTimeout(() => {
                barGroup.querySelector('.bar').style.height = `${heightPercentage}%`;
                // Change colour if over threshold to visually link with L3 flag
                if (game.points >= threshold) {
                    barGroup.querySelector('.bar').style.backgroundColor = 'var(--text-primary)';
                }
            }, 50);

            // Render Label
            const labelHtml = `<div class="x-label">G${index + 1}</div>`;
            labelsWrapper.insertAdjacentHTML('beforeend', labelHtml);
        });
    }
}

// Bootstrap app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TrackerApp(fixtureData);
});
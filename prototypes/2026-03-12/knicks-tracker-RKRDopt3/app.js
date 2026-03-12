/**
 * Knicks Tracker Prototype - V1 Logic
 * Strictly utilises local static data to ensure deterministic behaviour.
 */

const AppData = {
    schedule: [
        { date: "2026-03-12", opponent: "Boston", location: "Home" },
        { date: "2026-03-14", opponent: "Miami", location: "Away" },
        { date: "2026-03-16", opponent: "Philly", location: "Home" },
        { date: "2026-03-18", opponent: "Chicago", location: "Away" },
        { date: "2026-03-20", opponent: "Cleveland", location: "Home" }
    ],
    // Historic scoring data based on transcript: 31, 24, 39, 27, 35
    scoring: [
        { game: 1, opponent: "OPP1", points: 31 },
        { game: 2, opponent: "OPP2", points: 24 },
        { game: 3, opponent: "OPP3", points: 39 },
        { game: 4, opponent: "OPP4", points: 27 },
        { game: 5, opponent: "OPP5", points: 35 }
    ],
    config: {
        thresholdTarget: 30,
        maxChartScore: 50
    }
};

/**
 * Core Application Logic
 */
class PrototypeApp {
    constructor(data) {
        this.data = data;
        this.init();
    }

    init() {
        this.calculateMetrics();
        this.renderHighlights();
        this.renderSchedule();
        this.renderChart();
    }

    calculateMetrics() {
        const pointsArr = this.data.scoring.map(g => g.points);
        
        // Last 5 Average
        const l5Sum = pointsArr.reduce((a, b) => a + b, 0);
        this.l5Avg = (l5Sum / pointsArr.length).toFixed(1);

        // Last 3 Average (assuming array ends with most recent)
        const l3Arr = pointsArr.slice(-3);
        const l3Sum = l3Arr.reduce((a, b) => a + b, 0);
        this.l3Avg = (l3Sum / l3Arr.length).toFixed(1);

        // Threshold validation
        this.thresholdActive = parseFloat(this.l3Avg) >= this.data.config.thresholdTarget;
    }

    renderHighlights() {
        document.getElementById('stat-l5').textContent = this.l5Avg;
        document.getElementById('stat-l3').textContent = this.l3Avg;
        
        const flagCard = document.getElementById('threshold-card');
        const flagValue = document.getElementById('stat-flag');

        if (this.thresholdActive) {
            flagCard.setAttribute('data-active', 'true');
            flagValue.textContent = 'ACTIVE';
        } else {
            flagCard.setAttribute('data-active', 'false');
            flagValue.textContent = 'STANDBY';
        }
    }

    renderSchedule() {
        const tbody = document.getElementById('schedule-body');
        tbody.innerHTML = '';

        this.data.schedule.forEach(match => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${match.date}</td>
                <td>${match.opponent}</td>
                <td>${match.location}</td>
            `;
            tbody.appendChild(row);
        });
    }

    renderChart() {
        const container = document.getElementById('chart-container');
        container.innerHTML = '';

        // Inject Threshold Line
        const thresholdPercentage = (this.data.config.thresholdTarget / this.data.config.maxChartScore) * 100;
        const lineHtml = `
            <div class="chart-threshold-line" style="bottom: ${thresholdPercentage}%;">
                <span class="chart-threshold-label">Threshold (${this.data.config.thresholdTarget})</span>
            </div>
        `;
        container.innerHTML += lineHtml;

        // Inject Bars
        this.data.scoring.forEach((game, index) => {
            const heightPercent = (game.points / this.data.config.maxChartScore) * 100;
            const isBreach = game.points >= this.data.config.thresholdTarget;
            
            const barHtml = `
                <div class="chart-bar-group">
                    <div class="chart-bar ${isBreach ? 'breach' : ''}" style="height: ${heightPercent}%;">
                        <span class="chart-bar-value">${game.points}</span>
                    </div>
                    <span class="chart-bar-label">G${index + 1}</span>
                </div>
            `;
            container.innerHTML += barHtml;
        });
    }
}

// Execute on load
document.addEventListener('DOMContentLoaded', () => {
    new PrototypeApp(AppData);
});

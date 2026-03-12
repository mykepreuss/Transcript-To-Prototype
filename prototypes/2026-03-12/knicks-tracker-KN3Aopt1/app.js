/**
 * Knicks Tracker - Decoupled Data Architecture
 * V1: Static Local Fixtures
 */

// Embedded Local Fixture Data
const store = {
    schedule: [
        { date: "2026-03-12", opponent: "Boston", location: "Home" },
        { date: "2026-03-14", opponent: "Miami", location: "Away" },
        { date: "2026-03-16", opponent: "Philly", location: "Home" },
        { date: "2026-03-18", opponent: "Chicago", location: "Away" },
        { date: "2026-03-20", opponent: "Cleveland", location: "Home" }
    ],
    scoringLogs: [
        { id: "g1", label: "Game 1", points: 31, opponent: "Opponent 1" },
        { id: "g2", label: "Game 2", points: 24, opponent: "Opponent 2" },
        { id: "g3", label: "Game 3", points: 39, opponent: "Opponent 3" },
        { id: "g4", label: "Game 4", points: 27, opponent: "Opponent 4" },
        { id: "g5", label: "Game 5", points: 35, opponent: "Opponent 5" }
    ],
    config: {
        threshold: 30,
        maxChartValue: 50
    }
};

// Analytical Core
const calculateAverages = (logs) => {
    if (!logs || logs.length === 0) return { l5: 0, l3: 0 };
    
    const sum = (arr) => arr.reduce((acc, curr) => acc + curr.points, 0);
    
    // Assuming array order is chronological past -> present
    const l5Total = sum(logs);
    const l5Avg = (l5Total / logs.length).toFixed(1);
    
    const l3Logs = logs.slice(-3);
    const l3Total = sum(l3Logs);
    const l3Avg = l3Logs.length > 0 ? (l3Total / l3Logs.length).toFixed(1) : 0;

    return { l5Avg, l3Avg };
};

// DOM Construction Functions
const createHighlightsUI = (averages, scheduledCount, config) => {
    const isThresholdHit = parseFloat(averages.l3Avg) >= config.threshold;
    
    return `
        <div class="panel span-full">
            <div class="panel-title">Performance Telemetry</div>
            <div class="highlights-grid">
                <div class="stat-card">
                    <span class="stat-label">L5 Average</span>
                    <span class="stat-value">${averages.l5Avg}</span>
                    <span class="stat-detail">Points per game</span>
                </div>
                <div class="stat-card ${isThresholdHit ? 'threshold-triggered' : ''}">
                    <span class="stat-label">L3 Moving Avg</span>
                    <span class="stat-value">${averages.l3Avg}</span>
                    <span class="stat-detail"> 
                        ${isThresholdHit ? 
                            `<span class="threshold-badge">Alert: High Variance (≥${config.threshold})</span>` : 
                            'Nominal scoring variance'}
                    </span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Scheduled</span>
                    <span class="stat-value">${scheduledCount}</span>
                    <span class="stat-detail">Upcoming fixtures loaded</span>
                </div>
            </div>
        </div>
    `;
};

const createScheduleUI = (schedule) => {
    const rows = schedule.map(game => `
        <tr>
            <td>${game.date}</td>
            <td>${game.opponent}</td>
            <td><span class="${game.location.toLowerCase() === 'home' ? 'badge-home' : 'badge-away'}">[${game.location}]</span></td>
        </tr>
    `).join('');

    return `
        <div class="panel">
            <div class="panel-title">Upcoming Fixtures</div>
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
        </div>
    `;
};

const createScoringChartUI = (logs, config) => {
    // Calculate chart height relative to configured max (e.g., 50pts)
    const thresholdPercentage = (config.threshold / config.maxChartValue) * 100;

    const bars = logs.map((log, index) => {
        const heightPct = (log.points / config.maxChartValue) * 100;
        const isOverThreshold = log.points >= config.threshold;
        return `
            <div class="bar-wrapper">
                <div class="bar ${isOverThreshold ? 'exceeds-threshold' : ''}" style="height: ${heightPct}%">
                    <span class="bar-value">${log.points}</span>
                </div>
                <span class="bar-label">G${index + 1}</span>
            </div>
        `;
    }).join('');

    return `
        <div class="panel">
            <div class="panel-title">Recent Scoring Logs (L5)</div>
            <div class="chart-container">
                <div class="chart-threshold-line" style="bottom: ${thresholdPercentage}%">
                    <span class="chart-threshold-label">${config.threshold}PT THRESHOLD</span>
                </div>
                ${bars}
            </div>
        </div>
    `;
};

// Initialisation
const render = () => {
    const mountPoint = document.getElementById('app-mount');
    const averages = calculateAverages(store.scoringLogs);
    
    // Construct Grid Layout
    const layout = `
        <div class="grid-layout">
            ${createHighlightsUI(averages, store.schedule.length, store.config)}
            ${createScoringChartUI(store.scoringLogs, store.config)}
            ${createScheduleUI(store.schedule)}
        </div>
    `;
    
    mountPoint.innerHTML = layout;
};

// Execute rendering on load
document.addEventListener('DOMContentLoaded', render);

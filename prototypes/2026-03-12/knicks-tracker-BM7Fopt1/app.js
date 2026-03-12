/**
 * Knicks Tracker - V1 Local Execution
 * UK Spelling strictly enforced (behaviour, colour, organise).
 */

// 1. Decoupled Data Architecture (Local Fixtures)
const db = {
    schedule: [
        { date: "2026-03-12", opponent: "Boston", location: "Home" },
        { date: "2026-03-14", opponent: "Miami", location: "Away" },
        { date: "2026-03-16", opponent: "Philly", location: "Home" },
        { date: "2026-03-18", opponent: "Chicago", location: "Away" },
        { date: "2026-03-20", opponent: "Cleveland", location: "Home" }
    ],
    scoring: [
        { game: "Game 1", opponent: "Opponent 1", points: 31 },
        { game: "Game 2", opponent: "Opponent 2", points: 24 },
        { game: "Game 3", opponent: "Opponent 3", points: 39 },
        { game: "Game 4", opponent: "Opponent 4", points: 27 },
        { game: "Game 5", opponent: "Opponent 5", points: 35 }
    ]
};

// 2. Core Logic & Calculations
function calculateAverages() {
    const scores = db.scoring.map(s => s.points);
    const totalPoints = scores.reduce((sum, val) => sum + val, 0);
    const l5 = (totalPoints / scores.length).toFixed(1);
    
    const last3Scores = scores.slice(-3);
    const last3Total = last3Scores.reduce((sum, val) => sum + val, 0);
    const l3 = (last3Total / last3Scores.length).toFixed(1);
    
    const thresholdActive = parseFloat(l3) >= 30.0;

    return { l5, l3, thresholdActive };
}

// 3. UI Rendering
function renderDashboard() {
    const stats = calculateAverages();
    const outputEl = document.getElementById('terminal-output');
    
    // Max scale for the bar chart to ensure visually meaningful rendering
    const MAX_POINTS_SCALE = 50; 
    const THRESHOLD_TARGET = 30;
    const thresholdPct = (THRESHOLD_TARGET / MAX_POINTS_SCALE) * 100;

    const htmlTemplate = `
        <div class="metadata">
            <div class="metadata-title">[KNICKS TRACKER // V1 LOCAL EXECUTION]</div>
            <div>Deterministic output of upcoming fixtures and Jalen Brunson's recent scoring trends.</div>
        </div>

        <div class="dashboard-grid">
            <div class="panel highlights">
                <div class="panel-title">>> AGGREGATES</div>
                <div class="hl-item">
                    <div class="hl-label">L5 Average</div>
                    <div class="hl-val">${stats.l5}</div>
                    <div class="hl-det">Points across last 5 starts</div>
                </div>
                <div class="hl-item">
                    <div class="hl-label">L3 Average</div>
                    <div class="hl-val">${stats.l3}</div>
                    <div class="hl-det">Points across last 3 starts</div>
                </div>
                <div class="hl-item">
                    <div class="hl-label">Threshold Flag</div>
                    <div class="hl-val ${stats.thresholdActive ? 'flag-active' : ''}">
                        ${stats.thresholdActive ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                    <div class="hl-det">L3 average &ge; 30</div>
                </div>
            </div>

            <div class="panel schedule">
                <div class="panel-title">>> UPCOMING SCHEDULE</div>
                <table class="cli-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Opponent</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${db.schedule.map(game => `
                            <tr>
                                <td>${game.date}</td>
                                <td>${game.opponent}</td>
                                <td>${game.location}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="panel scoring">
                <div class="panel-title">>> RECENT SCORING LOGS</div>
                <div class="scoring-list">
                    ${db.scoring.map((game, index) => {
                        const pct = (game.points / MAX_POINTS_SCALE) * 100;
                        const isHigh = game.points >= THRESHOLD_TARGET;
                        // Using inline styles for width to drive the CSS gradient segments
                        return `
                            <div class="bar-row">
                                <div class="bar-label">${game.game.toUpperCase()}</div>
                                <div class="bar-track">
                                    ${index === 0 ? `<div class="threshold-marker" style="left: ${thresholdPct}%;" title="30pt Target"></div>` : ''}
                                    <div class="bar-fill ${isHigh ? 'high-variance' : ''}" style="width: ${pct}%;"></div>
                                </div>
                                <div class="bar-val">${game.points}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;

    outputEl.innerHTML = htmlTemplate;
    outputEl.classList.remove('hidden');
}

// 4. Execution Sequence (Simulated Boot)
function init() {
    const commandStr = "./knicks-tracker --v1 --execute";
    const inputEl = document.getElementById('command-input');
    const cursorEl = document.getElementById('cursor');
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Skip animation for accessibility
        inputEl.textContent = commandStr;
        cursorEl.style.display = 'none';
        renderDashboard();
        return;
    }

    // Typing behaviour
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < commandStr.length) {
            inputEl.textContent += commandStr.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                cursorEl.style.display = 'none';
                renderDashboard();
            }, 400); // Brief pause before execution output
        }
    }, 40);
}

// Boot application
document.addEventListener('DOMContentLoaded', init);
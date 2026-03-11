/**
 * Knicks Brunson Tracker
 * Deterministic prototype relying solely on local fixture data.
 * Enforces UK spelling conventions in naming (e.g., bgColour).
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Static Fixture Data (No external APIs)
    const rawData = {
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
        ],
        threshold: 30,
        chartMax: 50 // Defines 100% height for the bar chart
    };

    // 2. Data Processing Logic
    const calculateAverages = (scoringArray) => {
        // Calculate L5 (Last 5)
        const l5Sum = scoringArray.reduce((acc, curr) => acc + curr.points, 0);
        const l5Avg = (l5Sum / scoringArray.length).toFixed(1);

        // Calculate L3 (Last 3)
        const l3Data = scoringArray.slice(-3);
        const l3Sum = l3Data.reduce((acc, curr) => acc + curr.points, 0);
        const l3Avg = (l3Sum / l3Data.length).toFixed(1);

        return { l5Avg, l3Avg };
    };

    const stats = calculateAverages(rawData.scoring);
    const thresholdMet = parseFloat(stats.l3Avg) >= rawData.threshold;

    // 3. UI Rendering Logic

    // Render Highlights
    const highlightsContainer = document.getElementById('highlights');
    const l5Block = `
        <div class="stat-block">
            <div class="stat-label">L5 Average</div>
            <div class="stat-value">${stats.l5Avg}</div>
            <div class="stat-detail">Points per game</div>
        </div>
    `;
    
    const l3Block = `
        <div class="stat-block ${thresholdMet ? 'alert' : ''}">
            <div class="stat-label">L3 Average</div>
            <div class="stat-value">${stats.l3Avg}</div>
            <div class="stat-detail">
                ${thresholdMet ? 'Threshold: 30+ Exceeded' : 'Threshold: 30+'}
            </div>
        </div>
    `;
    highlightsContainer.innerHTML = l5Block + l3Block;

    // Render Schedule Table
    const scheduleBody = document.getElementById('schedule-body');
    scheduleBody.innerHTML = rawData.schedule.map(game => `
        <tr>
            <td>${game.date}</td>
            <td>${game.opponent}</td>
            <td>${game.location}</td>
        </tr>
    `).join('');

    // Render Scoring Chart
    const chartArea = document.getElementById('scoring-chart');
    chartArea.innerHTML = rawData.scoring.map((game, index) => {
        // Calculate height percentage based on chartMax
        const heightPct = (game.points / rawData.chartMax) * 100;
        // Highlight games that individually meet the threshold for visual texture
        const isHigh = game.points >= rawData.threshold;
        
        return `
            <div class="bar-group">
                <div class="bar-value">${game.points}</div>
                <div class="bar ${isHigh ? 'high-variance' : ''}" style="height: 0%;" data-target-height="${heightPct}%"></div>
                <div class="bar-label">G${index + 1}</div>
            </div>
        `;
    }).join('');

    // Animate bars on load (deferred slightly for effect)
    setTimeout(() => {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.height = bar.getAttribute('data-target-height');
        });
    }, 100);
});
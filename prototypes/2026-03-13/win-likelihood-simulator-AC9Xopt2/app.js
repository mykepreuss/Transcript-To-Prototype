/**
 * Knicks Tracker Prototype: App Logic
 * Deterministic, fixture-backed rendering.
 */

const specData = {
    "highlights": [
        {
            "label": "Recent Form",
            "value": "31.4",
            "detail": "Average points over the last 10 fixtures.",
            "tone": "neutral"
        },
        {
            "label": "High Output",
            "value": "30+",
            "detail": "Points required for an optimal win likelihood.",
            "tone": "positive"
        },
        {
            "label": "Low Output",
            "value": "< 25",
            "detail": "Historically yields a negative win expectancy.",
            "tone": "warning"
        }
    ],
    "series": {
        "threshold": 50,
        "points": [
            {
                "label": "Under 25 pts",
                "value": 35,
                "detail": "High vulnerability"
            },
            {
                "label": "25 to 29 pts",
                "value": 55,
                "detail": "Neutral performance"
            },
            {
                "label": "30+ pts",
                "value": 75,
                "detail": "High reliance success"
            }
        ]
    },
    "logs": {
        "columns": ["Opponent", "Venue", "Brunson Pts", "Knicks Result"],
        "rows": [
            ["Boston Celtics", "Away", "32", "Win"],
            ["Miami Heat", "Home", "24", "Loss"],
            ["Orlando Magic", "Away", "28", "Win"]
        ]
    }
};

/**
 * Render Highlights
 */
function renderHighlights() {
    const container = document.getElementById('highlights-container');
    let html = '';
    
    specData.highlights.forEach(hl => {
        html += `
            <div class="highlight-card" data-tone="${hl.tone}">
                <div class="highlight-label">${hl.label}</div>
                <div class="highlight-value">${hl.value}</div>
                <div class="highlight-detail">${hl.detail}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * Render the Win Likelihood Stepped Bar Chart
 */
function renderChart() {
    const container = document.getElementById('chart-bars');
    let html = '';
    
    specData.series.points.forEach(pt => {
        // Start height at 0 for initial CSS animation, then update inline style
        html += `
            <div class="chart-bar-group">
                <div class="chart-bar" 
                     data-value="${pt.value}" 
                     style="height: 0%;" 
                     data-target-height="${pt.value}%">
                </div>
                <div class="chart-label">${pt.label}</div>
                <div class="chart-detail">${pt.detail}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;

    // Trigger animation shortly after mount
    setTimeout(() => {
        const bars = container.querySelectorAll('.chart-bar');
        bars.forEach(bar => {
            bar.style.height = bar.getAttribute('data-target-height');
        });
    }, 100);
}

/**
 * Render the Matchup Logs Table
 */
function renderTable() {
    const thead = document.querySelector('#logs-table thead');
    const tbody = document.querySelector('#logs-table tbody');
    
    // Headers
    let headHtml = '<tr>';
    specData.logs.columns.forEach(col => {
        headHtml += `<th>${col}</th>`;
    });
    headHtml += '</tr>';
    thead.innerHTML = headHtml;
    
    // Rows
    let bodyHtml = '';
    specData.logs.rows.forEach(row => {
        bodyHtml += '<tr>';
        row.forEach((cell, index) => {
            // Apply colour logic to the last column (Result)
            if (index === 3) {
                const resultClass = cell.toLowerCase() === 'win' ? 'result-win' : 'result-loss';
                bodyHtml += `<td class="${resultClass}">${cell}</td>`;
            } else {
                bodyHtml += `<td>${cell}</td>`;
            }
        });
        bodyHtml += '</tr>';
    });
    tbody.innerHTML = bodyHtml;
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderHighlights();
    renderChart();
    renderTable();
});

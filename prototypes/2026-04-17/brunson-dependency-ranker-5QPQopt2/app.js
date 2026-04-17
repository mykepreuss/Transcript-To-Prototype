document.addEventListener('DOMContentLoaded', () => {
    // Extracted data strictly from the transcript brief
    const data = {
        highlights: [
            {
                label: "Peak Burden",
                value: "Boston (Away)",
                detail: "Highest offensive dependency in the next 5 games",
                tone: "warning"
            },
            {
                label: "Recent Baseline",
                value: "29.4 pts",
                detail: "Moving average over the last 10 games",
                tone: "neutral"
            },
            {
                label: "Target Band",
                value: "30+ pts",
                detail: "Historical scoring threshold for >70% win likelihood",
                tone: "positive"
            }
        ],
        schedule: [
            {
                date: "12 Mar",
                opponent: "Boston",
                venue: "Away",
                scoringBand: "32-36 pts",
                dependency: "High"
            },
            {
                date: "14 Mar",
                opponent: "Miami",
                venue: "Home",
                scoringBand: "28-32 pts",
                dependency: "Medium"
            },
            {
                date: "16 Mar",
                opponent: "Charlotte",
                venue: "Away",
                scoringBand: "22-26 pts",
                dependency: "Low"
            },
            {
                date: "18 Mar",
                opponent: "Orlando",
                venue: "Home",
                scoringBand: "28-32 pts",
                dependency: "Medium"
            }
        ],
        winLikelihood: [
            {
                label: "Under 25 pts",
                value: 38,
                detail: "Requires secondary scorers to step up"
            },
            {
                label: "25 to 29 pts",
                value: 54,
                detail: "Average team performance"
            },
            {
                label: "30+ pts",
                value: 72,
                detail: "Strongest indicator of a Knicks victory"
            }
        ]
    };

    // Render Highlights
    const highlightsContainer = document.getElementById('highlights-container');
    data.highlights.forEach(highlight => {
        const card = document.createElement('div');
        card.className = 'highlight-card';
        card.dataset.tone = highlight.tone;
        card.innerHTML = `
            <div class="highlight-label">${highlight.label}</div>
            <div class="highlight-value">${highlight.value}</div>
            <div class="highlight-detail">${highlight.detail}</div>
        `;
        highlightsContainer.appendChild(card);
    });

    // Render Schedule Table
    const tbody = document.getElementById('dependency-tbody');
    data.schedule.forEach(row => {
        const tr = document.createElement('tr');
        
        let tagClass = 'tag-medium';
        if (row.dependency === 'High') tagClass = 'tag-high';
        if (row.dependency === 'Low') tagClass = 'tag-low';

        tr.innerHTML = `
            <td>${row.date}</td>
            <td>${row.opponent}</td>
            <td>${row.venue}</td>
            <td>${row.scoringBand}</td>
            <td><span class="tag ${tagClass}">${row.dependency}</span></td>
        `;
        tbody.appendChild(tr);
    });

    // Render Chart Bars
    const chartContainer = document.getElementById('chart-bars');
    data.winLikelihood.forEach((point, index) => {
        const row = document.createElement('div');
        row.className = 'bar-row';
        row.dataset.index = index;
        
        // Delay width assignment slightly to allow CSS transition to trigger on load
        setTimeout(() => {
            const fill = row.querySelector('.bar-fill');
            if (fill) fill.style.width = `${point.value}%`;
        }, 50);

        row.innerHTML = `
            <div class="bar-label-container">
                <span class="bar-label">${point.label}</span>
                <span class="bar-value">${point.value}%</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill" style="width: 0%;"></div>
            </div>
            <div class="bar-detail">${point.detail}</div>
        `;
        chartContainer.appendChild(row);
    });
});

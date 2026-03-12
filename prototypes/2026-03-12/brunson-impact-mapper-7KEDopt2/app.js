/**
 * Brunson Impact Mapper - V1 Prototype Logic
 * All data embedded locally as per constraints.
 */

const prototypeData = {
    "title": "Brunson Impact Mapper",
    "eyebrow": "Knicks Matchup Analysis",
    "lede": "Analyse Jalen Brunson's recent form to project his next scoring band, and see how his offensive output influences the Knicks' likelihood of winning.",
    "highlights": [
        {
            "label": "Recent Form",
            "value": "29.4 pts",
            "detail": "Average over last 10 games",
            "tone": "neutral"
        },
        {
            "label": "Predicted Band",
            "value": "28–32 pts",
            "detail": "Next Matchup: Away",
            "tone": "neutral"
        },
        {
            "label": "Win Likelihood",
            "value": "High",
            "detail": "If scoring within predicted band",
            "tone": "positive"
        }
    ],
    "sections": [
        {
            "id": "likelihood",
            "title": "Win Likelihood by Scoring Band",
            "description": "Historical relationship between Brunson's points total and Knicks match outcomes.",
            "columns": ["Scoring Band", "Matches Evaluated", "Win Rate", "Likelihood"],
            "rows": [
                ["Under 25 pts", "14", "42%", "Low"],
                ["25 to 29 pts", "16", "56%", "Moderate"],
                ["30+ pts", "20", "75%", "High"]
            ]
        },
        {
            "id": "form",
            "title": "Recent Scoring Form",
            "description": "Brunson's points total over the last 10 games used to calculate the predicted band.",
            "unit": "pts",
            "threshold": 30,
            "thresholdLabel": "High Impact Threshold",
            "points": [
                { "label": "Game 1", "value": 24, "detail": "Away" },
                { "label": "Game 2", "value": 31, "detail": "Away" },
                { "label": "Game 3", "value": 28, "detail": "Home" },
                { "label": "Game 4", "value": 34, "detail": "Home" },
                { "label": "Game 5", "value": 22, "detail": "Away" }
            ]
        },
        {
            "id": "methodology",
            "title": "How This Is Calculated",
            "body": "The predicted scoring band is calculated using a baseline of Brunson's last 10 games, adjusted for home/away splits and opponent defensive rating. Win likelihood maps those projected points against historical team outcomes. No black-box algorithms—just transparent, historical behaviour."
        }
    ]
};

function init() {
    // Render Header
    document.getElementById('eyebrow').textContent = prototypeData.eyebrow;
    document.getElementById('title').textContent = prototypeData.title;
    document.getElementById('lede').textContent = prototypeData.lede;

    // Render Highlights
    const highlightsContainer = document.getElementById('highlights-container');
    prototypeData.highlights.forEach(hl => {
        const card = document.createElement('div');
        card.className = 'highlight-card';
        card.setAttribute('data-tone', hl.tone);
        
        card.innerHTML = `
            <div class="highlight-label">${hl.label}</div>
            <div>
                <div class="highlight-value">${hl.value}</div>
                <div class="highlight-detail">${hl.detail}</div>
            </div>
        `;
        highlightsContainer.appendChild(card);
    });

    // Render Matrix / Table
    const tableData = prototypeData.sections.find(s => s.id === 'likelihood');
    document.getElementById('matrix-title').textContent = tableData.title;
    document.getElementById('matrix-desc').textContent = tableData.description;
    
    const tableEl = document.getElementById('likelihood-table');
    
    // Table Header
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    tableData.columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    tableEl.appendChild(thead);

    // Table Body
    const tbody = document.createElement('tbody');
    tableData.rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-likelihood', row[3]);
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    tableEl.appendChild(tbody);

    // Render Form Chart
    const formData = prototypeData.sections.find(s => s.id === 'form');
    document.getElementById('form-title').textContent = formData.title;
    document.getElementById('form-desc').textContent = formData.description;
    document.getElementById('threshold-label').textContent = formData.thresholdLabel;

    const chartContainer = document.getElementById('bar-chart');
    const maxScore = 40; // Fixed ceiling for calculation layout purposes

    formData.points.forEach(pt => {
        const row = document.createElement('div');
        row.className = 'bar-row';
        
        const widthPct = (pt.value / maxScore) * 100;
        const isHighImpact = pt.value >= formData.threshold;

        row.innerHTML = `
            <div class="bar-label-group">
                <span class="bar-title">${pt.label}</span>
                <span class="bar-detail">${pt.detail}</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill ${isHighImpact ? 'high-impact' : ''}" style="width: ${widthPct}%">
                    ${pt.value}
                </div>
            </div>
        `;
        chartContainer.appendChild(row);
    });

    // Render Footer / Methodology
    const methodData = prototypeData.sections.find(s => s.id === 'methodology');
    document.getElementById('method-title').textContent = methodData.title;
    document.getElementById('method-body').textContent = methodData.body;
}

// Bootstrap application
document.addEventListener('DOMContentLoaded', init);

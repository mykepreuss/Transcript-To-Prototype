const specData = {
  "title": "Brunson Matchup & Impact Forecast",
  "eyebrow": "Next Fixture Analysis",
  "lede": "Evaluating Jalen Brunson's recent behaviour on the court to forecast his scoring band and analyse the Knicks' likelihood of winning their next fixture.",
  "highlights": [
    {
      "label": "Forecasted Band",
      "value": "28–32 pts",
      "detail": "Next fixture: BOS (Away)",
      "tone": "neutral"
    },
    {
      "label": "Historical Win Rate",
      "value": "65%",
      "detail": "When scoring 28–32 pts",
      "tone": "positive"
    },
    {
      "label": "Recent Form",
      "value": "31.2 pts",
      "detail": "Average over last 10 matches",
      "tone": "neutral"
    }
  ],
  "sections": [
    {
      "type": "table",
      "title": "Historical Win Likelihood",
      "description": "How the Knicks perform based on Brunson's scoring output.",
      "columns": [
        "Scoring Band",
        "Matches",
        "Knicks Wins",
        "Win Percentage"
      ],
      "rows": [
        ["Under 25 pts", "18", "7", "38%"],
        ["25 to 29 pts", "24", "13", "54%"],
        ["30+ pts", "30", "22", "73%"]
      ]
    },
    {
      "type": "series",
      "title": "Recent Form",
      "description": "Brunson's points tally across his last 5 matches to contextualise the forecast.",
      "unit": "pts",
      "threshold": 28,
      "thresholdLabel": "Forecast Lower Bound",
      "points": [
        { "label": "vs PHI", "value": 26, "detail": "Home" },
        { "label": "vs ORL", "value": 34, "detail": "Home" },
        { "label": "at CLE", "value": 29, "detail": "Away" },
        { "label": "at MIA", "value": 31, "detail": "Away" },
        { "label": "vs ATL", "value": 36, "detail": "Home" }
      ]
    },
    {
      "type": "list",
      "title": "Forecast Logic Context",
      "description": "The variables used to determine the 28–32 points forecast.",
      "items": [
        "Baseline established from the last 10 matches (31.2 pts average)",
        "Adjusted for Away venue, historically reducing output by 1.5 pts",
        "Opponent defensive rating (BOS) factored as high resistance"
      ]
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  // Populate Header
  document.getElementById('ui-eyebrow').textContent = specData.eyebrow;
  document.getElementById('ui-title').textContent = specData.title;
  document.getElementById('ui-lede').textContent = specData.lede;

  // Populate Highlights
  const highlightsContainer = document.getElementById('ui-highlights');
  specData.highlights.forEach((hl, index) => {
    const card = document.createElement('div');
    card.className = `highlight-card ${index === 0 ? 'primary' : ''}`;
    
    card.innerHTML = `
      <div class="hl-label">${hl.label}</div>
      <div class="hl-value">${hl.value}</div>
      <div class="hl-detail">${hl.detail}</div>
    `;
    highlightsContainer.appendChild(card);
  });

  // Extract sections
  const tableSection = specData.sections.find(s => s.type === 'table');
  const seriesSection = specData.sections.find(s => s.type === 'series');
  const logicSection = specData.sections.find(s => s.type === 'list');

  // Populate Table
  if (tableSection) {
    document.getElementById('ui-table-title').textContent = tableSection.title;
    document.getElementById('ui-table-desc').textContent = tableSection.description;
    
    const thead = document.getElementById('ui-table-head');
    const trHead = document.createElement('tr');
    tableSection.columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);

    const tbody = document.getElementById('ui-table-body');
    tableSection.rows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  // Populate Logic List
  if (logicSection) {
    document.getElementById('ui-logic-title').textContent = logicSection.title;
    document.getElementById('ui-logic-desc').textContent = logicSection.description;
    const ul = document.getElementById('ui-logic-list');
    logicSection.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  // Populate Series (Bar Chart)
  if (seriesSection) {
    document.getElementById('ui-series-title').textContent = seriesSection.title;
    document.getElementById('ui-series-desc').textContent = seriesSection.description;
    
    const container = document.getElementById('ui-series-container');
    const maxVal = Math.max(...seriesSection.points.map(p => p.value));
    const scaleMax = maxVal + 4; // Add some headroom
    
    // Draw threshold line
    const thresholdPct = (seriesSection.threshold / scaleMax) * 100;
    const thresholdLine = document.createElement('div');
    thresholdLine.className = 'threshold-line';
    thresholdLine.style.left = `${thresholdPct}%`;
    thresholdLine.innerHTML = `<span class="threshold-label">${seriesSection.thresholdLabel} (${seriesSection.threshold})</span>`;
    container.appendChild(thresholdLine);

    // Draw bars
    seriesSection.points.forEach(point => {
      const row = document.createElement('div');
      row.className = 'series-row';
      
      const pct = (point.value / scaleMax) * 100;
      const isHigh = point.value >= seriesSection.threshold;

      row.innerHTML = `
        <div class="series-label">${point.label}</div>
        <div class="series-track">
          <div class="series-bar ${isHigh ? 'high' : ''}" style="width: 0%" data-target="${pct}%">
            <span class="series-value">${point.value}</span>
          </div>
        </div>
        <div class="series-detail">${point.detail}</div>
      `;
      container.appendChild(row);
    });

    // Animate bars after a short delay for effect
    setTimeout(() => {
      document.querySelectorAll('.series-bar').forEach(bar => {
        bar.style.width = bar.getAttribute('data-target');
      });
    }, 100);
  }
});

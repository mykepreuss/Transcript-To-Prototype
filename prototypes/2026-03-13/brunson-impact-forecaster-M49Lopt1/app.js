document.addEventListener('DOMContentLoaded', () => {
  // Data derived from transcript brief
  const prototypeData = {
    "title": "Brunson Impact Forecaster",
    "eyebrow": "Next-Fixture Analysis",
    "lede": "Analyse Jalen Brunson's projected scoring band for the upcoming matchup to determine the historical likelihood of a Knicks victory.",
    "highlights": [
      {
        "label": "Projected Point Band",
        "value": "28–32",
        "detail": "Forecast for next fixture",
        "tone": "main" 
      },
      {
        "label": "Implied Win Likelihood",
        "value": "68%",
        "detail": "When scoring within predicted band",
        "tone": "positive"
      },
      {
        "label": "Recent Baseline",
        "value": "31.4",
        "detail": "Average over last 10 fixtures",
        "tone": "neutral"
      }
    ],
    "sections": [
      {
        "id": "variables",
        "title": "Forecast Variables",
        "description": "The logic and context used to generate the projected scoring band.",
        "items": [
          "Player scoring form over the previous 10 fixtures",
          "Home/Away venue performance splits",
          "Recent matchup history against the upcoming opponent"
        ]
      },
      {
        "id": "historical",
        "title": "Historical Team Outcomes",
        "description": "How the Knicks perform across different Brunson scoring thresholds.",
        "columns": ["Scoring Band", "Knicks Record", "Win Likelihood"],
        "rows": [
          ["Under 25 pts", "4-8", "33.3%"],
          ["25–29 pts", "12-6", "66.7%"],
          ["30+ pts", "18-4", "81.8%"]
        ]
      },
      {
        "id": "behaviour",
        "title": "Recent Scoring Behaviour",
        "description": "Brunson's point totals across the 10-game baseline used for this projection.",
        "threshold": 30,
        "thresholdLabel": "High Impact Threshold",
        "points": [
          { "label": "G-10", "value": 24, "detail": "Away" },
          { "label": "G-9", "value": 31, "detail": "Home" },
          { "label": "G-8", "value": 28, "detail": "Home" },
          { "label": "G-7", "value": 35, "detail": "Away" },
          { "label": "G-6", "value": 22, "detail": "Away" },
          { "label": "G-5", "value": 41, "detail": "Home" },
          { "label": "G-4", "value": 30, "detail": "Home" },
          { "label": "G-3", "value": 27, "detail": "Away" },
          { "label": "G-2", "value": 33, "detail": "Away" },
          { "label": "G-1", "value": 38, "detail": "Home" }
        ]
      }
    ]
  };

  // Populate Header
  document.getElementById('eyebrow').textContent = prototypeData.eyebrow;
  document.getElementById('title').textContent = prototypeData.title;
  document.getElementById('lede').textContent = prototypeData.lede;

  // Populate Highlights
  const highlightsContainer = document.getElementById('highlights');
  prototypeData.highlights.forEach(hl => {
    const card = document.createElement('div');
    card.className = `highlight-card highlight-${hl.tone}`;
    card.innerHTML = `
      <div class="highlight-label">${hl.label}</div>
      <div class="highlight-value">${hl.value}</div>
      <div class="highlight-detail">${hl.detail}</div>
    `;
    highlightsContainer.appendChild(card);
  });

  // Populate Variables Section
  const varsData = prototypeData.sections.find(s => s.id === 'variables');
  document.getElementById('variables-title').textContent = varsData.title;
  document.getElementById('variables-desc').textContent = varsData.description;
  const varsList = document.getElementById('variables-list');
  varsData.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    varsList.appendChild(li);
  });

  // Populate Historical Table
  const histData = prototypeData.sections.find(s => s.id === 'historical');
  document.getElementById('historical-title').textContent = histData.title;
  document.getElementById('historical-desc').textContent = histData.description;
  
  const thead = document.getElementById('historical-thead');
  const trHead = document.createElement('tr');
  histData.columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  const tbody = document.getElementById('historical-tbody');
  histData.rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach((cellText, index) => {
      const td = document.createElement('td');
      td.textContent = cellText;
      // Emphasise high win likelihoods
      if (index === 2 && parseFloat(cellText) > 60) {
        td.style.color = 'var(--colour-accent-positive)';
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  // Populate Behaviour Chart
  const behavData = prototypeData.sections.find(s => s.id === 'behaviour');
  document.getElementById('behaviour-title').textContent = behavData.title;
  document.getElementById('behaviour-desc').textContent = behavData.description;
  
  const chartContainer = document.getElementById('chart-container');
  const maxVal = Math.max(...behavData.points.map(p => p.value));
  const yAxisMax = Math.ceil(maxVal / 5) * 5 + 5; // Add padding to top

  // Draw Threshold Line
  const thresholdPercent = (behavData.threshold / yAxisMax) * 100;
  const thresholdLine = document.createElement('div');
  thresholdLine.className = 'chart-threshold';
  thresholdLine.style.bottom = `${thresholdPercent}%`;
  thresholdLine.innerHTML = `<span class="chart-threshold-label">${behavData.thresholdLabel} (${behavData.threshold} pts)</span>`;
  chartContainer.appendChild(thresholdLine);

  // Draw Bars
  behavData.points.forEach(pt => {
    const barHeight = (pt.value / yAxisMax) * 100;
    const isHighImpact = pt.value >= behavData.threshold;
    
    const group = document.createElement('div');
    group.className = 'chart-bar-group';
    
    group.innerHTML = `
      <span class="chart-value">${pt.value}</span>
      <div class="chart-bar ${isHighImpact ? 'high-impact' : ''}" style="height: ${barHeight}%"></div>
      <span class="chart-label">${pt.label}</span>
      <span class="chart-detail">${pt.detail}</span>
    `;
    chartContainer.appendChild(group);
  });
});

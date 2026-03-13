/**
 * Brunson Impact Forecaster
 * Prototype Data & Render Logic
 */

const specData = {
  "title": "Brunson Impact Forecaster",
  "eyebrow": "Next Fixture Analysis",
  "lede": "Forecasts Jalen Brunson's likely scoring band for the upcoming match and maps it to historical Knicks win outcomes.",
  "highlights": [
    {
      "label": "Projected Band",
      "value": "28\u201332 pts",
      "detail": "Based on last 10 games",
      "tone": "neutral"
    },
    {
      "label": "Win Likelihood",
      "value": "68%",
      "detail": "When scoring 28\u201332 pts",
      "tone": "positive"
    },
    {
      "label": "Matchup Context",
      "value": "High Burden",
      "detail": "Away vs strong defence",
      "tone": "warning"
    }
  ],
  "sections": [
    {
      "id": "logic",
      "type": "list",
      "title": "Forecast Logic",
      "description": "The variables factored into today's projected scoring band.",
      "items": [
        "Base: Last 10 games average (31.4 pts)",
        "Venue: Away game adjustment (-1.2 pts)",
        "Opponent: Top-tier defence adjustment (-2.0 pts)"
      ]
    },
    {
      "id": "impact",
      "type": "table",
      "title": "Historical Impact by Scoring Tier",
      "description": "How the Knicks' win likelihood shifts based on Brunson's output.",
      "columns": [
        "Scoring Tier",
        "Win Rate",
        "Recent Record"
      ],
      "rows": [
        ["Under 25 pts", "35%", "7-13"],
        ["25 to 29 pts", "55%", "15-12"],
        ["30+ pts", "75%", "24-8"]
      ]
    },
    {
      "id": "form",
      "type": "series",
      "title": "Recent Form Baseline",
      "description": "Brunson's scoring totals over the preceding 10 fixtures (Illustrative sample).",
      "unit": "pts",
      "threshold": 30,
      "thresholdLabel": "High Impact Target",
      "points": [
        { "label": "G1", "value": 34, "detail": "Away" },
        { "label": "G2", "value": 26, "detail": "Home" },
        { "label": "G3", "value": 31, "detail": "Home" },
        { "label": "G4", "value": 29, "detail": "Away" },
        { "label": "G5", "value": 36, "detail": "Away" },
        { "label": "G6", "value": 22, "detail": "Home" },
        { "label": "G7", "value": 33, "detail": "Away" },
        { "label": "G8", "value": 28, "detail": "Home" },
        { "label": "G9", "value": 41, "detail": "Away" },
        { "label": "G10", "value": 30, "detail": "Home" }
      ]
    }
  ]
};

function renderHeader() {
  document.getElementById('eyebrow').textContent = specData.eyebrow;
  document.getElementById('title').textContent = specData.title;
  document.getElementById('lede').textContent = specData.lede;
}

function createHighlights() {
  const container = document.createElement('div');
  container.className = 'highlights-grid';

  specData.highlights.forEach(hl => {
    const card = document.createElement('div');
    card.className = 'highlight-card';
    card.innerHTML = `
      <div class="highlight-label">${hl.label}</div>
      <div class="highlight-value tone-${hl.tone}">${hl.value}</div>
      <div class="highlight-detail">${hl.detail}</div>
    `;
    container.appendChild(card);
  });

  return container;
}

function createSectionHeader(title, description) {
  return `
    <div class="section-header">
      <h2 class="section-title">${title}</h2>
      <p class="section-description">${description}</p>
    </div>
  `;
}

function createLogicList(sectionData) {
  const wrapper = document.createElement('div');
  wrapper.className = 'logic-section';
  
  let html = createSectionHeader(sectionData.title, sectionData.description);
  html += `<ul class="logic-list">`;
  sectionData.items.forEach(item => {
    html += `<li class="logic-item">${item}</li>`;
  });
  html += `</ul>`;
  
  wrapper.innerHTML = html;
  return wrapper;
}

function createImpactTable(sectionData) {
  const wrapper = document.createElement('div');
  wrapper.className = 'impact-section';

  let html = createSectionHeader(sectionData.title, sectionData.description);
  html += `<div class="impact-table-wrapper"><table class="impact-table"><thead><tr>`;
  
  sectionData.columns.forEach(col => {
    html += `<th>${col}</th>`;
  });
  html += `</tr></thead><tbody>`;

  sectionData.rows.forEach(row => {
    html += `<tr>`;
    row.forEach(cell => {
      html += `<td>${cell}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table></div>`;
  wrapper.innerHTML = html;
  return wrapper;
}

function createSeriesChart(sectionData) {
  const wrapper = document.createElement('div');
  wrapper.className = 'series-section';

  const maxVal = Math.max(...sectionData.points.map(p => p.value));
  const yAxisMax = Math.ceil((maxVal + 5) / 10) * 10; // Round up to nearest 10
  const thresholdPercent = (sectionData.threshold / yAxisMax) * 100;

  let html = createSectionHeader(sectionData.title, sectionData.description);
  html += `<div class="chart-wrapper"><div class="chart-area">`;

  // Threshold line
  html += `
    <div class="chart-threshold-line" style="bottom: ${thresholdPercent}%;">
      <span class="chart-threshold-label">${sectionData.thresholdLabel} (${sectionData.threshold}${sectionData.unit})</span>
    </div>
  `;

  // Bars
  sectionData.points.forEach(pt => {
    const heightPercent = (pt.value / yAxisMax) * 100;
    html += `
      <div class="chart-bar-container">
        <div class="chart-bar" style="height: ${heightPercent}%;" data-value="${pt.value}"></div>
        <div class="chart-label">
          <div>${pt.label}</div>
          <div class="chart-detail">${pt.detail}</div>
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  wrapper.innerHTML = html;
  return wrapper;
}

function renderApp() {
  renderHeader();
  const main = document.getElementById('app-main');

  // 1. Highlights
  main.appendChild(createHighlights());

  // 2. Split Region (Logic + Impact)
  const splitSection = document.createElement('div');
  splitSection.className = 'split-section';
  
  const logicData = specData.sections.find(s => s.id === 'logic');
  const impactData = specData.sections.find(s => s.id === 'impact');
  
  if (logicData) splitSection.appendChild(createLogicList(logicData));
  if (impactData) splitSection.appendChild(createImpactTable(impactData));
  
  main.appendChild(splitSection);

  // 3. Series Region
  const formData = specData.sections.find(s => s.id === 'form');
  if (formData) main.appendChild(createSeriesChart(formData));
}

// Initialise
document.addEventListener('DOMContentLoaded', renderApp);

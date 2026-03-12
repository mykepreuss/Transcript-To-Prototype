const spec = {
  "title": "Brunson Dependency Index",
  "eyebrow": "Upcoming Schedule Analysis",
  "lede": "Evaluating the Knicks' upcoming fixtures to identify where a high-scoring performance from Jalen Brunson is most critical.",
  "highlights": [
    {
      "label": "Highest Burden",
      "value": "BOS (Away)",
      "detail": "Historically requires 30+ points",
      "tone": "warning"
    },
    {
      "label": "Baseline Target",
      "value": "28-32 pts",
      "detail": "Most likely scoring band",
      "tone": "neutral"
    },
    {
      "label": "Recent Form",
      "value": "31.4 pts",
      "detail": "Average over last 10 games",
      "tone": "positive"
    }
  ],
  "sections": [
    {
      "type": "table",
      "title": "Upcoming Fixtures Pressure Ranking",
      "description": "Upcoming games ranked by how heavily the Knicks rely on Brunson's scoring, factoring in opponent and venue.",
      "columns": [
        "Date",
        "Opponent",
        "Venue",
        "Historical Win Condition",
        "Pressure Level"
      ],
      "rows": [
        [
          "12 Mar",
          "Boston Celtics",
          "Away",
          "Brunson 30+ pts",
          "High"
        ],
        [
          "14 Mar",
          "Miami Heat",
          "Home",
          "Brunson 25-29 pts",
          "Medium"
        ],
        [
          "16 Mar",
          "Charlotte Hornets",
          "Home",
          "Brunson <25 pts",
          "Low"
        ]
      ]
    },
    {
      "type": "series",
      "title": "Knicks Win Rate by Brunson Points",
      "description": "Historical win percentage based on Brunson's scoring output to provide context for the pressure index behaviour.",
      "unit": "%",
      "threshold": 50,
      "thresholdLabel": "Average Win Rate",
      "points": [
        {
          "label": "Under 25 pts",
          "value": 35,
          "detail": "Low reliance"
        },
        {
          "label": "25 - 29 pts",
          "value": 58,
          "detail": "Standard performance"
        },
        {
          "label": "30+ pts",
          "value": 78,
          "detail": "High dependence"
        }
      ]
    },
    {
      "type": "list",
      "title": "Model Inputs",
      "description": "Variables used to categorise and organise fixture pressure levels.",
      "items": [
        "Brunson's scoring average over the last 10 games",
        "Historical Knicks win likelihood at specific scoring bands",
        "Opponent defensive rating and recent performance",
        "Home versus Away venue splits"
      ]
    }
  ]
};

function renderHeader() {
  return `
    <header>
      <span class="eyebrow">${spec.eyebrow}</span>
      <h1>${spec.title}</h1>
      <p class="lede">${spec.lede}</p>
    </header>
  `;
}

function renderHighlights() {
  const cards = spec.highlights.map(hl => `
    <div class="highlight-card tone-${hl.tone}">
      <div class="hl-label">${hl.label}</div>
      <div class="hl-value">${hl.value}</div>
      <div class="hl-detail">${hl.detail}</div>
    </div>
  `).join('');
  
  return `<div class="highlights-grid">${cards}</div>`;
}

function renderPressureMeter(level) {
  let fillCount = 0;
  if (level.toLowerCase() === 'high') fillCount = 3;
  if (level.toLowerCase() === 'medium') fillCount = 2;
  if (level.toLowerCase() === 'low') fillCount = 1;

  let boxes = '';
  for (let i = 0; i < 3; i++) {
    boxes += `<div class="pressure-box ${i < fillCount ? 'filled' : ''}"></div>`;
  }

  return `
    <div class="pressure-meter">
      ${boxes}
      <span class="pressure-text">${level}</span>
    </div>
  `;
}

function renderTable(section) {
  const headers = section.columns.map(col => `<th>${col}</th>`).join('');
  const rows = section.rows.map(row => {
    const cells = row.map((cell, index) => {
      // The last column is Pressure Level
      if (index === row.length - 1) {
        return `<td>${renderPressureMeter(cell)}</td>`;
      }
      return `<td>${cell}</td>`;
    }).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  return `
    <section>
      <div class="section-header">
        <h2>${section.title}</h2>
        <p>${section.description}</p>
      </div>
      <div class="table-wrapper">
        <table>
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderSeries(section) {
  const items = section.points.map((pt, i) => `
    <div class="series-item">
      <div class="series-header">
        <div>
          <div class="series-label">${pt.label}</div>
          <div class="series-detail">${pt.detail}</div>
        </div>
        <div class="series-value-text">${pt.value}${section.unit}</div>
      </div>
      <div class="bar-track">
        ${i === 0 ? `<div class="threshold-line" style="left: ${section.threshold}%"><div class="threshold-label">${section.thresholdLabel}</div></div>` : ''}
        <div class="bar-fill" style="width: 0%" data-target="${pt.value}%"></div>
      </div>
    </div>
  `).join('');

  return `
    <section>
      <div class="section-header">
        <h2>${section.title}</h2>
        <p>${section.description}</p>
      </div>
      <div class="series-list">
        ${items}
      </div>
    </section>
  `;
}

function renderList(section) {
  const items = section.items.map(item => `<li>${item}</li>`).join('');
  return `
    <section>
      <div class="section-header">
        <h2>${section.title}</h2>
        <p>${section.description}</p>
      </div>
      <ol class="model-inputs">
        ${items}
      </ol>
    </section>
  `;
}

function init() {
  const app = document.getElementById('app');
  let html = renderHeader();
  html += renderHighlights();
  
  spec.sections.forEach(sec => {
    if (sec.type === 'table') html += renderTable(sec);
    if (sec.type === 'series') html += renderSeries(sec);
    if (sec.type === 'list') html += renderList(sec);
  });

  app.innerHTML = html;

  // Animate bars after render
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-target');
    });
  }, 100);
}

document.addEventListener('DOMContentLoaded', init);

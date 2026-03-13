/**
 * Brunson Dependency Tracker
 * Data structure directly derived from transcript brief.
 */

const specData = {
  prototypeSpec: {
    title: "Brunson Dependency Tracker",
    eyebrow: "Schedule Pressure Index",
    lede: "Evaluating upcoming Knicks fixtures to identify where a high-scoring Jalen Brunson performance is historically required to secure a win.",
    highlights: [
      {
        label: "High Pressure Fixtures",
        value: "2",
        detail: "Upcoming games requiring 30+ points",
        tone: "warning"
      },
      {
        label: "Recent Form Baseline",
        value: "29.4 pts",
        detail: "Average across last 10 games",
        tone: "positive"
      },
      {
        label: "Win Likelihood Delta",
        value: "+25%",
        detail: "When scoring 30+ vs under 25",
        tone: "neutral"
      }
    ],
    sections: [
      {
        id: "fixtures",
        type: "list",
        title: "Upcoming Fixtures by Pressure",
        description: "The next five games ranked by the projected scoring burden on Brunson.",
        items: [
          "Boston (Away) — High Pressure (Historical requirement: 30+ pts)",
          "Milwaukee (Away) — High Pressure (Historical requirement: 30+ pts)",
          "Orlando (Home) — Medium Pressure (Historical requirement: 25-29 pts)",
          "Charlotte (Home) — Low Pressure (Historical requirement: <25 pts)"
        ]
      },
      {
        id: "outcomes",
        type: "table",
        title: "Knicks Outcomes by Scoring Band",
        description: "Historical win likelihood mapped to Brunson's points totals.",
        columns: ["Points Band", "Win Likelihood", "Offence Context"],
        rows: [
          ["Under 25", "45%", "High reliance on secondary scorers"],
          ["25 to 29", "60%", "Balanced scoring distribution"],
          ["30+", "75%", "Brunson dominant performance"]
        ]
      },
      {
        id: "form",
        type: "series",
        title: "Recent Form (Last 10 Games)",
        description: "Brunson's scoring output over the baseline period.",
        threshold: 30,
        thresholdLabel: "High Pressure Benchmark",
        points: [
          { label: "G1", value: 32, detail: "Home" },
          { label: "G2", value: 24, detail: "Away" },
          { label: "G3", value: 28, detail: "Away" },
          { label: "G4", value: 35, detail: "Home" },
          { label: "G5", value: 31, detail: "Away" }
        ]
      },
      {
        id: "methodology",
        type: "text",
        title: "Methodology",
        body: "The pressure index assesses the opponent's baseline strength and venue against the Knicks' historical win likelihood when Brunson scores in specific bands. It uses his last 10 games as a form baseline. There is no hidden machine learning model; the behaviour is entirely transparent and based on historical fixture data."
      }
    ]
  }
};

/**
 * UI Render Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  const data = specData.prototypeSpec;

  // 1. Populate Header
  document.getElementById('ui-eyebrow').textContent = data.eyebrow;
  document.getElementById('ui-title').textContent = data.title;
  document.getElementById('ui-lede').textContent = data.lede;

  // 2. Populate Highlights
  const highlightsContainer = document.getElementById('ui-highlights');
  data.highlights.forEach(hl => {
    const card = document.createElement('div');
    card.className = 'highlight-card';
    card.setAttribute('data-tone', hl.tone);
    card.innerHTML = `
      <div class="highlight-label">${hl.label}</div>
      <div class="highlight-value">${hl.value}</div>
      <div class="highlight-detail">${hl.detail}</div>
    `;
    highlightsContainer.appendChild(card);
  });

  // 3. Process Sections
  data.sections.forEach(sec => {
    if (sec.id === 'fixtures') renderFixtures(sec);
    if (sec.id === 'outcomes') renderOutcomes(sec);
    if (sec.id === 'form') renderFormChart(sec);
    if (sec.id === 'methodology') {
      document.getElementById('method-title').textContent = sec.title;
      document.getElementById('method-body').textContent = sec.body;
    }
  });
});

function renderFixtures(data) {
  document.getElementById('fixtures-title').textContent = data.title;
  document.getElementById('fixtures-desc').textContent = data.description;
  
  const content = document.getElementById('fixtures-content');
  const ul = document.createElement('ul');
  ul.className = 'fixture-list';

  data.items.forEach(item => {
    // Parse the string "Matchup — Pressure (Req)"
    const [matchupPart, rest] = item.split(' — ');
    const [pressurePart, reqPart] = rest.split(' (Historical requirement: ');
    const req = reqPart.replace(')', '');
    
    let pressureClass = 'pressure-low';
    if (pressurePart.includes('High')) pressureClass = 'pressure-high';
    if (pressurePart.includes('Medium')) pressureClass = 'pressure-medium';

    const li = document.createElement('li');
    li.className = 'fixture-item';
    li.innerHTML = `
      <div class="fixture-matchup">${matchupPart}</div>
      <div class="fixture-pressure">
        <span class="pressure-indicator ${pressureClass}">${pressurePart}</span>
        <span class="fixture-req">Req: ${req}</span>
      </div>
    `;
    ul.appendChild(li);
  });
  content.appendChild(ul);
}

function renderOutcomes(data) {
  document.getElementById('outcomes-title').textContent = data.title;
  document.getElementById('outcomes-desc').textContent = data.description;

  const content = document.getElementById('outcomes-content');
  const table = document.createElement('table');
  table.className = 'data-table';

  const thead = document.createElement('thead');
  thead.innerHTML = `<tr>${data.columns.map(c => `<th>${c}</th>`).join('')}</tr>`;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  data.rows.forEach(row => {
    tbody.innerHTML += `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
  });
  table.appendChild(tbody);
  content.appendChild(table);
}

function renderFormChart(data) {
  document.getElementById('form-title').textContent = data.title;
  document.getElementById('form-desc').textContent = data.description;

  const content = document.getElementById('form-content');
  const chart = document.createElement('div');
  chart.className = 'chart-container';

  // Assuming max points for scaling purposes is ~45 to give headroom
  const maxPoints = 45;
  const thresholdPercent = (data.threshold / maxPoints) * 100;

  // Add threshold line
  const thresholdLine = document.createElement('div');
  thresholdLine.className = 'chart-threshold';
  thresholdLine.style.bottom = `${thresholdPercent}%`;
  thresholdLine.innerHTML = `<span class="chart-threshold-label">${data.thresholdLabel} (${data.threshold})</span>`;
  chart.appendChild(thresholdLine);

  // Add bars
  data.points.forEach(pt => {
    const barWrapper = document.createElement('div');
    barWrapper.className = 'chart-bar-wrapper';
    
    const heightPercent = (pt.value / maxPoints) * 100;
    const isHigh = pt.value >= data.threshold;
    
    barWrapper.innerHTML = `
      <div class="chart-bar ${isHigh ? 'is-high-pressure' : ''}" style="height: ${heightPercent}%">
        <span class="chart-bar-value">${pt.value}</span>
      </div>
      <span class="chart-bar-label">${pt.label}</span>
    `;
    chart.appendChild(barWrapper);
  });

  content.appendChild(chart);
}

document.addEventListener('DOMContentLoaded', () => {
  const specData = {
    "highlights": [
      {
        "label": "Active Workstreams",
        "value": "4",
        "detail": "Running concurrently",
        "tone": "positive"
      },
      {
        "label": "Time to Polish",
        "value": "2 hrs",
        "detail": "Estimated completion",
        "tone": "neutral"
      },
      {
        "label": "Review Backlog",
        "value": "3 PRs",
        "detail": "Awaiting human approval",
        "tone": "warning"
      }
    ],
    "table": {
      "columns": [
        "Variant",
        "Agent Focus",
        "Status",
        "Review Category"
      ],
      "rows": [
        [
          "Variant A",
          "Update primary button colours and contrast",
          "Ready for review",
          "UX Polish"
        ],
        [
          "Variant B",
          "Streamline error validation behaviour",
          "In progress",
          "Logic"
        ],
        [
          "Variant C",
          "Organise layout for mobile viewports",
          "Ready for review",
          "Responsive"
        ]
      ]
    },
    "chart": {
      "unit": "PRs shipped",
      "threshold": 10,
      "thresholdLabel": "Linear capacity limit",
      "points": [
        {
          "label": "Week 1",
          "value": 4,
          "detail": "Manual"
        },
        {
          "label": "Week 2",
          "value": 7,
          "detail": "Manual"
        },
        {
          "label": "Week 3",
          "value": 24,
          "detail": "Agents deployed"
        },
        {
          "label": "Week 4",
          "value": 31,
          "detail": "Parallelised"
        }
      ]
    }
  };

  // Render Highlights
  const highlightsContainer = document.getElementById('highlights-container');
  specData.highlights.forEach(h => {
    const card = document.createElement('div');
    card.className = `stat-card tone-${h.tone}`;
    card.innerHTML = `
      <div class="stat-label">${h.label}</div>
      <div class="stat-value">${h.value}</div>
      <div class="stat-detail">${h.detail}</div>
    `;
    highlightsContainer.appendChild(card);
  });

  // Render Table
  const tableContainer = document.getElementById('workstreams-container');
  const table = document.createElement('table');
  table.className = 'data-table';
  
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  specData.table.columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  specData.table.rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach((cell, index) => {
      const td = document.createElement('td');
      if (index === 2) { // Status column logic
        const span = document.createElement('span');
        const statusClass = cell.toLowerCase().includes('review') ? 'status-ready' : 'status-progress';
        span.className = `status-indicator ${statusClass}`;
        span.textContent = cell;
        td.appendChild(span);
      } else {
        td.textContent = cell;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableContainer.appendChild(table);

  // Render Chart
  const chartContainer = document.getElementById('velocity-chart-container');
  const cData = specData.chart;
  
  // Calculate chart bounds
  const maxVal = Math.max(...cData.points.map(p => p.value));
  const chartMax = Math.max(maxVal, cData.threshold) * 1.15; // 15% headroom
  
  // Threshold Line
  const thresholdPercent = (cData.threshold / chartMax) * 100;
  const thresholdEl = document.createElement('div');
  thresholdEl.className = 'threshold-line-container';
  thresholdEl.style.bottom = `${thresholdPercent}%`;
  thresholdEl.innerHTML = `<span class="threshold-label">${cData.thresholdLabel} (${cData.threshold} ${cData.unit})</span>`;
  chartContainer.appendChild(thresholdEl);

  // Bars Container
  const barsContainer = document.createElement('div');
  barsContainer.className = 'chart-bars-container';
  
  cData.points.forEach((point, i) => {
    const barGroup = document.createElement('div');
    barGroup.className = 'bar-group';
    
    const heightPercent = (point.value / chartMax) * 100;
    const isAgentic = point.value > cData.threshold;
    
    barGroup.innerHTML = `
      <div class="bar-track">
        <div class="bar-fill ${isAgentic ? 'agentic' : ''}" style="height: 0%" data-target-height="${heightPercent}%">
          <div class="bar-value">${point.value}</div>
        </div>
      </div>
      <div class="bar-label">${point.label}</div>
      <div class="bar-detail">${point.detail}</div>
    `;
    
    barsContainer.appendChild(barGroup);
  });
  
  chartContainer.appendChild(barsContainer);

  // Trigger chart animation after a slight delay
  setTimeout(() => {
    const fills = document.querySelectorAll('.bar-fill');
    fills.forEach(fill => {
      fill.style.height = fill.getAttribute('data-target-height');
    });
  }, 100);
});

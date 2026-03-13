const prototypeData = {
  "designDirection": {
    "purpose": "To reframe engineering as management by surfacing feedback from LLMs on prompt clarity and context quality.",
    "audience": "Engineering managers and senior developers.",
    "tone": "Professional, analytical, and constructive.",
    "memorableDetail": "LLMs providing 'upward feedback' on the human engineer's management and communication skills."
  },
  "prototypeSpec": {
    "title": "Agent Management Scorecard",
    "eyebrow": "Team Performance",
    "lede": "Evaluate how effectively your engineers direct, manage, and optimise their AI reports.",
    "highlights": [
      {
        "label": "Prompt Clarity Score",
        "value": "82%",
        "detail": "Based on LLM comprehension checks",
        "tone": "positive"
      },
      {
        "label": "First-Pass Success",
        "value": "64%",
        "detail": "Target: 80% without human intervention",
        "tone": "warning"
      },
      {
        "label": "Pending Upward Reviews",
        "value": "12",
        "detail": "New feedback from agents",
        "tone": "neutral"
      }
    ],
    "sections": [
      {
        "type": "table",
        "title": "Engineer Performance",
        "description": "Evaluate how well team members are managing their AI resources.",
        "columns": [
          "Engineer",
          "Prompt Clarity",
          "Context Quality",
          "Agent Success Rate",
          "Management Behaviour"
        ],
        "rows": [
          [
            "Alice Chen",
            "91%",
            "High",
            "88%",
            "Excellent"
          ],
          [
            "Bob Smith",
            "74%",
            "Medium",
            "58%",
            "Needs Improvement"
          ],
          [
            "Charlie Davis",
            "85%",
            "High",
            "79%",
            "Solid"
          ]
        ],
        "emptyMessage": "No engineer data available."
      },
      {
        "type": "list",
        "title": "Recent Upward Reviews",
        "description": "Direct feedback from AI agents regarding the instructions they received.",
        "items": [
          "Alice Chen: 'Excellent context provided via related files. I was able to infer the error handling behaviour easily.'",
          "Bob Smith: 'Instructions lacked edge-case definitions for the API integration. Required 3 clarifying prompts.'",
          "Charlie Davis: 'Good overarching goal, but the architectural constraints were slightly ambiguous. A more detailed lede would optimise my first pass.'"
        ]
      },
      {
        "type": "series",
        "title": "Agent Autonomy Trend",
        "description": "Percentage of AI tasks completed successfully without human correction.",
        "unit": "%",
        "threshold": 80,
        "thresholdLabel": "Target Autonomy",
        "points": [
          {
            "label": "Week 1",
            "value": 45,
            "detail": "Initial adoption"
          },
          {
            "label": "Week 2",
            "value": 52,
            "detail": "Training phase"
          },
          {
            "label": "Week 3",
            "value": 60,
            "detail": "Improving context"
          },
          {
            "label": "Week 4",
            "value": 64,
            "detail": "Current average"
          }
        ]
      }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const spec = prototypeData.prototypeSpec;

  // Populate Header
  document.getElementById('header-eyebrow').textContent = spec.eyebrow;
  document.getElementById('header-title').textContent = spec.title;
  document.getElementById('header-lede').textContent = spec.lede;

  // Populate Highlights
  const highlightsContainer = document.getElementById('highlights-container');
  spec.highlights.forEach(hl => {
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

  // Populate Sections
  spec.sections.forEach(section => {
    if (section.type === 'table') {
      document.getElementById('table-title').textContent = section.title;
      document.getElementById('table-desc').textContent = section.description;
      
      const trHead = document.getElementById('table-headers');
      section.columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        trHead.appendChild(th);
      });

      const tBody = document.getElementById('table-body');
      section.rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);
        });
        tBody.appendChild(tr);
      });
    }

    if (section.type === 'list') {
      document.getElementById('reviews-title').textContent = section.title;
      document.getElementById('reviews-desc').textContent = section.description;

      const reviewsContainer = document.getElementById('reviews-container');
      section.items.forEach(item => {
        // Naive split based on the mock data format "Name: 'Quote'"
        const parts = item.split(': \'');
        const author = parts[0];
        const quote = parts.length > 1 ? parts[1].replace(/\'$/, '') : item;

        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
          <span class="review-author">${author}</span>
          <span class="review-quote">${quote}</span>
        `;
        reviewsContainer.appendChild(div);
      });
    }

    if (section.type === 'series') {
      document.getElementById('chart-title').textContent = section.title;
      document.getElementById('chart-desc').textContent = section.description;

      const chartContainer = document.getElementById('chart-container');
      
      // Draw Threshold Line
      const thresholdLine = document.createElement('div');
      thresholdLine.className = 'chart-threshold';
      thresholdLine.style.bottom = `${section.threshold}%`;
      thresholdLine.innerHTML = `<span class="chart-threshold-label">${section.thresholdLabel} (${section.threshold}${section.unit})</span>`;
      chartContainer.appendChild(thresholdLine);

      // Draw Bars
      // To animate nicely, we set height to 0 initially, then update it
      const barsToAnimate = [];

      section.points.forEach(point => {
        const group = document.createElement('div');
        group.className = 'chart-bar-group';
        group.title = point.detail;

        const valueLabel = document.createElement('div');
        valueLabel.className = 'chart-value-label';
        valueLabel.textContent = `${point.value}${section.unit}`;
        group.appendChild(valueLabel);

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = '0%';
        group.appendChild(bar);

        const label = document.createElement('div');
        label.className = 'chart-label';
        label.textContent = point.label;
        group.appendChild(label);

        chartContainer.appendChild(group);
        barsToAnimate.push({ element: bar, targetHeight: point.value });
      });

      // Trigger animation after a slight delay to allow rendering
      setTimeout(() => {
        barsToAnimate.forEach(b => {
          b.element.style.height = `${b.targetHeight}%`;
        });
      }, 100);
    }
  });
});

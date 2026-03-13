document.addEventListener('DOMContentLoaded', () => {
  // Data derived from the brief prototype spec
  const specData = {
    "title": "Agent Upward Review",
    "eyebrow": "Delegation Analytics",
    "lede": "Review your prompting behaviour and delegation effectiveness based on direct feedback from your AI coding agents.",
    "highlights": [
      {
        "label": "Prompt Clarity Score",
        "value": "B+",
        "detail": "Based on context provided in your initial instructions",
        "tone": "positive"
      },
      {
        "label": "Zero-Touch PRs",
        "value": "42%",
        "detail": "Tasks completed by AI without human code edits",
        "tone": "neutral"
      },
      {
        "label": "Iteration Overhead",
        "value": "4.1",
        "detail": "Average prompts required to resolve a single issue",
        "tone": "warning"
      }
    ],
    "sections": {
      "efficiency": {
        "title": "Delegation Efficiency",
        "description": "Percentage of AI-generated Pull Requests requiring zero human intervention over time.",
        "unit": "%",
        "threshold": 50,
        "thresholdLabel": "Target Efficiency",
        "points": [
          { "label": "Week 1", "value": 15, "detail": "Onboarding" },
          { "label": "Week 2", "value": 28, "detail": "Adjusting prompts" },
          { "label": "Week 3", "value": 35, "detail": "Adding file paths" },
          { "label": "Week 4", "value": 42, "detail": "Current" }
        ]
      },
      "feedback": {
        "title": "Recent Task Feedback",
        "description": "Upward reviews from your agents on recently assigned tickets.",
        "columns": ["Task", "Agent", "Complexity", "Prompt Rating", "Agent Feedback"],
        "rows": [
          ["Refactor payment gateway", "Linear Agent", "High", "Needs Context", "Missing documentation on the legacy Stripe implementation."],
          ["Update navigation styling", "Linear Agent", "Low", "Excellent", "Clear acceptance criteria and exact file paths provided."],
          ["Implement user caching", "RootCode Cloud", "Medium", "Adequate", "Vague initial prompt; required 5 iterations to clarify Redis structure."]
        ]
      },
      "behaviours": {
        "title": "Suggested Management Behaviours",
        "description": "Actionable areas to optimise your AI delegation skills based on recent loops.",
        "items": [
          "Include specific file paths rather than asking the agent to search the entire repository.",
          "Define explicit acceptance criteria in the initial prompt to reduce iteration overhead.",
          "Provide context on upstream dependencies when assigning high-complexity architectural tasks."
        ]
      }
    }
  };

  // Populate Header
  document.getElementById('ui-eyebrow').textContent = specData.eyebrow;
  document.getElementById('ui-title').textContent = specData.title;
  document.getElementById('ui-lede').textContent = specData.lede;

  // Render Highlights
  const highlightsContainer = document.getElementById('ui-highlights');
  specData.highlights.forEach(hl => {
    const card = document.createElement('div');
    card.className = `highlight-card theme-${hl.tone} region`;
    card.innerHTML = `
      <span class="label">${hl.label}</span>
      <span class="value">${hl.value}</span>
      <span class="detail">${hl.detail}</span>
    `;
    highlightsContainer.appendChild(card);
  });

  // Render Efficiency Chart
  const chartSec = specData.sections.efficiency;
  document.getElementById('chart-title').textContent = chartSec.title;
  document.getElementById('chart-desc').textContent = chartSec.description;
  const chartContainer = document.getElementById('ui-chart');
  
  // Add threshold line container logic
  const trackWrapper = document.createElement('div');
  trackWrapper.style.position = 'relative';
  trackWrapper.style.marginTop = '20px'; // space for threshold label

  chartSec.points.forEach((pt, index) => {
    const isLast = index === chartSec.points.length - 1;
    const row = document.createElement('div');
    row.className = 'chart-row';
    row.innerHTML = `
      <div class="chart-label">${pt.label}</div>
      <div class="chart-track">
        <div class="chart-bar ${isLast ? 'current' : ''}" style="width: 0%" data-target="${pt.value}%">
          ${pt.value}${chartSec.unit}
        </div>
        ${index === 0 ? `
          <div class="chart-target-line" style="left: ${chartSec.threshold}%"></div>
          <div class="chart-target-label" style="left: ${chartSec.threshold}%">${chartSec.thresholdLabel}</div>
        ` : ''}
      </div>
    `;
    chartContainer.appendChild(row);
  });

  // Animate bars after a short delay
  setTimeout(() => {
    document.querySelectorAll('.chart-bar').forEach(bar => {
      bar.style.width = bar.getAttribute('data-target');
    });
  }, 100);

  // Render List
  const listSec = specData.sections.behaviours;
  document.getElementById('list-title').textContent = listSec.title;
  document.getElementById('list-desc').textContent = listSec.description;
  const listContainer = document.getElementById('ui-list');
  const ol = document.createElement('ol');
  listSec.items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item}</span>`;
    ol.appendChild(li);
  });
  listContainer.appendChild(ol);

  // Render Table
  const tableSec = specData.sections.feedback;
  document.getElementById('table-title').textContent = tableSec.title;
  document.getElementById('table-desc').textContent = tableSec.description;
  
  const thead = document.getElementById('ui-table-head');
  const trHead = document.createElement('tr');
  tableSec.columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  const tbody = document.getElementById('ui-table-body');
  tableSec.rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach((cell, i) => {
      const td = document.createElement('td');
      if (tableSec.columns[i] === "Prompt Rating") {
        const ratingClass = cell.replace(/\s+/g, '.');
        td.innerHTML = `<span class="rating-badge rating-${ratingClass}">${cell}</span>`;
      } else if (tableSec.columns[i] === "Agent Feedback") {
        td.className = "cell-feedback";
        td.textContent = cell;
      } else {
        td.textContent = cell;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
});

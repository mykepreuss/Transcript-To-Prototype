const prototype = {
  "summary": "Recap + plan:\n- Goal: build a deterministic, browser-viewable knicks brunson tracker prototype.\n- Constraints: local fixtures only, no external APIs, neutral copy, minimal implementation.\n- Data: 5 schedule entries and 5 scoring entries parsed from the transcript.\n- Build: static web view with next fixture Boston (Home) on 2026-03-12, L5 31.2 ppg, L3 33.7 ppg.\n- Acceptance: direct browser open, deterministic calculations, threshold flag: 30+ form.",
  "spec": {
    "title": "Knicks Brunson Tracker",
    "eyebrow": "Transcript-selected prototype",
    "lede": "Quick browser prototype aligned to the strongest signal in the intake transcript.",
    "highlights": [
      {
        "label": "Next fixture",
        "value": "Boston",
        "detail": "Home on 2026-03-12"
      },
      {
        "label": "L5 average",
        "value": "31.2 ppg",
        "detail": "Latest five scoring entries in the transcript fixtures."
      },
      {
        "label": "L3 form",
        "value": "33.7 ppg",
        "detail": "Threshold reached for 30+ form.",
        "tone": "positive"
      }
    ],
    "sections": [
      {
        "type": "table",
        "title": "Upcoming schedule",
        "description": "Structured rows extracted from the transcript for the initial demo.",
        "columns": [
          "Date",
          "Opponent",
          "Venue"
        ],
        "rows": [
          [
            "2026-03-12",
            "Boston",
            "Home"
          ],
          [
            "2026-03-14",
            "Miami",
            "Away"
          ],
          [
            "2026-03-16",
            "Philly",
            "Home"
          ],
          [
            "2026-03-18",
            "Chicago",
            "Away"
          ],
          [
            "2026-03-20",
            "Cleveland",
            "Home"
          ]
        ],
        "emptyMessage": "No schedule rows were extracted from the transcript."
      },
      {
        "type": "series",
        "title": "Scoring trend",
        "description": "Numeric series derived from the transcript fixtures.",
        "unit": "pts",
        "threshold": 30,
        "thresholdLabel": "30+ form threshold",
        "points": [
          {
            "label": "Opponent 1",
            "value": 31,
            "detail": "game-1"
          },
          {
            "label": "Opponent 2",
            "value": 24,
            "detail": "game-2"
          },
          {
            "label": "Opponent 3",
            "value": 39,
            "detail": "game-3"
          },
          {
            "label": "Opponent 4",
            "value": 27,
            "detail": "game-4"
          },
          {
            "label": "Opponent 5",
            "value": 35,
            "detail": "game-5"
          }
        ],
        "emptyMessage": "No numeric series was extracted from the transcript."
      },
      {
        "type": "list",
        "title": "Transcript signals",
        "description": "Key lines preserved from the intake conversation.",
        "items": [
          "<@U0AKW4NTMRS> Zoom Meeting Transcript",
          "Knicks tracker prototype",
          "Morgan, Casey, Riley, Jordan",
          "Alright, let’s keep this one tight. What we need for the prototype is basically two answers. One, what is the upcoming Knicks schedule. Two, how is Jalen Brunson scoring across his recent starts.",
          "Yeah. I think for V1 we should make this a very simple input-output data tool. No external APIs. Just use a local fixture file so we can test it repeatedly and not worry about network variance."
        ],
        "ordered": false,
        "emptyMessage": "No transcript signals were extracted."
      },
      {
        "type": "list",
        "title": "Acceptance checks",
        "description": "The browser demo should satisfy these checks on first open.",
        "items": [
          "Goal: build a deterministic, browser-viewable knicks brunson tracker prototype.",
          "Constraints: local fixtures only, no external APIs, neutral copy, minimal implementation.",
          "Data: 5 schedule entries and 5 scoring entries parsed from the transcript.",
          "Build: static web view with next fixture Boston (Home) on 2026-03-12, L5 31.2 ppg, L3 33.7 ppg."
        ],
        "ordered": true,
        "emptyMessage": "No acceptance checks were generated."
      }
    ],
    "demoSteps": [
      "Open index.html in a browser.",
      "Review the highlights and generated sections against the transcript intent.",
      "Inspect fixtures/prototype-spec.json for the selected build contract."
    ],
    "notes": [
      "Deterministic V1 using local fixture data only.",
      "No external APIs or live integrations are required."
    ]
  },
  "extractedData": {
    "schedule": [
      {
        "date": "2026-03-12",
        "opponent": "Boston",
        "homeAway": "Home"
      },
      {
        "date": "2026-03-14",
        "opponent": "Miami",
        "homeAway": "Away"
      },
      {
        "date": "2026-03-16",
        "opponent": "Philly",
        "homeAway": "Home"
      },
      {
        "date": "2026-03-18",
        "opponent": "Chicago",
        "homeAway": "Away"
      },
      {
        "date": "2026-03-20",
        "opponent": "Cleveland",
        "homeAway": "Home"
      }
    ],
    "scoring": [
      {
        "date": "game-1",
        "opponent": "Opponent 1",
        "points": 31
      },
      {
        "date": "game-2",
        "opponent": "Opponent 2",
        "points": 24
      },
      {
        "date": "game-3",
        "opponent": "Opponent 3",
        "points": 39
      },
      {
        "date": "game-4",
        "opponent": "Opponent 4",
        "points": 27
      },
      {
        "date": "game-5",
        "opponent": "Opponent 5",
        "points": 35
      }
    ]
  }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderHighlights(highlights) {
  const grid = document.querySelector("#highlight-grid");
  if (!grid) return;

  grid.innerHTML = highlights.map((highlight) => {
    const tone = highlight.tone ? `card-${highlight.tone}` : "card-neutral";
    return `
      <article class="card ${tone}">
        <p class="label">${escapeHtml(highlight.label)}</p>
        <h2 class="card-value">${escapeHtml(highlight.value)}</h2>
        <p class="muted">${escapeHtml(highlight.detail)}</p>
      </article>
    `;
  }).join("");
}

function renderTableSection(section) {
  const header = `
    <div class="section-header">
      <div>
        <h3>${escapeHtml(section.title)}</h3>
        ${section.description ? `<p class="section-description">${escapeHtml(section.description)}</p>` : ""}
      </div>
    </div>
  `;

  if (!section.rows.length) {
    return `
      <section class="section-card">
        ${header}
        <p class="table-empty">${escapeHtml(section.emptyMessage || "No rows were generated for this section.")}</p>
      </section>
    `;
  }

  const head = section.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("");
  const rows = section.rows.map((row) => `
    <tr>
      ${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}
    </tr>
  `).join("");

  return `
    <section class="section-card">
      ${header}
      <table>
        <thead><tr>${head}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
  `;
}

function renderSeriesSection(section) {
  const header = `
    <div class="section-header">
      <div>
        <h3>${escapeHtml(section.title)}</h3>
        ${section.description ? `<p class="section-description">${escapeHtml(section.description)}</p>` : ""}
      </div>
      ${section.thresholdLabel && typeof section.threshold === "number"
        ? `<p class="muted">${escapeHtml(section.thresholdLabel)}: ${escapeHtml(section.threshold)}</p>`
        : ""}
    </div>
  `;

  if (!section.points.length) {
    return `
      <section class="section-card">
        ${header}
        <p class="chart-detail">${escapeHtml(section.emptyMessage || "No numeric points were generated for this section.")}</p>
      </section>
    `;
  }

  const maxValue = Math.max(...section.points.map((point) => point.value), 1);
  const bars = section.points.map((point) => {
    const height = Math.max((point.value / maxValue) * 100, 8);
    const thresholdHit =
      typeof section.threshold === "number" && point.value >= section.threshold;
    const suffix = section.unit ? ` ${section.unit}` : "";

    return `
      <article class="bar-card">
        <div class="bar-track">
          <div class="bar-fill ${thresholdHit ? "threshold-hit" : ""}" style="height: ${height}%"></div>
        </div>
        <div class="bar-value">${escapeHtml(`${point.value}${suffix}`)}</div>
        <div class="bar-caption">${escapeHtml(point.label)}</div>
        ${point.detail ? `<div class="chart-detail">${escapeHtml(point.detail)}</div>` : ""}
      </article>
    `;
  }).join("");

  return `
    <section class="section-card">
      ${header}
      <div class="bars">${bars}</div>
    </section>
  `;
}

function renderListSection(section) {
  const header = `
    <div class="section-header">
      <div>
        <h3>${escapeHtml(section.title)}</h3>
        ${section.description ? `<p class="section-description">${escapeHtml(section.description)}</p>` : ""}
      </div>
    </div>
  `;
  const tag = section.ordered ? "ol" : "ul";

  if (!section.items.length) {
    return `
      <section class="section-card">
        ${header}
        <p class="list-empty">${escapeHtml(section.emptyMessage || "No list items were generated for this section.")}</p>
      </section>
    `;
  }

  const items = section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return `
    <section class="section-card">
      ${header}
      <${tag} class="stack-list ${section.ordered ? "ordered" : ""}">
        ${items}
      </${tag}>
    </section>
  `;
}

function renderTextSection(section) {
  return `
    <section class="section-card">
      <div class="section-header">
        <div>
          <h3>${escapeHtml(section.title)}</h3>
        </div>
      </div>
      <p class="text-block">${escapeHtml(section.body)}</p>
    </section>
  `;
}

function renderSections(sections) {
  const container = document.querySelector("#section-stack");
  if (!container) return;

  container.innerHTML = sections.map((section) => {
    switch (section.type) {
      case "table":
        return renderTableSection(section);
      case "series":
        return renderSeriesSection(section);
      case "list":
        return renderListSection(section);
      case "text":
        return renderTextSection(section);
      default:
        return "";
    }
  }).join("");
}

function renderSimpleList(selector, items) {
  const node = document.querySelector(selector);
  const panel = node?.closest(".panel");
  if (!node || !panel) return;

  if (!items.length) {
    panel.classList.add("hidden");
    return;
  }

  node.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  panel.classList.remove("hidden");
}

function main() {
  const spec = prototype.spec;
  document.title = `Transcript Prototype · ${spec.title}`;

  const eyebrow = document.querySelector("#eyebrow");
  const title = document.querySelector("#prototype-title");
  const lede = document.querySelector("#prototype-lede");
  const summaryBlock = document.querySelector("#summary-block");

  if (eyebrow) eyebrow.textContent = spec.eyebrow;
  if (title) title.textContent = spec.title;
  if (lede) lede.textContent = spec.lede;
  if (summaryBlock) summaryBlock.textContent = prototype.summary;

  renderHighlights(spec.highlights || []);
  renderSections(spec.sections || []);
  renderSimpleList("#demo-steps", spec.demoSteps || []);
  renderSimpleList("#notes-list", spec.notes || []);
}

main();

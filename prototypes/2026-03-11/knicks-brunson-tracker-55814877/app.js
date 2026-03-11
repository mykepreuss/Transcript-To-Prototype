const schedule = [
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
];
const scoring = [
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
];

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatAverage(value) {
  return `${value.toFixed(1)} ppg`;
}

function renderSchedule(schedule) {
  const table = document.querySelector("#schedule-table");
  if (!table) return;

  table.innerHTML = schedule.map((game) => `
    <tr>
      <td>${game.date}</td>
      <td>${game.opponent}</td>
      <td>${game.homeAway}</td>
    </tr>
  `).join("");

  const nextGame = schedule[0];
  const nextGameHeading = document.querySelector("#next-game");
  const nextGameMeta = document.querySelector("#next-game-meta");

  if (nextGame && nextGameHeading && nextGameMeta) {
    nextGameHeading.textContent = nextGame.opponent;
    nextGameMeta.textContent = `${nextGame.homeAway} · ${nextGame.date}`;
  }
}

function renderScoring(scoring) {
  const points = scoring.map((game) => game.points);
  const lastFiveAverage = average(points.slice(-5));
  const lastThreeAverage = average(points.slice(-3));
  const thresholdMet = lastThreeAverage >= 30;

  const l5 = document.querySelector("#last-five-average");
  const l3 = document.querySelector("#last-three-average");
  const flag = document.querySelector("#threshold-flag");

  if (l5) l5.textContent = formatAverage(lastFiveAverage);
  if (l3) l3.textContent = formatAverage(lastThreeAverage);
  if (flag) {
    flag.textContent = thresholdMet ? "Threshold flag: 30+ form" : "Threshold flag: below 30";
    flag.className = thresholdMet ? "flag-hot" : "flag-normal";
  }

  const bars = document.querySelector("#scoring-bars");
  if (!bars) return;

  const maxPoints = Math.max(...points, 1);
  bars.innerHTML = scoring.map((game) => {
    const height = Math.max((game.points / maxPoints) * 100, 6);
    return `
      <article class="bar-card">
        <div class="bar-track">
          <div class="bar-fill" style="height: ${height}%"></div>
        </div>
        <div class="bar-value">${game.points}</div>
        <div class="bar-caption">${game.opponent} · ${game.date}</div>
      </article>
    `;
  }).join("");
}

function main() {
  renderSchedule(schedule);
  renderScoring(scoring);
}

main();

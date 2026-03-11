document.addEventListener('DOMContentLoaded', () => {
  // Localized Data Fixture (No external network calls)
  const fixtureData = {
    schedule: [
      { date: "2026-03-12", opponent: "Boston", homeAway: "Home" },
      { date: "2026-03-14", opponent: "Miami", homeAway: "Away" },
      { date: "2026-03-16", opponent: "Philly", homeAway: "Home" },
      { date: "2026-03-18", opponent: "Chicago", homeAway: "Away" },
      { date: "2026-03-20", opponent: "Cleveland", homeAway: "Home" }
    ],
    scoring: [
      { label: "Game 1", opponent: "Opponent 1", points: 31 },
      { label: "Game 2", opponent: "Opponent 2", points: 24 },
      { label: "Game 3", opponent: "Opponent 3", points: 39 },
      { label: "Game 4", opponent: "Opponent 4", points: 27 },
      { label: "Game 5", opponent: "Opponent 5", points: 35 }
    ]
  };

  const THRESHOLD = 30;
  const MAX_CHART_POINTS = 50;

  // Calculate Averages
  const calculateAverage = (dataArray) => {
    if (dataArray.length === 0) return 0;
    const sum = dataArray.reduce((acc, curr) => acc + curr.points, 0);
    return (sum / dataArray.length).toFixed(1);
  };

  const l5Avg = calculateAverage(fixtureData.scoring);
  const last3Games = fixtureData.scoring.slice(-3);
  const l3Avg = calculateAverage(last3Games);

  // Populate Highlights
  document.getElementById('l5-value').textContent = l5Avg;
  
  const l3ValueEl = document.getElementById('l3-value');
  const l3CardEl = document.getElementById('l3-card');
  const l3FlagEl = document.getElementById('l3-flag');
  
  l3ValueEl.textContent = l3Avg;

  // Threshold Logic Application
  if (parseFloat(l3Avg) >= THRESHOLD) {
    l3CardEl.classList.add('threshold-met');
    l3FlagEl.textContent = 'THRESHOLD: 30+ MET';
  } else {
    l3FlagEl.textContent = 'Below threshold';
  }

  // Populate Next Fixture
  if (fixtureData.schedule.length > 0) {
    const nextGame = fixtureData.schedule[0];
    // Format Date from YYYY-MM-DD to DD MMM YYYY
    const dateObj = new Date(nextGame.date);
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    document.getElementById('next-fixture-val').textContent = nextGame.opponent;
    document.getElementById('next-fixture-detail').textContent = `${formattedDate} (${nextGame.homeAway})`;
  }

  // Render Schedule Table
  const scheduleBody = document.getElementById('schedule-body');
  fixtureData.schedule.forEach(game => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${game.date}</td>
      <td>${game.opponent}</td>
      <td>${game.homeAway}</td>
    `;
    scheduleBody.appendChild(row);
  });

  // Render Scoring Bars
  const scoringBarsContainer = document.getElementById('scoring-bars');
  fixtureData.scoring.forEach((game) => {
    const barGroup = document.createElement('div');
    barGroup.className = `bar-group ${game.points >= THRESHOLD ? 'over-threshold' : ''}`;

    const heightPercentage = Math.min((game.points / MAX_CHART_POINTS) * 100, 100);

    barGroup.innerHTML = `
      <span class="bar-value">${game.points}</span>
      <div class="bar ${game.points >= THRESHOLD ? 'over-threshold' : ''}" style="height: 0%;" data-target-height="${heightPercentage}%"></div>
      <span class="bar-label">${game.label.replace('Game ', 'G')}</span>
    `;
    
    scoringBarsContainer.appendChild(barGroup);
  });

  // Trigger Bar Animation post-mount
  setTimeout(() => {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
      bar.style.height = bar.getAttribute('data-target-height');
    });
  }, 50);
});

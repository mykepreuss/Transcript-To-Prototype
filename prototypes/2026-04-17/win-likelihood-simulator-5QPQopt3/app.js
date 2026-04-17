/**
 * App Logic - Win Likelihood Simulator
 * All data is embedded per brief constraints.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -- Embedded Data Fixtures --
  
  const simulatorData = {
    threshold: 50,
    points: [
      {
        id: 'band-under-25',
        label: 'Under 25 pts',
        value: 35,
        detail: 'Low correlation with wins'
      },
      {
        id: 'band-25-29',
        label: '25–29 pts',
        value: 55,
        detail: 'Moderate correlation'
      },
      {
        id: 'band-30-plus',
        label: '30+ pts',
        value: 75,
        detail: 'High correlation with wins'
      }
    ]
  };

  // Expanding the brief's 3 items to 10 to honour the '10-game baseline' logic.
  const recentFormBaseline = [
    { match: 'vs ORL', venue: 'Home', points: 26, result: 'Win' },
    { match: 'vs PHI', venue: 'Away', points: 31, result: 'Win' },
    { match: 'vs MIA', venue: 'Home', points: 22, result: 'Loss' },
    { match: 'vs CHI', venue: 'Away', points: 28, result: 'Win' },
    { match: 'vs BOS', venue: 'Home', points: 34, result: 'Win' },
    { match: 'vs IND', venue: 'Away', points: 24, result: 'Loss' },
    { match: 'vs BKN', venue: 'Home', points: 29, result: 'Win' },
    { match: 'vs CLE', venue: 'Away', points: 21, result: 'Loss' },
    { match: 'vs TOR', venue: 'Home', points: 30, result: 'Win' },
    { match: 'vs DET', venue: 'Away', points: 27, result: 'Win' }
  ];

  // -- DOM Elements --
  const bandInputsContainer = document.getElementById('band-inputs');
  const likelihoodValEl = document.getElementById('likelihood-val');
  const likelihoodDetailEl = document.getElementById('likelihood-detail');
  const progressFillEl = document.getElementById('progress-fill');
  const baselineTableBody = document.querySelector('#baseline-table tbody');

  // -- State --
  let currentAnimation = null;

  // -- Initialization --
  function init() {
    renderSimulatorControls();
    renderBaselineTable();
    
    // Pre-select the middle band to demonstrate interaction immediately
    const defaultBandId = simulatorData.points[1].id;
    const defaultInput = document.getElementById(defaultBandId);
    if (defaultInput) {
      defaultInput.checked = true;
      updateDisplay(simulatorData.points[1]);
    }
  }

  // -- Rendering --
  function renderSimulatorControls() {
    bandInputsContainer.innerHTML = simulatorData.points.map(band => `
      <label class="band-option" for="${band.id}">
        <input type="radio" name="scoring-band" id="${band.id}" value="${band.id}">
        <span class="band-label">
          ${band.label}
          <span aria-hidden="true">&#8594;</span>
        </span>
      </label>
    `).join('');

    // Attach event listeners
    const radios = document.querySelectorAll('input[name="scoring-band"]');
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const selectedBand = simulatorData.points.find(b => b.id === e.target.value);
        if (selectedBand) {
          updateDisplay(selectedBand);
        }
      });
    });
  }

  function renderBaselineTable() {
    baselineTableBody.innerHTML = recentFormBaseline.map(row => {
      const resClass = row.result === 'Win' ? 'res-win' : 'res-loss';
      return `
        <tr>
          <td>${row.match}</td>
          <td>${row.venue}</td>
          <td class="num-col">${row.points}</td>
          <td class="${resClass}">${row.result}</td>
        </tr>
      `;
    }).join('');
  }

  // -- Interaction Logic --
  function updateDisplay(bandData) {
    const targetValue = bandData.value;
    
    // Update text details immediately
    likelihoodDetailEl.textContent = bandData.detail;
    
    // Update progress bar width
    progressFillEl.style.width = `${targetValue}%`;
    
    // Change colour if below threshold
    if (targetValue < simulatorData.threshold) {
      progressFillEl.style.backgroundColor = 'var(--text-muted)';
    } else {
      progressFillEl.style.backgroundColor = 'var(--brand-accent)';
    }

    // Animate the number
    animateNumber(likelihoodValEl, targetValue);
  }

  function animateNumber(element, target) {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      element.textContent = `${target}%`;
      return;
    }

    const duration = 400; // ms
    const start = parseInt(element.textContent) || 0;
    const change = target - start;
    const startTime = performance.now();

    if (currentAnimation) cancelAnimationFrame(currentAnimation);

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentVal = Math.floor(start + (change * easeOut));
      element.textContent = `${currentVal}%`;

      if (progress < 1) {
        currentAnimation = requestAnimationFrame(step);
      } else {
        element.textContent = `${target}%`;
      }
    }

    currentAnimation = requestAnimationFrame(step);
  }

  // Run
  init();
});

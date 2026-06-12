const COLORS = ['#44bcd8','#009c3b','#e04040','#ff8c00','#8b5cf6','#0ea5e9','#ec4899'];
const FLAG_COLORS = ['#009c3b','#002776','#6B35A8','#e04040','#ff8c00'];

const API_URL = 'https://sheetdb.io/api/v1/poniwriseb5v2';

const GAMES = [
  { id: 'jogo_1', home: 'Brasil', away: 'Marrocos' },
  { id: 'jogo_2', home: 'Brasil', away: 'Haiti' },
  { id: 'jogo_3', home: 'Brasil', away: 'Escócia' },
];

let players = [
  { name: 'CYRO', role: 'CEO', photo: './assets/cyro.png', number: 1, flag: '🇧🇷', stars: 5 },
  { name: 'GUSTAVO', role: 'GESTÃO', photo: './assets/gustavo.png', number: 2, flag: '🇧🇷', stars: 5 },
  { name: 'PALAVRO', role: 'MARKETING PRODUTO', photo: './assets/palavro.png', number: 3, flag: '🇧🇷', stars: 5 },
  { name: 'CRISTINA', role: 'MARKETING', photo: './assets/cris.png', number: 4, flag: '🇧🇷', stars: 5 },
  { name: 'NICOLAS', role: 'MARKETING', photo: './assets/nicolas.png', number: 5, flag: '🇧🇷', stars: 5 },
  { name: 'CAMILA', role: 'MARKETING FRIVEN', photo: './assets/camila.png', number: 6, flag: '🇧🇷', stars: 5 },
  { name: 'GUSMÃO', role: 'NEGÓCIOS DIGITAIS', photo: './assets/gusmão.png', number: 7, flag: '🇧🇷', stars: 5 },
  { name: 'CAMILA', role: 'NEGÓCIOS DIGITAIS', photo: './assets/cami.png', number: 8, flag: '🇧🇷', stars: 5 },
  { name: 'LILIAN', role: 'NEGÓCIOS DIGITAIS', photo: './assets/lili.png', number: 9, flag: '🇧🇷', stars: 5 },
  { name: 'DAIANE', role: 'NEGÓCIOS DIGITAIS', photo: './assets/daiane.png', number: 10, flag: '🇧🇷', stars: 5 },
  { name: 'PRISCILA', role: 'NEGÓCIOS DIGITAIS', photo: './assets/priscila.png', number: 11, flag: '🇧🇷', stars: 5 },
  { name: 'GLAUCIA', role: 'MARKETING', photo: './assets/glaucia.png', number: 12, flag: '🇧🇷', stars: 5 }, 
  { name: 'KEILA', role: 'MARKETING', photo: './assets/keila.png', number: 13, flag: '🇧🇷', stars: 5 },
  { name: 'FABIANA', role: 'MARKETING', photo: './assets/fabiana.png', number: 14, flag: '🇧🇷', stars: 5 },
  { name: 'JULIA', role: 'MARKETING', photo: './assets/julia.png', number: 15, flag: '🇧🇷', stars: 5 },
  { name: 'LETICIA', role: 'MARKETING', photo: './assets/leticia.png', number: 16, flag: '🇧🇷', stars: 5 },
  { name: 'JOÃO', role: 'MARKETING', photo: './assets/jp.png', number: 17, flag: '🇧🇷', stars: 5 },
  { name: 'ALICE', role: 'MARKETING', photo: './assets/alice.png', number: 18, flag: '🇧🇷', stars: 5 },
  { name: 'LUANA', role: 'MARKETING', photo: './assets/luana.png', number: 19, flag: '🇧🇷', stars: 5 },
  { name: 'ALINE', role: 'MARKETING', photo: './assets/aline.png', number: 20, flag: '🇧🇷', stars: 5 },
  { name: 'AMANDA', role: 'MARKETING', photo: './assets/amanda.png', number: 21, flag: '🇧🇷', stars: 5 },
  { name: 'TAMIRES', role: 'MARKETING FRIVEN', photo: './assets/tamires.png', number: 22, flag: '🇧🇷', stars: 5 },
  { name: 'DANIELE', role: 'MARKETING FRIVEN', photo: './assets/daniele.png', number: 23, flag: '🇧🇷', stars: 5 },
  { name: 'MARIA LUIZA', role: 'MARKETING FRIVEN', photo: './assets/malu.png', number: 24, flag: '🇧🇷', stars: 5 },
  { name: 'LUANE', role: 'MARKETING PRODUTO', photo: './assets/luane.png', number: 25, flag: '🇧🇷', stars: 5 },
  { name: 'ALISSON', role: 'MARKETING PRODUTO', photo: './assets/alisson.png', number: 26, flag: '🇧🇷', stars: 5 },
  { name: 'AUGUSTO', role: 'MARKETING PRODUTO', photo: './assets/augusto.png', number: 27, flag: '🇧🇷', stars: 5 },
  { name: 'Marlon', role: 'MARKETING PRODUTO', photo: './assets/marlon.png', number: 28, flag: '🇧🇷', stars: 5 },
  { name: 'AMANDA BAO', role: 'MARKETING PRODUTO', photo: './assets/amanda-bao.png', number: 29, flag: '🇧🇷', stars: 5 },
  { name: 'VINICIUS', role: 'MARKETING PRODUTO', photo: './assets/vinicius.png', number: 30, flag: '🇧🇷', stars: 5 },
];

let revealedCount = parseInt(localStorage.getItem('soprano_revealed_count')) || 0;
let cardEls = [];
let currentPlayerIndexForGuesses = null;

let cachedGuesses = [];

function buildGrid() {
  const grid = document.getElementById('stickerGrid');
  grid.innerHTML = '';
  cardEls = [];

  players.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'sticker-card';
    el.dataset.index = i;
    el.style.background = COLORS[i % COLORS.length];

    if (i < revealedCount) {
      el.classList.add('revealed');
    }

    el.onclick = () => {
      if (el.classList.contains('revealed')) {
        openGuessesModal(i);
      }
    };

    const starsStr = '★'.repeat(p.stars) + '☆'.repeat(5 - p.stars);
    
    el.innerHTML = `
      <div class="card-header" style="background:${FLAG_COLORS[i % FLAG_COLORS.length]}">
        <span class="card-flag">${p.flag}</span>
        <span class="soprano-mini">Soprano</span>
        <span class="card-number">${String(p.number).padStart(2,'0')}</span>
      </div>
      <div style="position:relative">
        <img class="card-photo" src="${p.photo}" alt="${p.name}">
        <div class="card-shimmer"></div>
      </div>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-role">${p.role}</div>
      </div>
      <div class="card-footer">
        <span class="panini-badge">Bolão 26</span>
        <span class="stars">${starsStr}</span>
      </div>`;

    grid.appendChild(el);
    cardEls.push(el);
  });

  updateCounter();
}

function revealNext() {
  if (revealedCount >= players.length) return;
  
  const card = cardEls[revealedCount];
  card.classList.add('revealed');
  revealedCount++;
  
  localStorage.setItem('soprano_revealed_count', revealedCount);
  
  updateCounter();
  openRevealModal(card.innerHTML, card.style.background);
}

function updateCounter() {
  document.getElementById('counterText').textContent = `${revealedCount} / ${players.length} reveladas`;
  const pct = players.length ? (revealedCount / players.length * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';

  const revealSection = document.querySelector('.reveal-section');
  if (revealedCount >= players.length && revealSection) {
    const btnReveal = document.getElementById('btnReveal');
    if (btnReveal) btnReveal.style.display = 'none';
  }
}

function openRevealModal(cardHtml, cardBackground) {
  const overlay = document.getElementById('revealModalOverlay');
  const highlightCard = document.getElementById('revealedCardHighlight');
  
  highlightCard.classList.remove('closing');
  highlightCard.innerHTML = cardHtml;
  highlightCard.style.background = cardBackground;
  
  overlay.classList.add('open');
  overlay.style.display = 'flex';
  
  burstCenter();

  setTimeout(() => {
    highlightCard.classList.add('closing');
    setTimeout(() => {
      closeRevealModal();
    }, 400);
  }, 1800); 
}

function closeRevealModal() {
  document.getElementById('revealModalOverlay').classList.remove('open');
  setTimeout(() => {
    document.getElementById('revealModalOverlay').style.display = 'none';
  }, 300);
}


async function fetchPalpitesPlanilha() {
  try {
    const response = await fetch(API_URL);
    cachedGuesses = await response.json();
  } catch (error) {
    console.error("Erro ao buscar palpites da planilha:", error);
  }
}

async function openGuessesModal(playerIndex) {
  currentPlayerIndexForGuesses = playerIndex;
  const player = players[playerIndex];
  
  document.getElementById('modalPlayerName').textContent = player.name;
  const container = document.getElementById('gamesContainer');
  container.innerHTML = `<p style="text-align:center; color:var(--amarelo); font-size:12px;">Carregando palpites da nuvem...</p>`;

  document.getElementById('guessesModalOverlay').classList.add('open');

  await fetchPalpitesPlanilha();
  container.innerHTML = '';

  GAMES.forEach(game => {
    const match = cachedGuesses.find(g => g.colaborador === player.name && g.jogo_id === game.id);
    const homeScore = match ? match.placar_casa : '';
    const awayScore = match ? match.placar_visitante : '';

    const row = document.createElement('div');
    row.className = 'game-row';
    row.innerHTML = `
      <span class="team-name home">${game.home}</span>
      <div class="score-vs">
        <input type="number" class="score-input" id="input_${game.id}_home" value="${homeScore}">
        <span class="vs-label">X</span>
        <input type="number" class="score-input" id="input_${game.id}_away" value="${awayScore}">
      </div>
      <span class="team-name away">${game.away}</span>
    `;
    container.appendChild(row);
  });
}

function closeGuessesModal() {
  document.getElementById('guessesModalOverlay').classList.remove('open');
  currentPlayerIndexForGuesses = null;
}

async function salvarPalpites() {
  if (currentPlayerIndexForGuesses === null) return;
  const player = players[currentPlayerIndexForGuesses];
  const btnSave = document.querySelector('#guessesModalOverlay .btn-add');
  
  btnSave.textContent = 'Enviando... ⏳';
  btnSave.disabled = true;

  let novosPalpites = [];

  try {
    await fetch(`${API_URL}/colaborador/${player.name}`, { method: 'DELETE' });
  } catch (e) { console.log("Sem palpites antigos para limpar."); }

  GAMES.forEach(game => {
    const homeVal = document.getElementById(`input_${game.id}_home`).value.trim();
    const awayVal = document.getElementById(`input_${game.id}_away`).value.trim();

    if (homeVal !== '' && awayVal !== '') {
      novosPalpites.push({
        colaborador: player.name,
        jogo_id: game.id,
        placar_casa: parseInt(homeVal, 10),
        placar_visitante: parseInt(awayVal, 10)
      });
    }
  });

  if (novosPalpites.length > 0) {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novosPalpites)
      });
      alert(`Palpites de ${player.name} atualizados na planilha! 🇧🇷`);
    } catch (error) {
      alert("Erro ao salvar na planilha. Tente novamente.");
    }
  }

  btnSave.textContent = 'Salvar 🏆';
  btnSave.disabled = false;
  closeGuessesModal();
}

async function openDashboardModal() {
  const container = document.getElementById('dashboardTablesContainer');
  container.innerHTML = `<p style="text-align:center; color:var(--amarelo);">Buscando banco de dados da planilha... ⚽</p>`;
  document.getElementById('dashboardModalOverlay').classList.add('open');

  await fetchPalpitesPlanilha();
  container.innerHTML = '';

  GAMES.forEach(game => {
    const gameBlock = document.createElement('div');
    gameBlock.className = 'dashboard-game-block';
    
    let rowsHtml = '';
    
    const jogoPalpites = cachedGuesses.filter(g => g.jogo_id === game.id);

    jogoPalpites.forEach(match => {
      const homeScore = match.placar_casa !== undefined && match.placar_casa !== null ? match.placar_casa : 0;
      const awayScore = match.placar_visitante !== undefined && match.placar_visitante !== null ? match.placar_visitante : 0;

      rowsHtml += `
        <tr>
          <td style="font-weight: 600; width: 40%;">${match.colaborador}</td>
          <td class="dashboard-score-cell" style="text-align: center; width: 60%;">
            ${homeScore} x ${awayScore}
          </td>
        </tr>
      `;
    });

    if (rowsHtml === '') {
      rowsHtml = `<tr><td colspan="2" style="color: rgba(255,255,255,0.3); text-align: center; padding: 12px;">Nenhum palpite registrado para este jogo.</td></tr>`;
    }

    gameBlock.innerHTML = `
      <div class="dashboard-game-title">⚽ ${game.home} x ${game.away}</div>
      <table class="dashboard-table">
        <thead>
          <tr>
            <th style="text-align: left;">Colaborador</th>
            <th style="text-align: center;">Palpite</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
    container.appendChild(gameBlock);
  });
}

function closeDashboardModal() {
  document.getElementById('dashboardModalOverlay').classList.remove('open');
}

function burstCenter() {
  const wrap = document.getElementById('confettiWrap');
  const colors = ['#ffdf00','#009c3b','#fff','#002776','#ff4444'];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < 25; i++) {
    const s = document.createElement('span');
    const angle = Math.random() * Math.PI * 2;
    const velocity = 6 + Math.random() * 12;
    
    s.style.cssText = `
      left: ${cx}px; top: ${cy}px; background: ${colors[i % colors.length]}; width: ${8 + Math.random() * 8}px; height: ${10 + Math.random() * 10}px; position: fixed; transform: translate(-50%, -50%);
      animation: packOpen 1s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
      --x: ${Math.cos(angle) * velocity * 15}px; --y: ${Math.sin(angle) * velocity * 15}px;
    `;
    wrap.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
}

function launchConfetti() {
  const wrap = document.getElementById('confettiWrap');
  const colors = ['#ffdf00','#009c3b','#ffffff','#002776','#ff4444','#6B35A8','#ff8c00'];
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('span');
    const size = 8 + Math.random() * 10;
    s.style.cssText = `left:${Math.random()*100}%; top:-20px; background:${colors[Math.floor(Math.random()*colors.length)]}; width:${size}px; height:${size*1.4}px; animation-duration:${2+Math.random()*3}s; animation-delay:${Math.random()*2}s;`;
    wrap.appendChild(s);
    setTimeout(() => s.remove(), 6000);
  }
}

function spawnAmbient() {
  const wrap = document.getElementById('confettiWrap');
  const colors = ['#ffdf00','#009c3b','#ffffff','#002776'];
  const s = document.createElement('span');
  const size = 6 + Math.random() * 8;
  s.style.cssText = `left:${Math.random()*100}%; top:-20px; background:${colors[Math.floor(Math.random()*colors.length)]}; width:${size}px; height:${size*1.4}px; animation-duration:${5+Math.random()*5}s; animation-delay:0s; opacity:0.4;`;
  wrap.appendChild(s);
  setTimeout(() => s.remove(), 12000);
}
setInterval(spawnAmbient, 900);

buildGrid();
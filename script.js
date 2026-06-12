const COLORS = ['#44bcd8','#009c3b','#e04040','#ff8c00','#8b5cf6','#0ea5e9','#ec4899'];
const FLAG_COLORS = ['#009c3b','#002776','#6B35A8','#e04040','#ff8c00'];

let players = [
  { name: 'GUSTAVO', role: 'GESTÃO', photo: './assets/gustavo.png', number: 1, flag: '🇧🇷', stars: 5 },
  { name: 'PALAVRO', role: 'MARKETING PRODUTO', photo: './assets/palavro.png', number: 2, flag: '🇧🇷', stars: 5 },
  { name: 'CRISTINA', role: 'MARKETING', photo: './assets/cris.png', number: 3, flag: '🇧🇷', stars: 5 },
  { name: 'GLAUCIA', role: 'MARKETING', photo: './assets/glaucia.png', number: 4, flag: '🇧🇷', stars: 5 }, 
  { name: 'NICOLAS', role: 'MARKETING PRODUTO', photo: './assets/nicolas.png', number: 5, flag: '🇧🇷', stars: 5 },
  { name: 'GUSMÃO', role: 'NEGÓCIOS DIGITAIS', photo: './assets/gusmão.png', number: 6, flag: '🇧🇷', stars: 5 },
  { name: 'CAMILA', role: 'NEGÓCIOS DIGITAIS', photo: './assets/cami.png', number: 7, flag: '🇧🇷', stars: 5 },
  { name: 'LILIAN', role: 'NEGÓCIOS DIGITAIS', photo: './assets/lili.png', number: 8, flag: '🇧🇷', stars: 5 },
  { name: 'DAIANE', role: 'NEGÓCIOS DIGITAIS', photo: './assets/daiane.png', number: 9, flag: '🇧🇷', stars: 5 },
  { name: 'PRISCILA', role: 'NEGÓCIOS DIGITAIS', photo: './assets/priscila.png', number: 10, flag: '🇧🇷', stars: 5 },
  { name: 'KEILA', role: 'MARKETING', photo: './assets/keila.png', number: 11, flag: '🇧🇷', stars: 5 },
  { name: 'FABIANA', role: 'MARKETING', photo: './assets/fabiana.png', number: 12, flag: '🇧🇷', stars: 5 },
  { name: 'JULIA', role: 'MARKETING', photo: './assets/julia.png', number: 13, flag: '🇧🇷', stars: 5 },
  { name: 'LETICIA', role: 'MARKETING', photo: './assets/leticia.png', number: 14, flag: '🇧🇷', stars: 5 },
  { name: 'JOÃO', role: 'MARKETING', photo: './assets/jp.png', number: 15, flag: '🇧🇷', stars: 5 },
  { name: 'ALICE', role: 'MARKETING', photo: './assets/alice.png', number: 16, flag: '🇧🇷', stars: 5 },
  { name: 'LUANE', role: 'MARKETING PRODUTO', photo: './assets/luane.png', number: 17, flag: '🇧🇷', stars: 5 },
  { name: 'ALISSON', role: 'MARKETING PRODUTO', photo: './assets/alisson.png', number: 18, flag: '🇧🇷', stars: 5 }
];

let revealedCount = 0;
let cardEls = [];

function buildGrid() {
  const grid = document.getElementById('stickerGrid');
  grid.innerHTML = '';
  cardEls = [];

  players.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'sticker-card';
    el.dataset.index = i;
    el.style.background = COLORS[i % COLORS.length];

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
        <span class="panini-badge">Copa 26</span>
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
  updateCounter();
  
  openRevealModal(card.innerHTML, card.style.background);
  
  if (revealedCount >= players.length) {
    document.getElementById('btnReveal').textContent = '🏆 Álbum Completo!';
    document.getElementById('btnReveal').classList.add('done');
    launchConfetti();
  }
}

function updateCounter() {
  document.getElementById('counterText').textContent = `${revealedCount} / ${players.length} reveladas`;
  const pct = players.length ? (revealedCount / players.length * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
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
  const overlay = document.getElementById('revealModalOverlay');
  overlay.classList.remove('open');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
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
      left: ${cx}px;
      top: ${cy}px;
      background: ${colors[i % colors.length]};
      width: ${8 + Math.random() * 8}px;
      height: ${10 + Math.random() * 10}px;
      position: fixed;
      transform: translate(-50%, -50%);
      animation: packOpen 1s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
      --x: ${Math.cos(angle) * velocity * 15}px;
      --y: ${Math.sin(angle) * velocity * 15}px;
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
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:-20px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${size}px; height:${size*1.4}px;
      animation-duration:${2+Math.random()*3}s;
      animation-delay:${Math.random()*2}s;
    `;
    wrap.appendChild(s);
    setTimeout(() => s.remove(), 6000);
  }
}

function spawnAmbient() {
  const wrap = document.getElementById('confettiWrap');
  const colors = ['#ffdf00','#009c3b','#ffffff','#002776'];
  const s = document.createElement('span');
  const size = 6 + Math.random() * 8;
  s.style.cssText = `
    left:${Math.random()*100}%;
    top:-20px;
    background:${colors[Math.floor(Math.random()*colors.length)]};
    width:${size}px; height:${size*1.4}px;
    animation-duration:${5+Math.random()*5}s;
    animation-delay:0s;
    opacity:0.4;
  `;
  wrap.appendChild(s);
  setTimeout(() => s.remove(), 12000);
}
setInterval(spawnAmbient, 900);

buildGrid();
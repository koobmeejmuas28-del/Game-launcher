const select = document.getElementById('gameSelect');
const loadButton = document.getElementById('loadButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const container = document.getElementById('game-container');

// Game list (easy to add more here)
const games = {
  // SWF
  hobo: { label: 'Hobo (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/supaub/interstellar-3/play/flash/swf/hobo.swf' },
  duck: { label: 'Duck Life (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/markrosenbaum/some-repo/dl/duck-life.swf' },
  fancypants: { label: 'Fancy Pants Adventure (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/supaub/interstellar-3/play/flash/swf/fancypantsadventure.swf' },
  slope: { label: 'Slope (Y8)', type: 'iframe', url: 'https://y8.com/embed/slope' },
  motox3m3: { label: 'Moto X3M 3 (Unity WebGL)', type: 'unity', loader: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.js', data: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.json' },
  nba: { label: 'NBA Hangtime (N64)', type: 'emu', core: 'n64', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/NBA%20Hangtime%20(USA).zip' },
  trollroblox: { label: 'Roblox (Now.gg Emulator)', type: 'troll', url: 'https://media1.tenor.com/m/d95fQmHhoagAAAAC/gng-opp.gif' }
};

// Populate dropdown
for (const key in games) {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = games[key].label;
  select.appendChild(option);
}

// Load game button
loadButton.onclick = () => {
  const gameKey = select.value;
  if (!gameKey) return alert('Please select a game!');
  localStorage.setItem('lastGame', gameKey);
  location.reload();
};

// Fullscreen toggle
fullscreenButton.onclick = () => {
  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// Load last selected game after reload
window.onload = () => {
  const lastGame = localStorage.getItem('lastGame');
  if (!lastGame) return;
  localStorage.removeItem('lastGame');
  const game = games[lastGame];

  if(game.type === 'troll') {
    container.innerHTML = `
      <div style="color:white;font-size:24px;font-family:Arial;margin-bottom:10px;">Loading..</div>
      <img src="${game.url}" style="max-width:50%; max-height:50%; width:auto; height:auto;">
      <div id="glitch-overlay"></div>
      <div id="copyright">Version 0 Studio -- KM the best programmer on Earth</div>
    `;
    return;
  }

  container.innerHTML = '<div id="glitch-overlay"></div><div id="copyright">Version 0 Studio -- KM the best programmer on Earth</div>';

  if (game.type === 'swf') {
    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();
    container.appendChild(player);
    player.load(game.url);
  } else if (game.type === 'iframe') {
    const iframe = document.createElement('iframe');
    iframe.src = game.url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.objectFit = 'contain';
    container.appendChild(iframe);
  } else if (game.type === 'unity') {
    const script = document.createElement('script');
    script.src = game.loader;
    document.body.appendChild(script);
  } else if (game.type === 'emu') {
    window.EJS_player = '#game-container';
    window.EJS_core = game.core;
    window.EJS_startOnLoaded = true;
    window.EJS_gameUrl = game.url;
    window.EJS_pathtodata = "https://cdn.jsdelivr.net/gh/a456pur/seraph/storage/emulatorjs/data";
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph/storage/emulatorjs/data/loader.js";
    document.body.appendChild(script);
  }
};

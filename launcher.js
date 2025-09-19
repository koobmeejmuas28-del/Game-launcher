const select = document.getElementById('gameSelect');
const loadButton = document.getElementById('loadButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const container = document.getElementById('game-container');

// Full game list
const games = {
  // SWF
  hobo: { label: 'Hobo (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/supaub/interstellar-3/play/flash/swf/hobo.swf' },
  duck: { label: 'Duck Life (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/markrosenbaum/some-repo/dl/duck-life.swf' },
  fancypants: { label: 'Fancy Pants Adventure (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/supaub/interstellar-3/play/flash/swf/fancypantsadventure.swf' },
  douche: { label: 'Douchebag Life (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/Douchebag_Life.swf' },
  agewar: { label: 'Age of War (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/vjspranav/FlashGames/games/Age_Of%20_War_2.swf' },
  basketball: { label: 'Basketball Legends (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/gameproxy/swf_storage_1/Basketball%20Legends.swf' },
  dig: { label: 'Dig to China (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/dig%20to%20china.swf' },

  // Y8
  slope: { label: 'Slope (Y8)', type: 'iframe', url: 'https://y8.com/embed/slope' },

  // Unity WebGL
  motox3m3: { label: 'Moto X3M 3 (Unity WebGL)', type: 'unity', loader: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.js', data: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.json' },
  lol1v1: { label: '1v1 LOL (Unity WebGL)', type: 'unity', loader: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.js', data: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.json' },

  // Emulators
  nba: { label: 'NBA Hangtime (N64)', type: 'emu', core: 'n64', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/NBA%20Hangtime%20(USA).zip' },
  madden: { label: 'Madden 2001 (N64)', type: 'emu', core: 'n64', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/Madden%20NFL%202001%20(USA).zip' },
  gta2: { label: 'GTA 2 (GBA)', type: 'emu', core: 'gba', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/Grand%20Theft%20Auto%202%20(USA).zip' },
  ippo: { label: 'Hajime no Ippo (GBA)', type: 'emu', core: 'gba', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/Hajime%20no%20Ippo%20-%20The%20Fighting%20(English%20v1.0).zip' },
  cod: { label: 'COD Black Ops (NDS)', type: 'emu', core: 'nds', url: 'https://cdn.jsdelivr.net/gh/bubbls/ugss/Call%20of%20Duty%20-%20Black%20Ops%20(USA).nds' },
  fifa: { label: 'FIFA Street (NDS)', type: 'emu', core: 'nds', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/FIFA%20Street%202%20(Europe)%20(En%2CFr%2CDe).zip' },
  fifa99: { label: 'FIFA 99 (N64)', type: 'emu', core: 'n64', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/FIFA%2099%20(USA).zip' },
  mortal: { label: 'Mortal Kombat (SNES)', type: 'emu', core: 'snes', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption/Mortal%20Kombat%20(USA).zip' },

  // Troll Roblox
  trollroblox: { label: 'Roblox (Now.gg Emulator)', type: 'troll', url: 'https://media1.tenor.com/m/d95fQmHhoagAAAAC/gng-opp.gif' }
};

// Populate dropdown once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  for (const key in games) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = games[key].label;
    select.appendChild(option);
  }
});

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

  if (game.type === 'troll') {
    container.innerHTML = `
      <div style="color:white;font-size:24px;font-family:Arial;margin-bottom:10px;">Loading..</div>
      <img src="${game.url}" style="max-width:50%; max-height:50%; width:auto; height:auto;">
      <div id="glitch-overlay"></div>
      <div id="copyright">
        Version 0 Studio -- KM the best programmer on Earth
      </div>
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

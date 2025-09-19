// Define all the games
const games = {
  hobo: { type: 'swf', url: 'https://cdn.jsdelivr.net/gh/supaub/interstellar-3@8a13c735e7df6d86602b354e45c090405f21f45a/play/flash/swf/hobo.swf' },
  duck: { type: 'swf', url: 'https://cdn.jsdelivr.net/gh/markrosenbaum/some-repo@aeb3030a3fb90987658ff4ee1063c64f6206152f/dl/duck-life.swf' },
  fancypants: { type: 'swf', url: 'https://cdn.jsdelivr.net/gh/supaub/interstellar-3@8a13c735e7df6d86602b354e45c090405f21f45a/play/flash/swf/fancypantsadventure.swf' },
  // add the rest...
};

// Populate the select dropdown dynamically
const select = document.getElementById('gameSelect');
for (const key in games) {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  select.appendChild(option);
}

const loadButton = document.getElementById('loadButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const container = document.getElementById('game-container');

// Load game on button click
loadButton.addEventListener('click', () => {
  const gameKey = select.value;
  if (!gameKey) return alert('Please select a game!');
  localStorage.setItem('lastGame', gameKey);
  loadGame(gameKey);
});

// Fullscreen toggle
fullscreenButton.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Load the last selected game on page load
window.addEventListener('load', () => {
  const lastGame = localStorage.getItem('lastGame');
  if (lastGame) {
    select.value = lastGame;
    loadGame(lastGame);
    localStorage.removeItem('lastGame');
  }
});

// Function to load a game
function loadGame(gameKey) {
  const game = games[gameKey];
  container.innerHTML = '<div id="glitch-overlay"></div><div id="copyright">Version 0 Studio -- KM the best programmer on Earth</div>';

  if (game.type === 'swf') {
    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();
    container.appendChild(player);
    player.load(game.url);
  } else if (game.type === 'iframe') {
    const iframe = document.createElement('iframe');
    iframe.src = game.url;
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
    window.EJS_pathtodata = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data";
    const script = document.createElement('script');
    script.src = window.EJS_pathtodata + "/loader.js";
    document.body.appendChild(script);
  } else if (game.type === 'troll') {
    const img = document.createElement('img');
    img.src = game.url;
    container.appendChild(img);
  }
}

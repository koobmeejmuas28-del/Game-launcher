const select = document.getElementById('gameSelect');
const loadButton = document.getElementById('loadButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const container = document.getElementById('game-container');

// Full game list
const games = {
  // SWF
  hobo: { label: 'Hobo (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/supaub/interstellar-3@8a13c735e7df6d86602b354e45c090405f21f45a/play/flash/swf/hobo.swf' },
  duck: { label: 'Duck Life (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/markrosenbaum/some-repo@aeb3030a3fb90987658ff4ee1063c64f6206152f/dl/duck-life.swf' },
  fancypants: { label: 'Fancy Pants Adventure (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/supaub/interstellar-3@8a13c735e7df6d86602b354e45c090405f21f45a/play/flash/swf/fancypantsadventure.swf' },
  douche: { label: 'Douchebag Life (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@fa43d798a8cafd1a87fdf9f78691c6f81823ee8b/Douchebag_Life.swf' },
  agewar: { label: 'Age of War (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/vjspranav/FlashGames@c4afbfe9dd12f23ef93e19d7f3d298105448f349/games/Age_Of%20_War_2.swf' },
  basketball: { label: 'Basketball Legends (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/gameproxy/swf_storage_1@907a0283a4167ab7ce5a3f46da958d9deb1abdae/Basketball%20Legends.swf' },
  dig: { label: 'Dig to China (SWF)', type: 'swf', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@02d331c247a0931cf1ee18a8b59e1434841c4b67/dig%20to%20china.swf' },

  // Y8
  slope: { label: 'Slope (Y8)', type: 'iframe', url: 'https://y8.com/embed/slope' },

  // Unity WebGL
  motox3m3: { label: 'Moto X3M 3 (Unity WebGL)', type: 'unity', loader: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.js', data: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.json' },
  lol1v1: { label: '1v1 LOL (Unity WebGL)', type: 'unity', loader: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.js', data: 'https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.json' },

  // Emulators
  nba: { label: 'NBA Hangtime (N64)', type: 'emu', core: 'n64', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@ab523c866a5d0dda4ea9801dd4d96457e880cbcd/NBA%20Hangtime%20(USA).zip' },
  madden: { label: 'Madden 2001 (N64)', type: 'emu', core: 'n64', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@30884886205950003acc451da53cbb940cbda522/Madden%20NFL%202001%20(USA).zip' },
  gta2: { label: 'GTA 2 (GBA)', type: 'emu', core: 'gba', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@7b7d4dd3051399442aad5ffdc59965324fe241cf/Grand%20Theft%20Auto%202%20(USA).zip' },
  ippo: { label: 'Hajime no Ippo (GBA)', type: 'emu', core: 'gba', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@96959277ef1a7849437f1906727a377c2202c8a3/Hajime%20no%20Ippo%20-%20The%20Fighting%20(English%20v1.0).zip' },
  cod: { label: 'COD Black Ops (NDS)', type: 'emu', core: 'nds', url: 'https://cdn.jsdelivr.net/gh/bubbls/ugss@6d4be6f9cce75077f2b28981623eaa057297dac/Call%20of%20Duty%20-%20Black%20Ops%20(USA)/Call%20of%20Duty%20-%20Black%20Ops%20(USA).nds' },
  fifa: { label: 'FIFA Street (NDS)', type: 'emu', core: 'nds', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@b86a41be9fbd3700fe843f72e828a070eb536e6e/FIFA%20Street%202%20(Europe)%20(En%2CFr%2CDe).zip' },
  fifa99: { label: 'FIFA 99 (N64)', type: 'emu', core: 'n64', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@8df9a7774878060fa6c566ac063ca482bed1f06c/FIFA%2099%20(USA)%20(En%2CFr%2CDe%2CEs%2CIt%2CNl%2CPt%2CSv).zip' },
  mortal: { label: 'Mortal Kombat (SNES)', type: 'emu', core: 'snes', url: 'https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@f3052c54ad52a52a8274d60e19d1860ebcbbe4f9/Mortal%20Kombat%20(USA).zip' },

  // Troll Roblox
  trollroblox: { label: 'Roblox (Now.gg Emulator)', type: 'troll', url: 'https://media1.tenor.com/m/d95fQmHhoagAAAAC/gng-opp.gif' }
};

// Populate dropdown
for (const key in games) {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = games[key].label;
  select.appendChild(option);
}

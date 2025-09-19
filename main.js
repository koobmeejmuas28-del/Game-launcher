// ================================
// I Am Pro Game Launcher - main.js
// ================================

// Games list
const games = {
  "Mortal Kombat (SNES)": {
    type: "emulator",
    core: "snes",
    url: "https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@f3052c54ad52a52a8274d60e19d1860ebcbbe4f9/Mortal%20Kombat%20(USA).zip"
  },
  "Roblox (Now.gg Emulator)": {
    type: "troll"
  }
};

// Setup dropdown menu
const gameSelect = document.getElementById("gameSelect");
Object.keys(games).forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  gameSelect.appendChild(option);
});

// Load game button
document.getElementById("loadButton").addEventListener("click", () => {
  const choice = gameSelect.value;
  if (!choice) return alert("Please select a game!");

  const game = games[choice];
  const container = document.getElementById("game-container");

  // Clear container before loading new game
  container.innerHTML = `
    <div id="copyright">Version 0 Studio -- KM the best programmer on Earth</div>
  `;

  if (game.type === "emulator") {
    // Load emulator
    window.EJS_player = "#game-container";
    window.EJS_core = game.core;
    window.EJS_gameUrl = game.url;
    window.EJS_pathtodata = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data";
    window.EJS_color = "#000000";
    window.EJS_startOnLoaded = true;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data/loader.js";
    document.body.appendChild(script);

  } else if (game.type === "troll") {
    // Show goofy loading gif
    const msg = document.createElement("div");
    msg.textContent = "Loading..";
    msg.style.color = "white";
    msg.style.fontSize = "24px";
    msg.style.marginBottom = "10px";
    msg.style.fontFamily = "Arial";

    const gif = document.createElement("img");
    gif.src = "https://media1.tenor.com/m/d95fQmHhoagAAAAC/gng-opp.gif";
    gif.alt = "Goofy Roblox Troll";
    gif.style.maxWidth = "50%";
    gif.style.maxHeight = "50%";

    container.prepend(msg);
    container.appendChild(gif);
  }
});

// Fullscreen button
document.getElementById("fullscreenButton").addEventListener("click", () => {
  const container = document.getElementById("game-container");
  if (container.requestFullscreen) container.requestFullscreen();
  else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
  else if (container.msRequestFullscreen) container.msRequestFullscreen();
});

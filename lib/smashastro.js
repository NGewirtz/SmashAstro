import Game from './game.js';
import View from './view.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game');
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", () => {
    const ctx = canvas.getContext('2d');
    const game = new Game();
    canvas.height = 300;
    canvas.width = 300;
    const view = new View(game, ctx);
    view.start();
    view.toggleAudio();
  });
});

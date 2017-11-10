import Game from './game.js'
import View from './view.js'

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const game = new Game()
  const view = new View(game, ctx)
  view.start()
})
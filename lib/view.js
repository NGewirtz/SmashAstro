class View {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }
  
  bindKeyHandlers() {
    const ship = this.game.ship
    key("left", () => { ship.move("left")   });
    key("right", () => { ship.move("right") });
    key("space", () => { ship.shoot() });
  }
  
  start() {
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default View;
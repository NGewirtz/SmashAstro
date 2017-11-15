class View {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.stars = []
  }

  bindKeyHandlers() {
    const ship = this.game.ship;
    key("left", () => { ship.move("left") });
    key("right", () => { ship.move("right") });
    key("space", () => { ship.shoot() } );
  }

  start() {
    this.bindKeyHandlers();
    this.setStars();
    const audio = new Audio('./sounds/throughspace.ogg');
    audio.play();
    this.addBackground(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }

  addBackground(ctx) {
    ctx.fillStyle = "white";
    this.stars.forEach(([x, y]) => {
      ctx.fillRect(x, y, 1, 1);
    });
    ctx.beginPath();
    ctx.moveTo(0,250);
    ctx.lineTo(50, 220);
    ctx.lineTo(220, 260);
    ctx.lineTo(260, 240);
    ctx.lineTo(300, 240);

    // ctx.lineTo(250, 150);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  setStars() {
    for(let i = 0; i < 200; i++) {
      this.stars.push([Math.floor(Math.random() * 300),
        Math.floor(Math.random() * 220)]);
    }
  }

  animate() {
    this.game.draw(this.ctx);
    this.addBackground(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default View;

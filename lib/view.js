class View {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.stars = this.setStars();
    this.music = this.setMusic();
    this.volume = 0;
    this.paused = false;
    this.viewInstructions = true;
  }

  setMusic() {
    const audio = new Audio('./sounds/throughspace.ogg');
    audio.loop = true;
    audio.volume = 0;
    audio.play();
    return audio;
  }

  setStars() {
    const stars = [];
    for(let i = 0; i < 200; i++) {
      stars.push([Math.floor(Math.random() * 300),
      Math.floor(Math.random() * 220)]);
    }
    return stars;
  }

  bindKeyHandlers() {
    const ship = this.game.ship;
    key("left", () => { ship.move("left"); } );
    key("right", () => { ship.move("right"); });
    key("space", () => { ship.shoot(); } );
    key("m", () => { this.toggleAudio(); } );
    key("p", () => { this.togglePaused(); })
  }

  drawBackgroundMountains(ctx) {
    ctx.beginPath();
    ctx.moveTo(0,250);
    ctx.lineTo(50, 220);
    ctx.lineTo(220, 260);
    ctx.lineTo(260, 240);
    ctx.lineTo(300, 240);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  drawBackground(ctx) {
    ctx.fillStyle = "white";
    this.stars.forEach(([x, y]) => {
      ctx.fillRect(x, y, 1, 1);
    });
    this.drawBackgroundMountains(ctx);
  }

  start() {
    this.bindKeyHandlers();
    game.style.display = "inline";
    instructions.style.display = "none"
    requestAnimationFrame(this.animate.bind(this));
  }

  toggleAudio() {
    this.volume = this.volume === 0 ? 1 : 0;
    this.music.volume = this.volume;
    this.game.toggleSounds();
  }

  togglePaused() {
    this.paused = !this.paused;
    if (this.paused) {
      this.displayPaused();
    }else{
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  displayPaused() {
    this.ctx.font = "32px Comic Sans MS";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("PAUSED",85,120);
  }

  setBackgroundColor() {
    const level = this.game.level;
    const background = document.getElementById("game");
    switch(level) {
      case 1:
        background.className = "black";
        break;
      case 2:
        background.className = "blue";
        break;
      case 3:
        background.className = "grey";
        break;
      case 4:
        background.className = "black";
    }
  }

  animate() {
    if (!this.paused) {
      this.game.draw(this.ctx);
      this.drawBackground(this.ctx);
      this.setBackgroundColor();
      requestAnimationFrame(this.animate.bind(this));
    }
  }

}

export default View;

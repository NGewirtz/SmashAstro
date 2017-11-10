import Bullet from './bullet'

class Ship {
  constructor(game) {
    this.game = game;
    this.posX = 143;
    this.posY = 285;
    this.height = 15;
    this.width = 8;
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, 10, 15);
  }
  
  shoot() {
    const bullet = new Bullet(this.posX);
    this.game.addBullet(bullet);
  }
  
  move(dir) {
    if (dir === "left") {
      this.posX = this.posX <= 8 ? 0 : this.posX - 8;
    }else {
      this.posX = this.posX >= 277 ? 285 : this.posX + 8;
    }
  }
}


export default Ship
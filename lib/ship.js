import Bullet from './bullet'

class Ship {
  constructor(game) {
    this.game = game;
    this.posX = 130;
    this.posY = 135;
    this.height = 15;
    this.width = 8;
    this.color = "blue"
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
      this.posX -= 5;
    }else {
      this.posX += 5;
    }
  }
}


export default Ship
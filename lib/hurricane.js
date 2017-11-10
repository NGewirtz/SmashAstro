import Astro from './astro.js';

class Hurricane extends Astro {
  constructor() {
    super(null, null, 1, null, {
      size: 'hurricane',
      width: 16,
      height: 16
    });
    this.color = "red";
  }
}

export default Hurricane;
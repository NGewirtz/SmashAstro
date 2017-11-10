import Astro from './astro.js';

class Hurricane extends Astro {
  constructor() {
    super(null, null, .75, null, {
      size: 'hurricane',
      width: 16,
      height: 12
    });
    this.color = "red";
  }
}

export default Hurricane;
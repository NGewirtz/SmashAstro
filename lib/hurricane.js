import Astro from './astro.js';

class Hurricane extends Astro {
  constructor(level) {
    super(level, null, null, .75 * level, null, {
      size: 'hurricane',
      width: 16,
      height: 16
    });
  }
}

export default Hurricane;
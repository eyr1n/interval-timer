import { Howl } from 'howler';

export class PlaySound {
  constructor() {
    const countdownSound = new Howl({
      src: ['./assets/sound/countdown.wav'],
    });

    const signalSound = new Howl({
      src: ['./assets/sound/startstop.wav'],
    });

    addEventListener('playCountdown', () => {
      countdownSound.play();
    });

    addEventListener('playStartStop', () => {
      signalSound.play();
    });
  }
}

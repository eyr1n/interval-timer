import { Howl } from 'howler';

export class PlaySound {
  constructor() {
    const countdownSound = new Howl({
      src: ['./assets/countdown.wav'],
    });

    const signalSound = new Howl({
      src: ['./assets/startstop.wav'],
    });

    addEventListener('playCountdown', () => {
      countdownSound.play();
    });

    addEventListener('playStartStop', () => {
      signalSound.play();
    });
  }
}

import { Component, Host, h, Prop } from '@stencil/core';
import state from '../../helpers/store';
import { ConvertTime } from '../../helpers/ConvertTime';

@Component({
  tag: 'app-timer',
  styleUrl: 'app-timer.css',
  shadow: true,
})
export class AppTimer {
  @Prop() isPaused;

  #cT: ConvertTime;
  #timerId: number;

  #states = {
    work: 'Work',
    rest: 'Rest',
    done: 'Finished!',
  };

  constructor() {
    this.#cT = new ConvertTime();
  }

  timerStart() {
    let startTime: number;
    let progress: number;
    let preProgress = 0;

    state.currentState = state.work ? 'work' : 'rest';
    state.remainingSets = state.sets;

    const timer = timestamp => {
      if (!startTime) startTime = timestamp;
      const endTime = (state.currentState == 'work' ? state.work : state.rest) * 1000;

      if (this.isPaused) {
        startTime = timestamp;
        preProgress = progress;
      } else {
        progress = preProgress + timestamp - startTime;
      }

      if (progress < endTime) {
        state.remainingTime = Math.ceil((endTime - progress) / 1000);
      } else {
        startTime = timestamp;
        preProgress = 0;

        if (!state.work || !state.rest || state.currentState == 'rest') {
          state.remainingSets--;
        }

        if (!state.work || !state.rest) {
          state.currentState = state.work ? 'work' : 'rest';
        } else {
          state.currentState = state.currentState == 'work' ? 'rest' : 'work';
        }

        if (state.remainingSets > 0) {
          state.remainingTime = state.currentState == 'work' ? state.work : state.rest;
        } else {
          state.currentState = 'done';
          state.remainingTime = 0;
        }
      }

      if (state.currentState == 'done') {
        cancelAnimationFrame(this.#timerId);
      } else {
        this.#timerId = requestAnimationFrame(timer);
      }
    };

    this.#timerId = requestAnimationFrame(timer);
  }

  getSetsProgress() {
    if (state.currentState == 'done') {
      return `${state.sets} / ${state.sets}`;
    } else {
      return `${state.sets - state.remainingSets + 1} / ${state.sets}`;
    }
  }

  componentDidLoad() {
    this.timerStart();
  }

  disconnectedCallback() {
    state.currentState = 'idle';
    state.remainingTime = 0;
    cancelAnimationFrame(this.#timerId);
  }

  render() {
    return (
      <Host>
        <div class={`container ${state.currentState}`}>
          <div class="sets">{this.getSetsProgress()}</div>
          <div class="state">{this.#states[state.currentState]}</div>
          <div class="time">{this.#cT.secondsToTime(state.remainingTime)}</div>
        </div>
      </Host>
    );
  }
}

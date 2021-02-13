import { Component, h, State } from '@stencil/core';
import state from '../../helpers/store';
import { PlaySound } from '../../helpers/PlaySound';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @State() isRunning: boolean;
  @State() isPaused = false;

  constructor() {
    new PlaySound();
  }

  timerStart() {
    switch (state.currentState) {
      case 'idle':
        this.isRunning = true;
        break;
      case 'work':
      case 'rest':
        this.isPaused = this.isPaused ? false : true;
        break;
      case 'done':
        this.isRunning = false;
        break;
    }
  }

  timerReset() {
    this.isRunning = false;
    this.isPaused = false;
  }

  isStartButtonDisabled() {
    if (!state.work && !state.rest) {
      return true;
    } else {
      return false;
    }
  }

  getButtonText() {
    switch (state.currentState) {
      case 'idle':
        return 'Start';
      case 'work':
      case 'rest':
        if (this.isPaused) {
          return 'Resume';
        } else {
          return 'Pause';
        }
      case 'done':
        return 'Reset';
    }
  }

  render() {
    return (
      <ion-app>
        <ion-content class="ion-padding">
          <div class="container">
            <div class="timer">
              <app-graph></app-graph>
              <app-settings style={this.isRunning ? { display: 'none' } : null}></app-settings>
              {this.isRunning ? <app-timer isPaused={this.isPaused}></app-timer> : null}
            </div>

            <ion-button expand="block" disabled={this.isStartButtonDisabled()} onClick={() => this.timerStart()}>
              {this.getButtonText()}
            </ion-button>

            <ion-button color="danger" expand="block" style={this.isPaused ? null : { visibility: 'hidden' }} onClick={() => this.timerReset()}>
              Reset
            </ion-button>
          </div>
        </ion-content>
      </ion-app>
    );
  }
}

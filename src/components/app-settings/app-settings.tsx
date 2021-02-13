import { Component, Host, h } from '@stencil/core';
import state from '../../helpers/store';
import { ConvertTime } from '../../helpers/ConvertTime';

@Component({
  tag: 'app-settings',
  styleUrl: 'app-settings.css',
  shadow: true,
})
export class AppSettings {
  private cT: ConvertTime;
  private work_s: string;
  private rest_s: string;
  private sets_s: string;

  constructor() {
    this.cT = new ConvertTime();
    this.work_s = this.cT.secondsToTime(state.work);
    this.rest_s = this.cT.secondsToTime(state.rest);
    this.sets_s = this.cT.setsToTime(state.sets);
  }

  updateSettings(e) {
    switch (e.target.id) {
      case 'work':
      case 'rest':
        this[`${e.target.id}_s`] = e.target.value;
        state[e.target.id] = this.cT.timeToSeconds(e.target.value);
        break;

      case 'sets':
        this[`${e.target.id}_s`] = e.target.value;
        state[e.target.id] = this.cT.timeToSets(e.target.value);
        break;
    }
  }

  render() {
    return (
      <Host>
        <ion-item>
          <ion-label>Work</ion-label>
          <ion-datetime id="work" display-format="HH:mm:ss" value={this.work_s} onIonChange={e => this.updateSettings(e)}></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label>Rest</ion-label>
          <ion-datetime id="rest" display-format="HH:mm:ss" value={this.rest_s} onIonChange={e => this.updateSettings(e)}></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label>Sets</ion-label>
          <ion-datetime id="sets" display-format="m" min="00:01" max="00:50" value={this.sets_s} onIonChange={e => this.updateSettings(e)}></ion-datetime>
        </ion-item>
      </Host>
    );
  }
}

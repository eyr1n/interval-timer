import { Component, Host, h, Element, Listen } from '@stencil/core';
import state from '../../helpers/store';

@Component({
  tag: 'app-graph',
  styleUrl: 'app-graph.css',
  shadow: true,
})
export class AppGraph {
  @Element() el: HTMLElement;

  @Listen('settingsUpdate', { target: 'window' })
  drawWorkArc() {
    const total = state.work + state.rest;

    this.el.shadowRoot.querySelector('#workArc').animate(
      {
        strokeDasharray: [`${2 * 95 * Math.PI * (state.work / total)} 1000`],
      },
      {
        duration: 200,
        fill: 'forwards',
        easing: 'ease',
      },
    );
  }

  @Listen('timerUpdate', { target: 'window' })
  drawProgressArc() {
    const total = state.work + state.rest;
    let progressRate;

    switch (state.currentState) {
      case 'work':
        progressRate = (state.work - state.remainingTime) / total;
        break;
      case 'rest':
        progressRate = state.work / total + (state.rest - state.remainingTime) / total;
        break;
      case 'idle':
      case 'done':
        progressRate = 0;
        break;
    }

    this.el.shadowRoot.querySelector('#progressArc').animate(
      {
        strokeDasharray: [`${2 * 95 * Math.PI * progressRate} 1000`],
      },
      {
        duration: 200,
        fill: 'forwards',
        easing: 'ease',
      },
    );
  }

  componentDidLoad() {
    this.drawWorkArc();
  }

  render() {
    return (
      <Host>
        <svg viewBox="0 0 200 200">
          <circle id="restArc" cx="100" cy="100" r="95" />
          <circle id="workArc" cx="100" cy="100" r="95" />
          <circle id="progressArc" cx="100" cy="100" r="95" />
        </svg>
      </Host>
    );
  }
}

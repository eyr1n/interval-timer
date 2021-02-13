import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  work: 0,
  rest: 0,
  sets: 1,

  currentState: 'idle',
  remainingSets: 0,
  remainingTime: 0,
});

for (const key of ['work', 'rest', 'sets']) {
  if (localStorage.getItem(key)) {
    state[key] = parseInt(localStorage.getItem(key));
  }

  onChange(key as any, value => {
    localStorage.setItem(key, `${value}`);
    dispatchEvent(new Event('settingsUpdate'));
  });
}

onChange('remainingTime', value => {
  dispatchEvent(new Event('timerUpdate'));

  if (value == 1 || value == 2) {
    dispatchEvent(new Event('playCountdown'));
  }
});

onChange('currentState', value => {
  if (value != 'idle') {
    dispatchEvent(new Event('playStartStop'));
  }
});

export default state;

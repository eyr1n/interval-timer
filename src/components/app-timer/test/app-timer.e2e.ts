import { newE2EPage } from '@stencil/core/testing';

describe('app-timer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-timer></app-timer>');

    const element = await page.find('app-timer');
    expect(element).toHaveClass('hydrated');
  });
});

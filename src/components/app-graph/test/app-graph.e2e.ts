import { newE2EPage } from '@stencil/core/testing';

describe('app-graph', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-graph></app-graph>');

    const element = await page.find('app-graph');
    expect(element).toHaveClass('hydrated');
  });
});

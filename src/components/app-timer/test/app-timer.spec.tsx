import { newSpecPage } from '@stencil/core/testing';
import { AppTimer } from '../app-timer';

describe('app-timer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppTimer],
      html: `<app-timer></app-timer>`,
    });
    expect(page.root).toEqualHtml(`
      <app-timer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-timer>
    `);
  });
});

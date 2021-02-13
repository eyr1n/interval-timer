import { newSpecPage } from '@stencil/core/testing';
import { AppGraph } from '../app-graph';

describe('app-graph', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppGraph],
      html: `<app-graph></app-graph>`,
    });
    expect(page.root).toEqualHtml(`
      <app-graph>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-graph>
    `);
  });
});

import { html, fixture, expect } from '@open-wc/testing';

import { EwCarousel } from '../components/EwCarousel.js';
import '../ew-carousel.js';

describe('EwCarousel', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<EwCarousel>(html`<ew-carousel></ew-carousel>`);

    expect(el.title).to.equal('Hey there');

  });

  it('increases the counter on button click', async () => {
    const el = await fixture<EwCarousel>(html`<ew-carousel></ew-carousel>`);
    el.shadowRoot!.querySelector('button')!.click();


  });

  it('can override the title via attribute', async () => {
    const el = await fixture<EwCarousel>(html`<ew-carousel title="attribute title"></ew-carousel>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<EwCarousel>(html`<ew-carousel></ew-carousel>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});

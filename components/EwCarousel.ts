import {
  html,
  css,
  LitElement,
  property,
  customElement,
  query,
} from 'lit-element';

@customElement('ew-carousel')
export class EwCarousel extends LitElement {
  @query('.chevron.left') left!: HTMLDivElement;

  @query('.qem-carousel') parent!: HTMLDivElement;

  @query('.chevron.right') right!: HTMLDivElement;

  @query('.wrapper') wrapper!: HTMLDivElement;
  static styles = css`
  ::slotted([slot="children"]){
    flex-shrink:0;
  }
    .qem-carousel {
      overflow: hidden;
      position: relative;
    }
    .qem-carousel .wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      scroll-snap-type: x mandatory;
      overflow: scroll;
      scroll-behavior: smooth;
      min-height: 20px;
    }
    .qem-carousel .wrapper > * {
      scroll-snap-align: start;

      flex-shrink: 0;

      margin: 10px;
    }
    .qem-carousel .wrapper .child {
      width: 400px;
      height: 100px;
      background: grey;
    }
    .qem-carousel .wrapper::-webkit-scrollbar {
      width: 0 !important;
    }

    .qem-carousel .chevron {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: white;
      border: 2px solid #c7c7cc;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      display: none;
      cursor: pointer;
    }
    .qem-carousel .chevron.left {
      left: 10px;
      content: '‹';
    }
    .qem-carousel .chevron.right {
      right: 10px;
      content: '›';
    }
  `;

  _handleScrollEvents() {
    this.wrapper.addEventListener('scroll', e => {
      if (this.wrapper.scrollLeft > 0) {
        this.right.style.display = 'flex';
      }
      if (
        this.wrapper.scrollLeft + this.wrapper.offsetWidth >=
        this.wrapper.scrollWidth
      ) {
        this.right.style.display = 'none';
      }
      if (
        this.wrapper.scrollLeft + this.wrapper.offsetWidth <=
        this.wrapper.scrollWidth
      ) {
        this.left.style.display = 'flex';
      }
      if (this.wrapper.scrollLeft <= 10) {
        this.left.style.display = 'none';
      }
    });
  }
  firstUpdated() {
    if (this.wrapper.scrollWidth > this.parent.scrollWidth) {
      this.right.style.display = 'flex';

      this._handleScrollEvents();
      this.handleClickEvents();
    }
  }

  handleClickEvents() {
    this.left?.addEventListener('click', e => {
      this.wrapper?.scrollBy({ left: -100 });
    });
    this.right?.addEventListener('click', e => {
      this.wrapper?.scrollBy({ left: 100 });
    });
  }

  render() {
    return html`
      <section class="qem-carousel">
        <div class="chevron left">‹</div>
        <div class="chevron right">›</div>
        <section class="wrapper">
          <slot name="children"></slot>
        </section>
      </section>
    `;
  }
}

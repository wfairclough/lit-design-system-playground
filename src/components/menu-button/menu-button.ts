import { LitElement, CSSResult, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';

import menuButtonStyles from './menu-button.css?inline';

export type MenuButtonEventDetail = {
  state: 'open' | 'close';
};

export type SVGRectProps = {
  x: string;
  y: string;
  width: string;
  height: string;
  rx: string;
  ry: string;
  'class': string;
  'clip-path': string;
  'clip-rule': string;
  'color-interpolation': string;
};

export type SVGLineProps = {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stroke: string;
  'stroke-width': string;
  'stroke-linecap': string;
  'stroke-linejoin': string;
  'stroke-miterlimit': string;
  'stroke-dasharray': string;
  'stroke-dashoffset': string;
  'stroke-opacity': string;
  'vector-effect': string;
  'fill-opacity': string;
  'fill-rule': string;
  'class': string;
  'clip-path': string;
  'clip-rule': string;
  'color-interpolation': string;
  'color-interpolation-filters': string;
  'color-profile': string;
  'color-rendering': string;
}

@customElement('bp-menu-button')
export class BpMenuButton extends LitElement {

  static styles = menuButtonStyles as unknown as CSSResult;

  @property({ type: Boolean, attribute: 'open', reflect: true }) isOpen = false;

  public toggle() {
    this.isOpen = !this.isOpen;
    this.dispatchEvent(new CustomEvent('bpToggle', { detail: { state: this.isOpen ? 'open' : 'close' } }));
  }

  public render() {
    return html`
<button @click=${this.toggle} aria-label="Toggle Menu Button">
  <svg class="icon" viewBox="0 0 100 100" width="40" height="40">
    ${this.line({ 'class': 'top-line', y1: '20' })}
    ${this.line({ 'class': 'mid-line', y1: '50' })}
    ${this.line({ 'class': 'bot-line', y1: '80' })}
  </svg>
</button>
`;
  }

  private line(props: Partial<SVGLineProps>) {
    props = {
      y2: props.y1,
      x1: '15',
      x2: '85',
      'stroke-width': '10',
      'stroke-linecap': 'round',
      ...props,
    }
    return svg`<line ${spread(props)}></line>`;
  }
}

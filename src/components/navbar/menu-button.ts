import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';

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

  static styles = css`
:host button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  line-height: 0;
}

:host {
  --size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size); 
  height: var(--size);
}

:host svg {
  width: 100%;
  height: 100%;
}

.a,.b,.c {
  transition: all 0.2s ease-in-out;
}

:host([open]) .icon .a {
  rotate: 0.125turn;
  translate: 30px 5px;
}

:host([open]) .icon .b {
  scale: 0;
  transform-origin: center;
}

:host([open]) .icon .c {
  rotate: -0.125turn;
  translate: -42px 32px;
}
`;

  @property({ type: Boolean, attribute: 'open', reflect: true }) isOpen = false;

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  public render() {
    return html`
<button @click=${this.toggle}>
  <svg class="icon" viewBox="0 0 100 100" width="40" height="40">
    ${this.line({ 'class': 'a', y1: '20' })}
    ${this.line({ 'class': 'b', y1: '50' })}
    ${this.line({ 'class': 'c', y1: '80' })}
  </svg>
</button>
`;
  }

  private line(props: Partial<SVGLineProps>) {
    props = {
      y2: props.y1,
      x1: '15',
      x2: '85',
      stroke: 'black',
      'stroke-width': '10',
      'stroke-linecap': 'round',
      ...props,
    }
    return svg`<line ${spread(props)}></line>`;
  }
}

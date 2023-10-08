import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('bp-alert')
export class BpAlert extends LitElement {
  static styles = css`
:host {
  display: block;
  border: 1px solid black;
}`;

  render() {
    return html`<button class="blue-button">
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-alert': BpAlert;
  }
}


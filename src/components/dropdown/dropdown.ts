
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

customElement('bp-dropdown')
export class BpDropdown extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        border: 1px solid black;
      }`
  ];

  render() {
    return html`<button class="bp-button">
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-dropdown': BpDropdown;
  }
}


import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

const buttonStyles = css`
  .blue-button {
    color: white;
    background-color: blue;
  }
  .blue-button:disabled {
    background-color: grey;
  }
`;

@customElement('bp-button')
export class BpButton extends LitElement {
  static styles = [
    buttonStyles,
    css`
      :host {
        display: block;
        border: 1px solid black;
      }`
  ];

  render() {
    return html`<button class="blue-button">
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-button': BpButton;
  }
}


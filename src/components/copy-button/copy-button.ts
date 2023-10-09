import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bp-copy-button')
export class BpCopyButton extends LitElement {
  static styles = [
    css`
      :host {
      }`
  ];

  @property({ type: String }) text = 'Copy';

  handleClick() {
    navigator.clipboard.writeText(this.text);
  }

  render() {
    return html`<button @click=${this.handleClick.bind(this)}>
      <slot>
        <sl-icon name="copy"></sl-icon>
      </slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-copy-button': BpCopyButton;
  }
}


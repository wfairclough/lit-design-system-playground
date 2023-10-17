import { Variant } from './../button/button';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../button/button';

@customElement('bp-copy-button')
export class BpCopyButton extends LitElement {

  @property({ type: String }) text = 'Copy';

  handleClick() {
    navigator.clipboard.writeText(this.text);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<bp-button variant="solid" color="primary" @click=${this.handleClick.bind(this)}>
      <sl-icon slot="icon-only" name="copy"></sl-icon>
    </bp-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-copy-button': BpCopyButton;
  }
}


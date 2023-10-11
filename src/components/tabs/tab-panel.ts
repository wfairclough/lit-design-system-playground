
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bp-tab-panel')
export class BpTabPanel extends LitElement {
  static styles = [
    css`
      :host {
      }`
  ];

  @property({ type: String }) tab: string | undefined = undefined;

  render() {
    return html`<div class="bp-tab-panel" role="tabpanel" tabindex="0">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-tab-panel': BpTabPanel;
  }
}


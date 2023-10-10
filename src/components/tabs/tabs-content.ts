
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bp-tabs-content')
export class BpTabsContent extends LitElement {
  static styles = [
    css`
      :host {
      }`
  ];

  @property({ type: String }) tab: string | undefined = undefined;

  render() {
    return html`<div class="bp-tabs-content">
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-tabs-content': BpTabsContent;
  }
}


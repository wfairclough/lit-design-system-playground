
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bp-tabs-trigger')
export class BpTabsTrigger extends LitElement {
  static styles = [
    css`
      :host {
      }`
  ];

  @property({ type: String }) tab: string | undefined = undefined;

  render() {
    return html`<button>
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-tabs-trigger': BpTabsTrigger;
  }
}


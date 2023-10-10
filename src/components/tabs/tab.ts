
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bp-tab')
export class BpTab extends LitElement {
  static styles = [
    css`
      :host a {
        text-decoration: none;
        color: inherit;
      }`
  ];

  @property({ type: String }) name: string | undefined = undefined;
  @property({ type: Boolean }) active: boolean = false;

  tabClicked(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('bpTabClick', {
      detail: {
        tabName: this.name,
      },
    }));
  }

  render() {
    return html`<a
      class="bp-tab"
      part="base"
      href="#${this.name}"
      aria-selected=${this.active}
      @click=${this.tabClicked}
      >
      <slot></slot>
    </a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-tab': BpTab;
  }
}


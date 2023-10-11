
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '../button/button.js';

@customElement('bp-dropdown')
export class BpDropdown extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }

      .bp-dropdown {
        position: relative;
      }

      :host [part='content']::slotted(*) {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 100;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
      }

      :host([open]) [part='content']::slotted(*) {
        opacity: 1;
      }
    `,
  ];

  @property({ type: Boolean, attribute: 'open', reflect: true }) isOpen = false;

  @query('[part="content"]') content!: HTMLElement;

  render() {
    return html`<div
      class="${classMap({
        'bp-dropdown': true,
        'bp-dropdown__open': this.isOpen,
      })}"
    >
      <slot name="trigger">
        <bp-button @click=${() => this.content.togglePopover()} variant="solid" color="primary"> Dropdown </bp-button>
      </slot>
      <div id="popover1" popover part="content">
        <slot part="content-slot"></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-dropdown': BpDropdown;
  }
}


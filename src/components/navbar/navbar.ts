import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../menu-button/menu-button';
import { MenuButtonEventDetail } from '../menu-button/menu-button';

@customElement('bp-navbar')
export class BpNavbar extends LitElement {

  public render() {
    return html`
<nav part="navbar" class="bp-navbar">

  <bp-menu-button @bpToggle=${this.#menuToggle}></bp-menu-button>

  <slot></slot>

</nav>
`;
  }

  #menuToggle(e: CustomEvent<MenuButtonEventDetail>) {
    if (e.detail.state === 'open') {
      this.setAttribute('expanded', '');
    } else {
      this.removeAttribute('expanded');
    }
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'bp-navbar': BpNavbar;
  }
}


import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { classMap } from 'lit/directives/class-map.js';

import './menu-button';

@customElement('bp-navbar')
export class BpNavbar extends LitElement {

  public render() {
    return html`
<nav part="navbar" class="bp-navbar">

  <bp-menu-button></bp-menu-button>

  <slot></slot>

</nav>
`;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'bp-navbar': BpNavbar;
  }
}


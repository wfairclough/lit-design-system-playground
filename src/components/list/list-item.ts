

import { LitElement, html, CSSResult, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import listItemStyles from './list-item.css?inline';

@customElement('bp-list-item')
export class BpListItem extends LitElement {
  static styles = listItemStyles as unknown as CSSResult;

  public render() {
    return html`
      <div role="listitem" part="listitem" class="bp-listitem">
        <slot></slot>
      </div>
`;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'bp-list-item': BpListItem;
  }
}



import { LitElement, html, CSSResult, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import listStyles from './list.css?inline';

import './list-item'

@customElement('bp-list')
export class BpList extends LitElement {
  static styles = listStyles as unknown as CSSResult;

  @queryAssignedElements({ selector: 'bp-list-item' }) listItems?: Array<HTMLBpListItemElement> | undefined;

  public render() {
    return html`
      <div role="list" part="list" class="bp-list">
        <slot></slot>
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'bp-list': BpList;
  }
}


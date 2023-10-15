import { LitElement, html, CSSResult, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import rowStyles from './row.css?inline';

@customElement('bp-row')
export class BpRow extends LitElement {
  static styles = rowStyles as unknown as CSSResult;

  @property({ type: String }) gap = '0px';

  public render() {
    return html`
      <div part="row" class="bp-row" style=${styleMap({ '--gap': this.gap })}>
        <slot></slot>
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'bp-row': BpRow;
  }
}



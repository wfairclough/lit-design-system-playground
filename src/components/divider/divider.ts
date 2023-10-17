import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('bp-divider')
export class BpDivider extends LitElement {

  static styles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 100%;
    --bp-divider-color: hsl(0, 0%, 86%);

  }
  :host .bp-divider {
    display: inline-flex;
    width: 1px;
    height: calc(100% - 8px);
    margin: 4px 0;
    background-color: var(--bp-divider-color);
  }

  @media (prefers-color-scheme: dark) {
    :host .bp-divider {
      --bp-divider-color: hsl(0, 0%, 24%);
    }
  }

  `;

  render() {
    return html`
      <div part="divider" class="bp-divider"></div>
    `;
  }
}

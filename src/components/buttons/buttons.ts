import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('bp-buttons')
export class BpButtons extends LitElement {
    static styles = css``;

    createRenderRoot() {
      return this;
    }

    connectedCallback(): void {
      super.connectedCallback();
      this.updateComplete.then(() => {
        this.style.display = 'inline-flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.style.gap = '8px';
      });
    }

    render() {
      return html``;
    }
  
}

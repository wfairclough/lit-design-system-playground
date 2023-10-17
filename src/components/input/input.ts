import { CSSResult, LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import inputStyles from "./input.css?inline";

@customElement('bp-input')
export class BpInput extends LitElement {
  static styles = inputStyles as unknown as CSSResult;

  @property({ type: String, attribute: 'value' }) value: string | undefined = undefined;

  @property({ type: String, attribute: 'placeholder' }) placeholder: string | undefined = undefined;

  @property({ type: String, attribute: 'label' }) label: string | undefined = undefined;

  @property({ type: String, attribute: 'type' }) type = 'text';

  @property({ type: Boolean, attribute: 'disabled' }) disabled = false;

  @property({ type: Boolean, attribute: 'required' }) required = false;

  @property({ type: Boolean, attribute: 'readonly' }) readonly = false;

  @property({ type: Boolean, attribute: 'autofocus' }) autofocus = false;

  @property({ type: Boolean, attribute: 'autocomplete' }) autocomplete = false;

  render() {
    const label = this.label
      ? html`<label part="label" for="native" class="bp-input__label">${this.label}</label>`
      : nothing;
    return html`
      <div class="bp-input__container">
        ${label}
        <div part="wrapper" class="bp-input">
          <input
            part="input"
            class=${classMap({
              'bp-input__input': true,
            })}
            id="native"
            type="${this.type}"
            placeholder="${this.placeholder}"
            value="${this.value}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            ?autofocus="${this.autofocus}"
            ?autocomplete="${this.autocomplete}"
          />
          <slot part="buttons-slot" name="buttons"></slot>
        </div>
      </div>
    `;
  }
}

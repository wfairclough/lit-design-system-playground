import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { watch } from '../../internal/watch';

export type Variant = 'solid' | 'outline' | 'clear';
export const Variant = {
  solid: 'solid' as Variant,
  outline: 'outline' as Variant,
  clear: 'clear' as Variant,
};

const resetStyles = css`
  :host button {
    all: unset;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }
`;

@customElement('bp-button')
export class BpButton extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-block;
        --background-color: var(--bp-color-base);
        --color: var(--bp-color-contrast);
      }

      :host(.bp-variant__solid) {
        --background-color: var(--bp-color-base);
        --background-color-activated: var(--bp-color-shade);
        --background-color-focused: var(--bp-color-shade);
        --background-color-hover: var(--bp-color-tint);
        --color: var(--bp-color-contrast);
        --color-hover: var(--color);
        --border-type: solid;
        --border-color: transparent;
      }

      :host(.bp-variant__outline) {
        --background-color: transparent;
        --background-color-activated: var(--bp-color-shade);
        --background-color-focused: var(--bp-color-shade);
        --background-color-hover: var(--bp-color-tint);
        --color: var(--bp-color-base);
        --color-hover: var(--bp-color-base);
        --border-type: solid;
        --border-color: var(--bp-color-base);
      }

      :host(.bp-variant__clear) {
        --background-color: transparent;
        --background-color-activated: var(--bp-color-shade);
        --background-color-focused: var(--bp-color-shade);
        --background-color-hover: transparent;
        --color: var(--bp-color-base);
        --color-hover: var(--bp-color-tint);
        --border-type: solid;
        --border-color: transparent;
      }

      :host button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        cursor: pointer;
        border: 1px var(--border-type) var(--border-color);
        padding: 0.5rem 1rem;
        border-radius: 10px;
        background-color: var(--background-color);
        color: var(--color);
        font-weight: 400;
      }

      :host button:active {
        background-color: var(--background-color-activated);
      }

      :host button:focus-visible {
        outline: 2px solid var(--background-color-focused);
      }

      :host button:hover {
        background-color: var(--background-color-hover);
        color: var(--color-hover);
      }

      :host button [part="main"] {
        display: inline-block;
      }

      :host button slot[name="start"]::slotted(*) {
      }
    `
  ];

  @property({ type: Variant }) variant: Variant = 'solid';

  @property({ type: String }) color: string = 'primary';

  @watch('variant')
  variantChanged(oldVariant: Variant, newVariant: Variant) {
    this.classList.remove(`bp-variant__${oldVariant}`);
    if (newVariant) {
      this.classList.add(`bp-variant__${newVariant}`);
    }
  }

  @watch('color')
  colorChanged(oldColor: string, newColor: string) {
    this.classList.remove(`bp-color-${oldColor}`);
    if (newColor) {
      this.classList.add(`bp-color-${newColor}`);
    }
  }

  render() {
    return html`
    <button part="base" class="bp-button bp-button__${this.variant}">
      <slot name="start"></slot>
      <slot part="main"></slot>
      <slot name="end"></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-button': BpButton;
  }
}


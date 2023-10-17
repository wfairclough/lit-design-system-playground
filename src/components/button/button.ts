import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { watch } from '../../internal/watch';
import buttonStyles from './button.css?inline';
import { HasSlotController } from '../../internal/slot';
import { classMap } from 'lit/directives/class-map.js';

export type Variant = 'solid' | 'outline' | 'clear';
export const Variant = {
  solid: 'solid' as Variant,
  outline: 'outline' as Variant,
  clear: 'clear' as Variant,
};

@customElement('bp-button')
export class BpButton extends LitElement {
  static styles = buttonStyles as any;

  @property({ type: Variant }) variant: Variant = 'solid';

  @property({ type: String }) color: string = 'primary';

  private readonly hasSlotController = new HasSlotController(this, 'icon-only', 'start', 'end');

  @watch('variant')
  variantChanged(oldVariant: unknown, newVariant: unknown): void {
    this.classList.remove(`bp-variant__${oldVariant}`);
    if (newVariant) {
      this.classList.add(`bp-variant__${newVariant}`);
    }
  }

  @watch('color')
  colorChanged(oldColor: unknown, newColor: unknown): void {
    this.classList.remove(`bp-color-${oldColor}`);
    if (newColor) {
      this.classList.add(`bp-color-${newColor}`);
    }
  }

  render() {
    return html`
    <button part="base" class=${classMap({
      [`bp-button bp-button__${this.variant}`]: true,
      'bp-button__has-icon-only': this.hasSlotController.test('icon-only'),
      'bp-button__has-start': this.hasSlotController.test('start'),
      'bp-button__has-end': this.hasSlotController.test('end'),
    })}>
      <slot name="start"></slot>
      <slot name="icon-only"></slot>
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


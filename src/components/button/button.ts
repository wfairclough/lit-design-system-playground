import { LitElement, PropertyValueMap, html } from 'lit';
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

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.classList.remove('bp-button__has-icon-only');
    this.classList.remove('bp-button__has-start');
    this.classList.remove('bp-button__has-end');
    if (this.hasSlotController.test('icon-only')) {
      this.classList.add('bp-button__has-icon-only');
    }
    if (this.hasSlotController.test('start')) {
      this.classList.add('bp-button__has-start');
    }
    if (this.hasSlotController.test('end')) {
      this.classList.add('bp-button__has-end');
    }
  }

  focus(options?: FocusOptions | undefined): void {
    this.shadowRoot?.querySelector('button')?.focus(options);
  }

  render() {
    return html`
    <button part="base" class=${classMap({
      [`bp-button bp-button__${this.variant}`]: true,
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


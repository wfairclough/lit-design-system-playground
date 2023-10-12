
import { LitElement, html, CSSResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { watch } from '../../internal/watch.js';
import dropdownStyles from './dropdown.css?inline';

import '../button/button.js';

export type Alignment = 'top' | 'bottom' | 'start' | 'end';
export const Alignment = {
  top: 'top' as Alignment,
  bottom: 'bottom' as Alignment,
  start: 'start' as Alignment,
  end: 'end' as Alignment,
};

@customElement('bp-dropdown')
export class BpDropdown extends LitElement {
  static styles = dropdownStyles as unknown as CSSResult;

  @property({ type: Boolean, attribute: 'open', reflect: true }) isOpen = false;

  @property({ type: Alignment }) alignment: Alignment = 'bottom';

  @query('[part="content"]') content!: HTMLElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      if (!this.content.popover) {
        this.classList.add('polyfilled');
        return;
      }
      this.content.addEventListener('toggle', (e: Event) => {
        console.log('toggle', e);
        if (e instanceof ToggleEvent) {
          this.isOpen = e.newState === 'open';
        }
      });
    });
  }

  @watch('alignment')
  alignmentChanged(oldAlignment: unknown, newAlignment: unknown): void {
    this.classList.remove(`bp-dropdown__align-${oldAlignment ?? 'bottom'}`);
    if (newAlignment) {
      this.classList.add(`bp-dropdown__align-${newAlignment}`);
    }
  }

  @watch('isOpen', { waitUntilFirstUpdate: true })
  isOpenChanged(oldState: unknown, newState: unknown) {
    console.log('handleToggle', oldState, newState);

    if (newState) {
      this.content?.showPopover();
      this.removeAttribute('closed');
    } else {
      this.content?.hidePopover();
      this.setAttribute('closed', '');
    }

    
  }

  render() {
    return html`<div
      class="${classMap({
        'bp-dropdown': true,
        'bp-dropdown__open': this.isOpen,
        'bp-dropdown__closed': !this.isOpen,
      })}"
    >
      <slot name="trigger">
        <bp-button
          part="trigger-button"
          id="trigger"
          @click=${() => (this.isOpen = !this.isOpen)}
          .variant="solid"
          .color="primary"
        >
          <slot></slot>
        </bp-button>
      </slot>
      <div id="popover1" popover part="content" anchor="trigger">
        <slot name="content" part="content-slot"></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-dropdown': BpDropdown;
  }
}


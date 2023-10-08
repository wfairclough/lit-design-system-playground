import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { checkmarkSvg } from './checkmark.svg.js';
import { checkboxStyles } from './checkbox.styles.js';

@customElement('bp-checkbox')
export class BpCheckbox extends LitElement {
  static styles = [
    checkboxStyles,
  ];

  constructor() {
    super();
    this.label = '';
    this.checked = true;
    this.iconElement = undefined;
  }

  @property({ type: String }) label: string = '';
  
  @property({ type: Boolean }) checked: boolean = true;
  
  @property({ type: Boolean }) disabled: boolean = false;

  toggle(event?: Event) {
    this.checked = !this.checked;
    if (event) {
      this._dispatchChangeEvent();
    }
  }

  get value() {
    return this.checked ? 'on' : 'off';
  }

  set value(val: 'on' | 'off') {
    this.checked = val === 'on';
  }

  private iconElement: HTMLElement | undefined;

  private _dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('bpChange', {
      detail: {
        checked: this.checked,
        value: this.value,
      },
    }));
  }

  private iconSlotChanged() {
    // Access the slot and extract the template
    const slot = this.shadowRoot?.querySelector('slot[name="icon-template"]') as HTMLSlotElement | undefined;
    const nodes: any[] = slot?.assignedNodes() ?? [];
    for (const node of nodes) {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'TEMPLATE') {
        const iconTemplate = node.content;
        this.iconElement = iconTemplate.cloneNode(true);
        console.log(this.iconElement);
        this.requestUpdate();
        break;
      }
    }
  }


  render() {
    return html`<div class="bp-checkbox">
      <slot @slotchange=${this.iconSlotChanged} name="icon-template"> </slot>
      <button id="checkbox" role="checkbox" aria-checked="false" @click=${this.toggle} >
        <div class="icon-wrapper" style=${styleMap({display: this.checked ? 'block' : 'none'})}>
          ${this.iconElement ?? checkmarkSvg}
        </div>
      </button>
      <input type="checkbox" aria-hidden="true" tabindex="-1" ?checked=${this.checked} value=${this.value} />
      <label for="checkbox">
        <slot name="label">
          ${this.label ? this.label : nothing}
        </slot>
      </label>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-checkbox': BpCheckbox;
  }
}


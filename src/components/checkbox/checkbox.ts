import { LitElement, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import checkboxStyles from './checkbox.css?inline';

import { checkmarkSvg } from './checkmark.svg.js';

@customElement('bp-checkbox')
export class BpCheckbox extends LitElement {
  static styles = [
    checkboxStyles as any,
  ];

  constructor() {
    super();
  }

  @property({ type: String }) label: string = '';
  
  @property({ type: Boolean }) checked: boolean = true;

  // @hostClass('bp-checkbox--disabled') 
  @property({ type: Boolean }) disabled: boolean = false;

  @query('slot[name="icon-template"]') iconSlot: HTMLSlotElement | undefined;

  toggle(event?: Event) {
    if (this.disabled) {
      return;
    }
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
    const nodes: any[] = this.iconSlot?.assignedNodes() ?? [];
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

  connectedCallback(): void {
    super.connectedCallback();
  }

  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
  }

  render() {
    return html`<div class="${classMap({
      'bp-checkbox': true,
      'bp-checkbox--checked': this.checked,
      'bp-checkbox--disabled': this.disabled,
    })}">
      <slot @slotchange=${this.iconSlotChanged} name="icon-template"> </slot>
      <button id="checkbox" role="checkbox" aria-checked="false" @click=${this.toggle} >
        <div class="icon-wrapper" style=${styleMap({display: this.checked ? 'block' : 'none'})}>
          ${this.iconElement ?? checkmarkSvg}
        </div>
      </button>
      <input type="checkbox" aria-hidden="true" tabindex="-1" ?checked=${this.checked} value=${this.value} disabled=${this.disabled}/>
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


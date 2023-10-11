
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { BpTabs } from './tabs';

@customElement('bp-tab')
export class BpTab extends LitElement {
  static styles = [
    css`
      :host {
        box-sizing: border-box;
        cursor: pointer;
      }
      :host a {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
        padding: 8px 16px;
        margin: 0;
        border: none;
        background: none;
        font: inherit;
      }
      :host a[aria-selected="true"] {
        color: var(--select-color, blue);
      }
      `
  ];

  @property({ type: String }) name: string | undefined = undefined;
  @property({ type: Boolean }) active: boolean = false;

  @query('a') anchor!: HTMLAnchorElement;

  private get tabsElement(): BpTabs {
    return this.parentElement as BpTabs;
  }

  tabClicked(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('bpTabClick', {
      detail: {
        tabName: this.name,
      },
    }));
  }

  focus(options?: FocusOptions | undefined): void {
    this.anchor.focus(options);
  }

  private keyPressed(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.anchor.click();
    }
    const tabs = this.tabsElement;
    if (e.key === 'ArrowLeft') {
      console.log({ tabs });
      tabs.focusPriviousTab({ current: this }); 
    } else if (e.key === 'ArrowRight') {
      console.log({ tabs });
      tabs.focusNextTab({ current: this });
    }
  }

  render() {
    return html`<a
      class="bp-tab"
      part="base"
      href="#${this.name}"
      aria-selected=${this.active}
      tabIndex=${this.active ? 0 : -1}
      @click=${this.tabClicked}
      @keydown=${this.keyPressed}
      >
      <slot></slot>
    </a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-tab': BpTab;
  }
}


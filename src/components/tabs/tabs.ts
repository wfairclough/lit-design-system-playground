
import { LitElement, html, css } from 'lit';
import { customElement, query, queryAssignedElements, state } from 'lit/decorators.js';
import { BpTab } from './tab';
import { BpTabPanel } from './tab-panel';

@customElement('bp-tabs')
export class BpTabs extends LitElement {
  static styles = [
    css`
      :host {
      }

      :host .bp-tabs-container {
        display: flex;
        flex-direction: column;
      }

      :host [role="tablist"] {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      :host [role="tabpanel"] {
        display: flex;
        min-width: 100%;
      } 
    `,
  ];

  @state({}) activeTab: BpTab | undefined = undefined;

  @query('slot') defaultSlot!: HTMLSlotElement;
  @query('slot[name="nav"]') navSlot!: HTMLSlotElement;

  @queryAssignedElements({ slot: 'nav', selector: 'bp-tab', flatten: true }) tabs:
    | NodeListOf<BpTab>
    | undefined;
  @queryAssignedElements({ selector: 'bp-tab-panel', flatten: true }) panels:
    | NodeListOf<BpTabPanel>
    | undefined;

  connectedCallback() {
    super.connectedCallback();

    console.log({ triggers: this.tabs, contents: this.panels });
  }

  navSlotUpdated() {
    const slot = this.navSlot;
    console.log('navSlotUpdated', { slot, t: this.tabs, c: this.panels });
    const handleTabClick = (e: Event) => {
      const target = e.target as BpTab;
      if (target instanceof BpTab) {
        if (this.activeTab !== target) {
          this.selectTab(target, { emit: true });
        }
      }
    };
    this.tabs?.forEach(tab => {
      tab.addEventListener('click', handleTabClick);
      if (tab.active) {
        this.activeTab = tab;
      }
    });
    if (!this.activeTab) {
      this.activeTab = this.tabs?.[0];
      if (this.activeTab) {
        this.activeTab.active = true;
      }
    }
  }

  defaultSlotUpdated() {
    const slot = this.defaultSlot;
    console.log('defaultSlotUpdated', { slot, t: this.tabs, c: this.panels });
    for (const tab of this.tabs ?? []) {
      if (tab.active) {
        this.selectTab(tab);
        return;
      }
    }
  }

  focusPriviousTab({ current }: { current?: BpTab } = {}) {
    const currentFocusTab = current ?? this.activeTab;
    const previousTab = currentFocusTab?.previousElementSibling; 
    if (previousTab instanceof BpTab) {
      previousTab.focus();
    } else if (this.tabs?.length) {
      this.tabs![this.tabs!.length - 1].focus();
    }
  }

  focusNextTab({ current }: { current?: BpTab } = {}) {
    const currentFocusTab = current ?? this.activeTab;
    const nextTab = currentFocusTab?.nextElementSibling; 
    if (nextTab instanceof BpTab) {
      nextTab.focus();
    } else if (this.tabs?.length) {
      this.tabs![0].focus();
    }
  }

  private selectTab(tab: BpTab, { emit = false } = {}) {
    let previousTab: string | undefined = undefined;
    for (const panel of this.panels ?? []) {
      if (panel.hidden === false) {
        previousTab = panel.tab;
      }
      if (panel.tab === tab.name) {
        panel.hidden = false;
      } else {
        panel.hidden = true;
      }
    }
    this.tabs?.forEach(tab => {
      tab.active = false;
    });
    this.activeTab = tab;
    this.activeTab.active = true;
    if (emit) {
      this.dispatchEvent(new CustomEvent('bpChange', { detail: { currentTab: tab, previousTab } }));
    }
  }

  render() {
    return html`<div part="base" class="bp-tabs-container">
      <nav part="nav" role="tablist">
        <slot name="nav" @slotchange=${this.navSlotUpdated}></slot>
      </nav>
      <div part="tabpanel" role="tabpanel">
        <slot @slotchange=${this.defaultSlotUpdated}></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-tabs': BpTabs;
  }
}


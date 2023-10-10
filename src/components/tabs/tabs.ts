
import { LitElement, html, css } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { BpTabsTrigger } from './tabs-trigger';
import { BpTabsContent } from './tabs-content';

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
    `,
  ];

  @property({ type: String }) defaultTab: string | undefined = undefined;

  @state({}) activeTab: string | undefined = undefined;

  @query('slot') defaultSlot!: HTMLSlotElement;
  @query('slot[name="nav"]') navSlot!: HTMLSlotElement;

  @queryAssignedElements({ slot: 'nav', selector: 'bp-tabs-trigger', flatten: true }) tabTriggers:
    | NodeListOf<BpTabsTrigger>
    | undefined;
  @queryAssignedElements({ selector: 'bp-tabs-content', flatten: true }) tabContents:
    | NodeListOf<BpTabsContent>
    | undefined;

  connectedCallback() {
    super.connectedCallback();

    console.log({ triggers: this.tabTriggers, contents: this.tabContents });
  }

  navSlotUpdated() {
    const slot = this.navSlot;
    console.log('navSlotUpdated', { slot, t: this.tabTriggers, c: this.tabContents });
    const handleTabClick = (e: Event) => {
      const target = e.target as BpTabsTrigger;
      if (target instanceof BpTabsTrigger && target.tab) {
        if (this.activeTab !== target.tab) {
          this.selectTab(target.tab, { emit: true });
        }
      }
    };
    this.tabTriggers?.forEach(trigger => {
      trigger.addEventListener('click', handleTabClick);
    });
  }

  defaultSlotUpdated() {
    const slot = this.defaultSlot;
    console.log('defaultSlotUpdated', { slot, t: this.tabTriggers, c: this.tabContents });

    this.selectTab(this.defaultTab ?? '');
  }

  private selectTab(tab: string, { emit = false } = {}) {
    let previousTab: string | undefined = undefined;
    for (const content of this.tabContents ?? []) {
      if (content.hidden === false) {
        previousTab = content.tab;
      }
      if (content.tab === tab) {
        content.hidden = false;
      } else {
        content.hidden = true;
      }
    }
    this.activeTab = tab;
    if (emit) {
      this.dispatchEvent(new CustomEvent('bpChange', { detail: { currentTab: tab, previousTab } }));
    }
  }

  render() {
    return html`<div part="container" class="bp-tabs-container">
      <nav part="nav">
        <slot name="nav" @slotchange=${this.navSlotUpdated}></slot>
      </nav>
      <section part="content-panel">
        <slot @slotchange=${this.defaultSlotUpdated}></slot>
      </section>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-tabs': BpTabs;
  }
}


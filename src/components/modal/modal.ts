import { LitElement, html, CSSResult, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import modalStyles from './modal.css?inline';

export type FormEventListener = (this: HTMLFormElement, ev: SubmitEvent) => any;

@customElement('bp-modal')
export class BpModal extends LitElement {
  static styles = modalStyles as unknown as CSSResult;

  @property({ attribute: 'open' }) isOpen = false;

  @query('dialog[part="native"]') nativeDialog!: HTMLDialogElement;

  @query('slot[part="main"]') mainSlot!: HTMLSlotElement;

  @queryAssignedElements({ selector: 'form[method="dialog"]' }) dialogForms?: Array<HTMLFormElement> | undefined;

  private dialogMutationObsv!: MutationObserver; 
  private formListeners: Map<HTMLFormElement, FormEventListener> = new Map();

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.firstUpdated(_changedProperties);
    this.nativeDialog.addEventListener('close', this._onModalClose.bind(this));

    // Watch <dialog> for open attribute changes
    this.dialogMutationObsv = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'open') {
          if (this.nativeDialog.open) {
            this._onModalOpen();
          }
        }
      });
    });

    this.dialogMutationObsv.observe(this.nativeDialog, { attributes: true });

    this.dialogForms?.forEach(f => {
      const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        this.close(new FormData(f));
      };
      f.addEventListener('submit', handleSubmit);
      this.formListeners.set(f, handleSubmit);
    });

    this.nativeDialog.addEventListener('click', (event) => {
      console.log({ event });
      if ((event?.target as unknown as any)?.id !== 'interceptor') {
          this.close();
      }
  });
  }

  disconnectedCallback(): void {
    this.nativeDialog.removeEventListener('close', this._onModalClose.bind(this));
    this.dialogMutationObsv.disconnect();
    this.formListeners.forEach((listener, form) => {
      form.removeEventListener('submit', listener);
    });
    super.disconnectedCallback();
  }

  showModal() {
    this.nativeDialog.showModal();
  }

  #returnValue: any;
  close(returnValue?: any) {
    if (returnValue) {
      this.#returnValue = returnValue;
    }
    this.nativeDialog.close(typeof returnValue === 'string' ? returnValue : undefined);
  }


  render() {
    return html`
      <dialog part="native" class=${classMap({
        'bp-modal': true,
        'bp-modal--open': this.nativeDialog?.open,
        })}>
        <div id="interceptor"></div>
        <slot part="main"></slot>
      </dialog>
    `;
  }
  
  private _onModalClose(e: Event) {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('bpClose', {
      detail: { nativeEvent: e, state: 'close', returnValue: this.#returnValue },
    }));
  }

  private _onModalOpen() {
    this.isOpen = true;
    this.#returnValue = undefined;
    this.dispatchEvent(new CustomEvent('bpOpen', {
      detail: { nativeDialogElement: this.nativeDialog, state: 'open' },
    }));
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'bp-modal': BpModal;
  }
}


import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../copy-button/copy-button.js';

@customElement('bp-color-gen')
export class BpColorGen extends LitElement {

  @property({ type: String }) name: string | undefined = undefined;

  @property({ type: String }) hexColor: string | undefined = undefined;

  get rgbColor() {
    if (!this.hexColor) return undefined;
    const hex = this.hexColor.replace('#', ''); 
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
  }

  get hslColor() {
    if (!this.hexColor) return undefined;

    const hex = this.hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let l = ((max + min) / 2);

    // const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    let h = 0;
    let s = 0;
    if (delta === 0) {
      h = 0;
      s = 0;
    } else {
      switch (max) {
        case r:
          h = 60 * (((g - b) / delta) % 6);
          break;
        case g:
          h = 60 * ((b - r) / delta + 2);
          break;
        case b:
          h = 60 * ((r - g) / delta + 4);
          break;
      }
      if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
    }
    l = l * 100;
    s = s * 100;
    return `${h.toFixed(2)}deg ${s.toFixed(0)}% ${l.toFixed(0)}%`;
  }

  get contrastColor() {
    if (!this.hexColor) return undefined;
    const hex = this.hexColor.replace('#', ''); 
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
  }

  get contrastRgbColor() {
    if (!this.hexColor) return undefined;
    const hex = this.hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '0,0,0' : '255,255,255';
  }

  get shadeColor() {
    if (!this.hexColor) return undefined;
    const hex = this.hexColor.replace('#', ''); 
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const t = 0.5;
    const p = t < 0 ? t * 2 : t;
    const q = 1 - p;
    const tr = Math.round(r * q + 0 * p);
    const tg = Math.round(g * q + 0 * p);
    const tb = Math.round(b * q + 0 * p);

    const shade = `#${tr.toString(16)}${tg.toString(16)}${tb.toString(16)}`;
    return shade;
  }

  get tintColor() {
    if (!this.hexColor) return undefined;
    const hex = this.hexColor.replace('#', ''); 
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const t = 0.5;
    const p = t < 0 ? t * 2 : t;
    const q = 1 - p;
    const tr = Math.round(r * q + 255 * p);
    const tg = Math.round(g * q + 255 * p);
    const tb = Math.round(b * q + 255 * p);

    const tint = `#${tr.toString(16)}${tg.toString(16)}${tb.toString(16)}`;
    return tint;
  }

  getText() {
    return `
:root {
	--bp-color-${this.name}: ${this.hexColor};
	--bp-color-${this.name}-rgb: ${this.rgbColor};
	--bp-color-${this.name}-hsl: ${this.hslColor};
	--bp-color-${this.name}-contrast: ${this.contrastColor};
	--bp-color-${this.name}-contrast-rgb: ${this.contrastRgbColor};
	--bp-color-${this.name}-shade: ${this.shadeColor};
	--bp-color-${this.name}-tint: ${this.tintColor};
}

.bp-color-${this.name} {
	--bp-color-base: var(--bp-color-${this.name});
	--bp-color-base-rgb: var(--bp-color-${this.name}-rgb);
	--bp-color-base-hsl: var(--bp-color-${this.name}-hsl);
	--bp-color-contrast: var(--bp-color-${this.name}-contrast);
	--bp-color-contrast-rgb: var(--bp-color-${this.name}-contrast-rgb);
	--bp-color-shade: var(--bp-color-${this.name}-shade);
	--bp-color-tint: var(--bp-color-${this.name}-tint);
}

`;
  }

  render() {
    const text = this.getText();
    return html`
<div class="bp-color-gen">
  <bp-copy-button .text=${text}></bp-copy-button>
  <pre class="bp-color-gen">
    ${text} 
  </pre>
</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bp-color-gen': BpColorGen;
  }
}


import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';

import '../button/button';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Input',
  tags: ['autodocs'],
  render: args => {
    console.log(args);
    const togglePasswordVisibility = (e: Event) => {
    };
    const passwordButtons = args.type === 'password' ? html`
      <bp-button variant="clear" color="blue" aria-label="show password" @click=${togglePasswordVisibility}>
        <sl-icon style="font-size: 1rem;" slot="icon-only" name=${args.showPassword ? 'eye-slash' : 'eye'}></sl-icon>
      </bp-button>
      <bp-divider></bp-divider>
      <bp-button variant="clear" color="blue" aria-label="Scan Fingerprint">
        <sl-icon slot="icon-only" name="fingerprint"></sl-icon>
      </bp-button>
    ` : nothing;
    const emailButtons = args.type === 'email' ? html`
      <bp-button variant="clear" color="blue" aria-label="Scan QR Code">
        <sl-icon slot="icon-only" name="qr-code-scan"></sl-icon>
      </bp-button>
    ` : nothing;  
    return html`
      <style>
      bp-input::part(input) {
        width: 250px;
      }
      bp-button:last-child {
        margin-inline-end: 0.2rem;
      }
      </style>
      <bp-input
        type="${args.type}"
        placeholder="${args.placeholder}"
        label="${args.label}"
        ?disabled="${args.disabled}"
        ?required="${args.required}"
        ?autofocus="${args.autofocus}"
        ?autocomplete="${args.autocomplete}"
        value="${args.value}"
      >
        <bp-buttons slot="buttons">
          ${passwordButtons}
          ${emailButtons}
        </bp-buttons>
      </bp-input>
    `;
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'password',
        'number',
        'email',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
        'month',
        'week',
        'color',
      ]
    },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    autofocus: { control: 'boolean' },
    autocomplete: { control: 'boolean' },
    bpChange: { action: 'bpChange' },
    bpInput: { action: 'bpInput' },
    bpBlur: { action: 'bpBlur' },
    bpFocus: { action: 'bpFocus' },
    showPassword: { control: 'boolean' },
  },
  parameters: {
    actions: {
      handles: ['bpChange', 'bpInput', 'bpBlur', 'bpFocus'],
    },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Text',
    label: 'Text',
    disabled: false,
    required: false,
    autofocus: true,
    autocomplete: false,
    value: '',
    showPassword: true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
    disabled: false,
    required: false,
    autofocus: true,
    autocomplete: false,
    value: '',
    showPassword: false,
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
    disabled: false,
    required: false,
    autofocus: true,
    autocomplete: false,
    value: '',
  },
};

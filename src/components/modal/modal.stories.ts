import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import type { BpModal } from './modal';
import '../button/button.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Modal',
  tags: ['autodocs'],
  render: (args) => {
    const openModal = () => {
      const modal = document.getElementById('modal') as BpModal;
      modal.showModal();
    };
    const closeModal = () => {
      const modal = document.getElementById('modal') as BpModal;
      modal.close();
    };
    return html`
      <bp-button @click=${openModal}>Open Modal</bp-button>

      <bp-modal id="modal" @bpOpen=${args.bpOpen} @bpClose=${args.bpClose}>
        <h1>Modal</h1>
        <p>Modal content</p>
        <button @click=${closeModal}>Close</button>
        <form method="dialog">
          <input type="text" hidden name="foo" value="bar" />
          <button type="submit">Close with form</button>
        </form>
      </bp-modal>
    `;
  },
  argTypes: {
    bpOpen: { action: 'bpOpen' },
    bpClose: { action: 'bpClose' },
  },
  parameters: {
    actions: {
      handles: ['bpOpen', 'bpClose'],
    },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Confirm: Story = {
  args: {
  },
};



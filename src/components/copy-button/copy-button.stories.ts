
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BpCopyButton } from './copy-button.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/CopyButton',
  tags: ['autodocs'],
  render: (args) => html`<bp-copy-button .text=${args.text}></bp-copy-button>`,
  argTypes: {
    text: { control: 'text' },
    onClick: { action: 'onClick' },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    text: 'Something to copy',
  },
};


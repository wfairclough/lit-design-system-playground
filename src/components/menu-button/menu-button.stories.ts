import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/MenuButton',
  tags: ['autodocs'],
  render: (args) => {
    return html`
      <bp-menu-button @bpToggle=${args.onToggle}>
      </bp-menu-button>
    `;
  },
  argTypes: {
    onToggle: { action: 'bpToggle' },
  },
  parameters: {
    actions: {
      handles: ['bpToggle'],
    },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {

  },
};




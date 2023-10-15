import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';


// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Navbar',
  tags: ['autodocs'],
  render: (args) => {
    return html`
      <bp-navbar>
      </bp-navbar>
    `;
  },
  argTypes: {
  },
  parameters: {
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {
  },
};




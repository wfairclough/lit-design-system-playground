
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';


// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/List',
  tags: ['autodocs'],
  render: (args) => {
    return html`
      <bp-list>
        <bp-list-item>Item 1</bp-list-item>
        <bp-list-item>Item 2</bp-list-item>
        <bp-list-item>Item 3</bp-list-item>
      </bp-list>
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



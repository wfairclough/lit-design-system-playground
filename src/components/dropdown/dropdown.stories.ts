import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Dropdown',
  tags: ['autodocs'],
  render: (args) => {
    args = {
      ...args,
    }
    return html`<bp-dropdown></bp-dropdown>`;
  },
  argTypes: {
    variant: { control: { type: 'select' }, options: ['primary', 'secondary', 'tertiary'] }, 
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};


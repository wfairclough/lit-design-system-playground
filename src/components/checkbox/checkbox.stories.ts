
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BpCheckbox } from './checkbox';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Checkbox',
  tags: ['autodocs'],
  render: (args) => html`<bp-checkbox .text=${args.text} label=${args.label}></bp-checkbox>`,
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text'},
    onClick: { action: 'onClick' },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    checked: true,
    label: 'Agree to terms and conditions',
  },
};


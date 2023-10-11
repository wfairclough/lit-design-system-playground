
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './color-gen';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Color Gen',
  tags: ['autodocs'],
  render: (args) => {
    args = {
      ...args,
    };
    return html`
<bp-color-gen .name=${args.name} .hexColor=${args.hexColor}></bp-color-gen>
`;
  },
  argTypes: {
    name: { control: 'text' },
    hexColor: { control: 'color' },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const ColorGen: Story = {
  args: {
    name: 'primary',
    hexColor: '#007bff',
  },
};


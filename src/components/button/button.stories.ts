import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';


// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Button',
  tags: ['autodocs'],
  render: (args) => {
    args = {
      ...args,
    };
    return html`
<bp-button .variant=${args.variant} .color=${args.color}>
  <sl-icon name="plus" slot="start"></sl-icon>
  Filter
</bp-button>`;
  },
  argTypes: {
    variant: { control: { type: 'select' }, options: ['solid', 'outline', 'clear'] }, 
    color: { control: { type: 'select' }, options: ['primary', 'primary-dark', 'primary-light'] }, 
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
  },
};


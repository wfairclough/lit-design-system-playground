import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';


// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Layouts/Row',
  tags: ['autodocs'],
  render: (args) => {
    return html`
      <bp-row gap=${args.gap}>
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
      </bp-row>
      <style>
        bp-row span {
          display: inline-block;
          padding: 0.5rem;
          margin: 0;
          height: 50px;
          line-height: 50px;
          border: 1px solid black;
          background: rebeccapurple;
          color: white;
        }
      </style>
    `;
  },
  argTypes: {
    gap: { control: { type: 'text' } },
  },
  parameters: {
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {
    gap: '20px',
  },
};



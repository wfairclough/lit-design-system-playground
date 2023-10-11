import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Tabs',
  tags: ['autodocs'],
  render: args => {
  console.log(args)
    return html`<bp-tabs @bpChange=${args.bpChange} defaultTab="tab1">
      <bp-tab slot="nav" name="tab1">Tab 1</bp-tab>
      <bp-tab slot="nav" name="tab2">Tab 2</bp-tab>
      <bp-tab slot="nav" name="tab3">Tab 3</bp-tab>

      <bp-tab-panel tab="tab1">Tab 1 content</bp-tab-panel>
      <bp-tab-panel tab="tab2">Tab 2 content</bp-tab-panel>
      <bp-tab-panel tab="tab3">Tab 3 content</bp-tab-panel>
    </bp-tabs>`;
  },
  argTypes: {
    defaultTab: { control: 'text' },
    bpChange: { action: 'bpChange' },
  },
  parameters: {
    actions: {
      handles: ['bpChange'],
    },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Tabs: Story = {
  args: {
    defaultTab: 'Something to copy',
  },
};


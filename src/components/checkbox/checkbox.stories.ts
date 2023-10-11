import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';

import { BpCheckbox } from './checkbox';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: 'Blueprint/Checkbox',
  tags: ['autodocs'],
  render: (args) => {
    args = {
      ...args,
      '?checked': args.checked,
      '?disabled': args.disabled,
    }
    if (args.customIcon) {
      return html`<bp-checkbox ${spread(args)}>
        <template slot="icon-template">
          <sl-icon name="copy"></sl-icon>
        </template>
      </bp-checkbox>`;
    }
    return html`<bp-checkbox ${spread(args)}></bp-checkbox>`;
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean', defaultValue: false },
    label: { control: 'text'},
    customIcon: { control: 'text'},
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Agree to terms and conditions',
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Agree to terms and conditions',
  },
};

export const CustomIcon: Story = {
  args: {
    ...Checked.args,
    customIcon: 'copy',
  },
};

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
    return html`<bp-dropdown .alignment=${args.alignment}>
      <!--
      <div slot="content" class="dropdown-conent">
        <p>Content</p>
      </div>
      -->

      <ul slot="content" class="dropdown-conent">
        <li>
          <bp-dropdown alignment="end">
            Item 1
            <ul slot="content" class="dropdown-conent">
              <li>Item 1.1</li>
              <li>Item 1.2</li>
              <li>Item 1.3</li>
            </ul>
          </bp-dropdown>
        </li>
        <li>
          <bp-dropdown alignment="end">
            Item 2
            <ul slot="content" class="dropdown-conent">
              <li>Item 2.1</li>
              <li>Item 2.2</li>
              <li>Item 2.3</li>
            </ul>
          </bp-dropdown>
        </li>
        <li>
          <bp-dropdown alignment="end">
            Item 3
            <ul slot="content" class="dropdown-conent">
              <li>Item 3.1</li>
              <li>Item 3.2</li>
              <li>Item 3.3</li>
            </ul>
          </bp-dropdown>
        </li>
      </ul>

      Select an option
    </bp-dropdown>`;
  },
  argTypes: {
    alignment: { control: { type: 'select' }, options: ['top', 'bottom', 'start', 'end'] },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    alignment: 'bottom',
  },
};


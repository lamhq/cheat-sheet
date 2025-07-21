# Typescript

## Typing custom args

Sometimes stories need to define args that aren’t included in the component's props.

```tsx
// Page.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './Page';

type PagePropsAndCustomArgs = React.ComponentProps<typeof Page> & { footer?: string };

const meta: Meta<PagePropsAndCustomArgs> = {
  component: Page,
  render: ({ footer, ...args }) => (
    <Page {...args}>
      <footer>{footer}</footer>
    </Page>
  ),
};
export default meta;

type Story = StoryObj<PagePropsAndCustomArgs>;

export const CustomFooter: Story = {
  args: {
    footer: 'Built with Storybook',
  },
};
```

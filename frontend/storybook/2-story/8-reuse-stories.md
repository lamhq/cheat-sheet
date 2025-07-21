# Stories for multiple components

## Reusing subcomponent stories

```tsx
// List.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { List } from './List';

//👇 Instead of importing ListItem, we import the stories
import { Unchecked } from './ListItem.stories';

export const meta: Meta<typeof List> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'List',
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

export const OneItem: Story = {
  render: (args) => (
    <List {...args}>
      <Unchecked {...Unchecked.args} />
    </List>
  ),
};
```

# Render Process

Before your components are displayed on the screen, they must be rendered by React. 

The process of rendering UI has three steps:

- Triggering a render
- Rendering the component
- Committing to the DOM


## Step 1: Trigger a render

There are two reasons for a component to render:

- It’s the component’s initial render.
- The component’s (or one of its ancestors’) state has been updated.

### Initial render

it’s done by calling `render`on the React root:

```js
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

### Re-renders when state updates

Once the component has been initially rendered, you can trigger further renders by updating its state with the `setState` function.


## Step 2: React renders your components

Rendering means that React is calling your component, which is a function:

- On initial render, React will call the root component.
- For subsequent renders, React will call the function component whose state update triggered the render and get the new JSX snapshot.


## Step 3: React commits changes to the DOM 

After rendering (calling) your components, React will modify the DOM.

- For the **initial render**, React will use the `appendChild()` DOM API to put all the DOM nodes it has created on screen.
- For **re-renders**, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.

React only changes the DOM nodes if there’s a difference between renders.

After React updated the DOM, the browser will repaint the screen.


## Component lifecycle

- A component **mounts** when it’s added to the screen.
- A component **updates** when it receives new props or state, usually in response to an interaction.
- A component **unmounts** when it’s removed from the screen.


## References

https://react.dev/learn/render-and-commit
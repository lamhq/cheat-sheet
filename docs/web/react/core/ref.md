# Refs

## Storing values

When you want a component to “remember” some information, but you don’t want trigger new renders when updating that information, you can use a *ref*.

Usage:

```js
import { useRef } from 'react';

const ref = useRef(0);
```

`useRef` returns an object like this:

```js
{ 
  current: 0 // The value you passed to useRef
}
```

`ref.current` is mutable. You can assign `ref.current` to anything (string, an object, or even a function).

Changing `ref.current` does not re-renders a component. 

Example: building a counter

```jsx
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```


## Storing DOM elements

React automatically updates the DOM to match your render output, so your components won’t often need to manipulate it.

However, sometimes you might need access to the DOM elements managed by React to do things that React doesn't support (e.g., focus an input, scroll to an element, etc).

Example: Focusing a text input:

```jsx
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```


### When React attaches the refs 

1. During the first render, the DOM nodes have not yet been created, so `ref.current` will be `null`.
2. During the rendering of updates, the DOM nodes haven’t been updated yet.
3. Before updating the DOM, React sets the affected `ref.current` values to `null`.
4. After updating the DOM, React immediately sets `ref.current` to the corresponding DOM nodes.


### Accessing childen's DOM node

You can accessing the DOM node of children component by passing `refs` from parent component to child components

```jsx
import { useRef } from 'react';

function MyInput({ ref }) {
  return <input ref={ref} />;
}

function Parent() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />
}
```


### Store an array of elements

```tsx
// the ref that hold a list of img elements
const refs = useRef<HTMLImageElement[]>([]);

function setRef(ref: HTMLImageElement | null, index: number) {
  if (ref) {
    refs.current[index] = ref;
  }
}

images.map((image, index) => (
  <img
    src={image}
    ref={(ref) => setRef(ref, index)}
    key={image}
    alt=""
  />
))
```


## Best Practices

If your component needs to store some value, but it doesn’t impact the rendering logic, choose refs (timeout IDs, DOM elements, etc).

Avoid using ref to change DOM nodes managed by React.

Don't read or write `ref.current` during rendering:
- Do not write because component function must be pure
- Do not read because it can lead to unreliable code. The value of
`ref.current` can change at any time, but does not trigger a re-render.

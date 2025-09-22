# State management

## State and Render

When React re-renders a component:

- React calls your function again.
- Your function returns a new JSX snapshot.
- React then updates the screen to match the snapshot your function returned.

State actually "lives" in React itself, outside of your function. 

When React calls your component:
1. It gives you a snapshot of the state for that particular render.
2. Your component returns a snapshot of the UI, with props and event handlers calculated using the state values.


## Queueing a series of state updates

State doesn’t update synchronously: after calling `set` state function, the new state value only available in the next render.

To queue multiple state updates, passing an updater function when setting state:

```jsx
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(s => s + 1);
  }

  return (
    <>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <p>Score: {score}</p>
    </>
  )
}
```


## Updating objects in state

You shouldn’t change objects and arrays that you hold in the React state directly.

Instead, when you want to update an object and array, you need to create a new one (or make a copy of an existing one), and then update the state to use that copy.

```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  // ...
}
```

If your state is deeply nested, you can use a library like `Immer` to reduce nested spreads:

```jsx
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  // ...
}
```

> [!INFO]
> The `draft` provided by Immer is a special type of object, called a [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), that “records” what you do with it. Immer figures out which parts of the `draft` have been changed, and produces a completely new object that contains your edits.


## Updating arrays in state

If your array is a list of objects, you shouldn't mutate the object directly, but replace it with the new object contain the changes (similar to Updating objects in state).

```jsx
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, setList] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen };
      } else {
        return artwork;
      }
    }));
  }

  // ..
}
```

With `Immer`:

```jsx
import { useImmer } from 'use-immer';

export default function BucketList() {
  const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  // ...
}
```


## Principles for structuring state

1. **Group related state**. If you always update two or more state variables at the same time, consider merging them into a single state variable.
1. **Avoid contradictions** in state. When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.
1. **Avoid redundant** state. If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
1. **Avoid duplication** in state. When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.
1. **Avoid deeply nested state**. Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.


## Controlled and uncontrolled components 

Controlled and uncontrolled components refer to how form elements (like `<input>`, `<textarea>`, and `<select>`) manage their state.

**Controlled Components**:
- React is in charge of the component's state.
- The form element’s value is tied to React state via `useState` or similar.
- You update the value using `onChange` handlers.

```jsx
const [name, setName] = useState("");

<input value={name} onChange={e => setName(e.target.value)} />
```

**Uncontrolled Components**:
- DOM is in charge** of the component’s state.
- You access the value using a `ref` instead of React state.

```jsx
const inputRef = useRef();

<input ref={inputRef} />
```

**When to Use What**:
- Use **controlled** components when you need real-time validation, dynamic UI updates, or centralized state.
- Use **uncontrolled** components for simple forms, one-off inputs, or when integrating with non-React libraries.


## Preserving and Resetting State

### State is tied to a position in the render tree

React keeps track of which state belongs to which component based on their place in the UI tree.

If a component is removed from the UI tree, React destroys its state.

Learn more at [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state).


### Same component at the same position preserves state 

React preserves a component's state between renders as long as the same component is rendered at the same position in the UI tree (even if props are different). 


### Different components at the same position reset state 

When you render a different component in the same position, it resets the state of its entire subtree.

As a rule of thumb, **if you want to preserve the state between re-renders, the structure of your tree needs to “match up”**


### Resetting state

React lets you force a component at the same position to reset its state by passing it a different `key`:

```jsx
const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <Chat key={to.email} contact={to} />
    </div>
  )
}
```

Resetting state with a `key` is particularly useful when dealing with forms.


## References

- https://react.dev/learn/queueing-a-series-of-state-updates
- https://react.dev/learn/updating-objects-in-state
- https://react.dev/learn/updating-arrays-in-state
- https://react.dev/learn/preserving-and-resetting-state
# Event Handlers

Event handlers are functions that will be triggered in response to user interactions (clicking, hovering, focusing on form inputs, etc.).

## Adding event handlers

By convention, it is common to name event handlers as `handle` followed by the event name (`handleClick`, `handleMouseEnter`, etc.).

```jsx
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```


## Naming event handler props

By convention, when a prop is an event handler, its name should start with `on`, followed by a capital letter.

```jsx
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}
```

## Event propagation

Event handlers will also catch events from children components. 

```jsx
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
```

If you click on either button, its `onClick` will run first, followed by the parent `<div>`’s `onClick`. So two messages will appear. If you click the toolbar itself, only the parent `<div>`’s `onClick` will run.


## Stopping propagation

If you want to prevent an event from reaching parent components, you need to call `stopPropagation()` on the event object passed to the handler as an argument.

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

## Preventing default behavior

Some browser events have default behavior associated with them. 

*For example, the `submit` event on a `<form>` element will reload the page by default.*

You can call `e.preventDefault()` on the event object to stop this from happening:

```jsx
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```


## References

- [Adding Interactivity](https://react.dev/learn/adding-interactivity)
- [Responding to Events](https://react.dev/learn/responding-to-events)
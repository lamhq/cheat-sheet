# Describing the UI

## Rendering Lists

You will often want to display multiple similar components from a collection of data.

For each array item, you will need to specify a `key`. Keys let React keep track of each item’s place in the list even if the list changes.

Rules of keys:
- Keys must be unique among siblings.
- Keys must not change. Do not generate keys on the fly, e.g. with `key={Math.random()}`

```jsx
const listItems = people.map(person =>
  <li key={person.id}>
    <img
      src={getImageUrl(person)}
      alt={person.name}
    />
    <p>
      <b>{person.name}:</b>
      {' ' + person.profession + ' '}
      known for {person.accomplishment}
    </p>
  </li>
);
```

> [!NOTE]
> React needs keys to uniquely identify items in a list (like filenames in a folder). Without them, reordering or deleting items would confuse React. Keys help track items reliably, even when their position changes.


## Keeping Components Pure

React's rendering process must always be pure. Components should only return their JSX, and not change any objects or variables that existed before rendering.

A pure function:
- It does not change any objects or variables that existed before it was called.
- Same inputs, same output. The components you write must always return the same JSX given the same inputs.


## Side Effects: (un)intended consequences 

Side effects are operations that affect something outside the scope of the component rendering process.

Examples:
- Starting an animation
- Changing the data
- Fetching data from an API
- Subscribing to a data stream or event
- Setting up timers or intervals
- Manually updating the DOM
- Logging or analytics
- Saving data to local storage

Side effects should go in event handlers (functions triggered by user actions, like clicking a button).

If no suitable handler exists, use `useEffect` to run the side effect after rendering, but it should be the last resort.
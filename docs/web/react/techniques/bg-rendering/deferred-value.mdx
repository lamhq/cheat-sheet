# Deferred Value

## Overview

`useDeferredValue` is a React Hook that lets you defer updating a part of the UI.

```js
const deferredValue = useDeferredValue(value, initialValue?)
```

**Parameters**:
- `value`: The current value you want to defer. It can be of any type.
- `initialValue` *(optional)*: A fallback value used during the initial render. If omitted, `useDeferredValue` will not defer on the first render since there's no previous previous version of `value`.

**Returns**:
- **Initial render**:
  - Returns `initialValue` if provided, otherwise returns `value` directly.
- **Subsequent renders** (when `value` is changed):
  - Returns the previous version of `value` (UI stays the same).
  - The UI with the current `value` is rendered in the background, and replace the existing when done.


## How it work?

1. You have a UI that renders content based on a `value`.
2. When `value` changes, the UI re-renders to reflect the new content.
3. If rendering is slow, this can cause noticeable lag or block user interactions.
4. `useDeferredValue` is used to track a value, when the value changes, it tells React to render the new UI with the updated value in the background.
5. You render the old UI with the deferred value return from `useDeferredValue` until the new UI is ready.

```jsx
import { useDeferredValue } from 'react';

function SearchView({ query }) {
  const deferredQuery = useDeferredValue(query);
  return <SearchResults query={deferredQuery} />;
}
```


## Caveats

- The values you pass to `useDeferredValue` should either be primitive values (like strings and numbers) or objects created outside of rendering.
- The background re-render is interruptible: if there's another update to the `value`, React will restart the background re-render from scratch.
- `useDeferredValue` does not prevent extra network requests (like throttling or debouncing). What’s being deferred here is displaying results (until they’re ready).


## Usage

### Search as you type

A common use case for `useDeferredValue` is implementing a "search-as-you-type" feature, where the UI updates in response to user input.

1. The search query is tracked using `useDeferredValue`.
2. Search results are rendered based on the deferred version of the query.
3. When the user types, instead of immediately replacing the results with a loading spinner, the UI continues displaying the previous results.
4. React updates the results in the background, and the UI transitions smoothly once the new data is ready.
5. This approach enhances user experience by reducing visual jank and avoiding layout shifts during rapid input.

```jsx
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

The code example can be found [here](https://react.dev/reference/react/useDeferredValue#showing-stale-content-while-fresh-content-is-loading).

In addition, to indicate the result is still loading (it means the result list does not match the latest query), you can add a visual indication:

```jsx
<div style={{
  opacity: query !== deferredQuery ? 0.5 : 1,
}}>
  <SearchResults query={deferredQuery} />
</div>
```


### Deferring re-rendering for a part of the UI

When a part of your UI is slow to re-render, you can offload its update to the background to avoid blocking the rest of the interface.

1. The slow-rendering component depends on a changing `value`.
2. Instead of using `value` directly, you pass it through `useDeferredValue` and render the component based on the deferred version.
3. When `value` changes, `useDeferredValue` temporarily holds the previous value, allowing the UI to stay responsive while React renders the updated component in the background.

```jsx
function App() {
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={text} />
    </>
  );
}
```

The code example can be found [here](https://react.dev/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui).
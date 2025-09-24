# Context

## Prop drilling

Passing props explicitly pipe data through your UI tree to the components that use it.

But passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop.

![](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpassing_data_prop_drilling.dark.png&w=1920&q=75)

## Context

React’s context feature allow passing data from a component to any components in the tree below it, without passing props.

```js title="ThemeContext.js"
import { createContext } from 'react';

export const ThemeContext = createContext();
```

```js title="App.js"
import { ThemeContext } from './ThemeContext.js';

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  );
}
```

```js title="Form.js"
import { ThemeContext } from './ThemeContext.js';
import { useContext } from 'react';

function Form() {
  const theme = useContext(ThemeContext);
  return (
    <p>
      Current theme: {theme}
    </p>
  );
}
```


## Use cases

- **Theming**: If your app lets the user change its appearance (e.g. dark mode), you can put a context provider at the top of your app, and use that context in components that need to adjust their visual look.
- **Current account**: Many components might need to know the currently logged in user. Putting it in context makes it convenient to read it anywhere in the tree. Some apps also let you operate multiple accounts at the same time (e.g. to leave a comment as a different user). In those cases, it can be convenient to wrap a part of the UI into a nested provider with a different current account value.
- **Routing**: Most routing solutions use context internally to hold the current route. This is how every link “knows” whether it’s active or not. If you build your own router, you might want to do it too.
- **Managing state**: As your app grows, you might end up with a lot of state closer to the top of your app. Many distant components below may want to change it. It is common to use a reducer together with context to manage complex state and pass it down to distant components without too much hassle.
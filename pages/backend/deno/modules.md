# Using Modules

## Importing remote modules

The [Standard library](https://deno.land/std@0.219.0) and most third-party modules are distributed on HTTPS URLs.

```ts
import { assertEquals } from "https://deno.land/std@0.219.0/assert/mod.ts";

Deno.test("sayHello function", () => {
  const grace: Person = {
    lastName: "Hopper",
    firstName: "Grace",
  };

  assertEquals("Hello, Grace!", sayHello(grace));
});
```


## Using Node.js APIs and npm packages

You can use Node and npm modules in your code by using either `node:` or `npm:` specifier when importing Node built-ins or npm modules:

```ts
import express from "npm:express@4";

const app = express();

app.get("/", (request, response) => {
  response.send("Hello from Express!");
});

app.listen(3000);
```

```ts
import { readFileSync } from "node:fs";

console.log(readFileSync("deno.json", { encoding: "utf8" }));
```


## Standard Library

Deno provides a set of [standard modules](https://deno.land/std@0.220.1?doc=) that are audited by the core team.

Standard library is not yet stable.

We strongly suggest to always use imports with pinned version of standard library to avoid unintended changes:

```ts
// imports from v0.220.0 of std, never changes
import { copy } from "https://deno.land/std@0.220.0/fs/copy.ts";
```


## Import maps

Node and npm use `package.json` and the `node_modules` folder to resolve package location. 

Deno use Import maps:

```json filename="deno.json"
{
  "imports": {
    "lodash": "https://esm.sh/lodash@4.17.21"
  }
}
```

### Define Import maps for NPM modules
```json filename="deno.json"
{
  "imports": {
    "lodash": "npm:lodash@^4.17"
  }
}
```

```ts
import lodash from "lodash";
```

### Using project root for absolute imports
```json filename="deno.json"
{
  "imports": {
    "/": "./",
    "./": "./"
  }
}
```

```tsx
import { MyUtil } from "/util.ts";
```

### Overriding imports

For more details, see the [official doc](https://docs.deno.com/runtime/manual/basics/import_maps#overriding-imports).

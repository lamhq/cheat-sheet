# Configure your project

Configuration file is named `deno.json` or `deno.jsonc`

## `tasks`

Similar to `package.json`'s `script` field. Essentially shortcuts for command line invocations:
```json
{
  "tasks": {
    "start": "deno run -A --watch=static/,routes/,data/ dev.ts"
  }
}
```


## `imports` (import map)

You can use configuration file to configure an import map, which will let you set up aliases for frequently used modules:

```json filename="deno.jsonc"
{
  "imports": {
    // The dollar sign in front of "std" isn't special - it's an optional
    // convention to show that $std is an alias set up in an import map
    "$std/": "https://deno.land/std@0.219.0/"
  }
}
```

Change your code to use import alias:
```ts
import { assertEquals } from "$std/assert/mod.ts";

Deno.test("sayHello function", () => {
  const grace: Person = {
    lastName: "Hopper",
    firstName: "Grace",
  };

  assertEquals("Hello, Grace!", sayHello(grace));
});
```


## `lint`

Configuration for [`deno lint`](https://docs.deno.com/runtime/manual/tools/linter).

```json
{
  "lint": {
    "include": ["src/"],
    "exclude": ["src/testdata/", "src/fixtures/**/*.ts"],
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  }
}
```

## `fmt`

Configuration for [`deno fmt`](../tools/formatter.md)

```json
{
  "fmt": {
    "useTabs": true,
    "lineWidth": 80,
    "indentWidth": 4,
    "semiColons": true,
    "singleQuote": true,
    "proseWrap": "preserve",
    "include": ["src/"],
    "exclude": ["src/testdata/", "src/fixtures/**/*.ts"]
  }
}
```


## `nodeModulesDir`

Used to enable or disable the `node_modules` directory when using npm packages.


## Example configuration file

```json
{
  "compilerOptions": {
    "allowJs": true,
    "lib": ["deno.window"],
    "strict": true
  },
  "lint": {
    "include": ["src/"],
    "exclude": ["src/testdata/", "src/fixtures/**/*.ts"],
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  },
  "fmt": {
    "useTabs": true,
    "lineWidth": 80,
    "indentWidth": 4,
    "semiColons": false,
    "singleQuote": true,
    "proseWrap": "preserve",
    "include": ["src/"],
    "exclude": ["src/testdata/", "src/fixtures/**/*.ts"]
  },
  "lock": false,
  "nodeModulesDir": true,
  "unstable": ["webgpu"],
  "npmRegistry": "https://mycompany.net/artifactory/api/npm/virtual-npm",
  "test": {
    "include": ["src/"],
    "exclude": ["src/testdata/", "src/fixtures/**/*.ts"]
  },
  "tasks": {
    "start": "deno run --allow-read main.ts"
  },
  "imports": {
    "oak": "https://deno.land/x/oak@v12.4.0/mod.ts"
  },
  "exclude": [
    "dist/"
  ]
}
```

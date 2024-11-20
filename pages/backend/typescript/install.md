# Installation

## Install TypeScript

Install TypeScript and type definitions for Node.js project:

```sh npm2yarn
npm i -D typescript @types/node
```


## Configuration

Install a [predefined config](https://github.com/tsconfig/bases) from the community for your runtime environment:
```shell npm2yarn
npm install --save-dev @tsconfig/node20
```

Update your `tsconfig.json` to extend the installed config:
```json
{
  // Inherits the settings tailored for Node.js v20
  "extends": "@tsconfig/node20/tsconfig.json",

  // your config goes here
  "compilerOptions": {
    "strictNullChecks": true,  // Ensures strict handling of null and undefined
    "strictBindCallApply": true,  // Checks correctness of arguments passed to call, apply, and bind
    "strictFunctionTypes": true,  // Ensures function parameters are more strictly checked
    "strictPropertyInitialization": true,  // Makes sure class properties are correctly initialized
    "noImplicitAny": true,  // Requires explicit type declarations
    "noImplicitThis": true,  // Disallows `this` keyword with an implicit `any` type
    "alwaysStrict": true,  // Ensures `use strict` is always used
    "noUnusedLocals": true,  // Reports unused local variables
    "noUnusedParameters": true,  // Reports unused function parameters
    "noImplicitReturns": true,  // Ensures all code paths in a function return a value
    "noFallthroughCasesInSwitch": true,  // Checks for fallthrough cases in switch statements
    "forceConsistentCasingInFileNames": true,  // Ensures consistent casing in file names
    "resolveJsonModule": true,  // Allows importing JSON modules
  },
  "include": ["src"]
}
```


## Running code

First, compile TypeScript code to JavaScript:
```shell
npx tsc example.ts
```

Run JavaScript with Node.js:

```shell
node example.js
```
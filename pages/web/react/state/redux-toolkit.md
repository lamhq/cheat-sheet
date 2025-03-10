# Redux Toolkit

## Overview

Redux Toolkit aims to address common concerns about Redux:
- complicated store configuration
- the need for many packages
- excessive boilerplate code

`@reduxjs/toolkit` wraps around the core `redux` package and contains essential APIs for building Redux apps.

Redux Toolkit also includes a powerful data fetching and caching capability: RTK Query.


## Installation

### New project

Use Redux Toolkit + TS template for **Vite**:
```sh
# Vite with our Redux+TS template
# (using the `degit` tool to clone and extract the template)
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

Use Next's `with-redux` template:
```sh
# Next.js using the `with-redux` template
npx create-next-app --example with-redux my-app
```


### Existing project

Install for React app:
```sh npm2yarn
npm install @reduxjs/toolkit react-redux
```

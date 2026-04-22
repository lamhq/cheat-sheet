---
agent: agent
model: Raptor mini (Preview) (copilot)
description: Create concise learning note for a web page
---

use the `fetch_webpage` tool to get the content from the provided URL.

write a concise guide based on the fetched content, include summaries and code snippets if there are any.

## When to use this prompt

Use this prompt when you want to take notes on a technical document, such as a blog post, tutorial, or documentation page.

This can help you quickly capture the key points, reduce time spent on reading the entire document, and avoid copying content from the source.

This prompt rewrites the content in the documentation format used by Rspress, which is more intuitive and readable.

## Code Snippets

Code snippets in the guide must follow the format:

```{language} title="{file-name}"
{code}
```

where:
- `{language}` is the programming language of the code snippet (e.g., `ts` for TypeScript, `js` for JavaScript, `py` for Python, etc.).
- `{file-name}` is the name of the file that the code snippet belongs to

## NPM Commands

If the guide uses npm commands to install packages:
- add this line to the top of the guide: `import { PackageManagerTabs } from '@theme'`
- use the following syntax to specify the package manager instead of writing the command directly:
```tsx
<PackageManagerTabs command="{the-command-without-package-manager}" />
```

For each package in the install command (`<PackageManagerTabs command="..." />`), read the npm registry to find the latest version and add the version constraint (`@^{latest-version}`) to the command. *For example, if the command is `npm install --save-dev eslint-plugin-jest`, you should read the npm registry to find the latest version of `eslint-plugin-jest` and update the command to `npm install --save-dev eslint-plugin-jest@^{latest-version}`*.

---
agent: agent
model: Claude Haiku 4.5 (copilot)
tools: ['web']
description: Write Tool Guide from provided URLs. For example, install and configure Jest, ESLint, Prettier, etc.
---

Use the `fetch_webpage` tool to read URLs provided by the user.

From the content of those URLs, write a guide with step‑by‑step instructions on how to install, configure, and use the referenced software or tools.

Limit the guide’s scope to TypeScript, Node.js, NestJS, Postgres, MongoDB, React, Next.js, PNPM, PNPM Workspace, GitHub Actions, ESLint (flat config format), VS Code.

If the guide use npm commands to install packages:
- add this line to the top of the guide: `import { PackageManagerTabs } from '@theme'`
- use the following syntax to specify the package manager instead of writing the command directly:
```tsx
<PackageManagerTabs command="{the-command-without-package-manager}" />
```

For each package in the install command (`<PackageManagerTabs command="..." />`), read the npm registry to find the latest version and add the version constraint (`@^{latest-version}`) to the command. *For example, if the command is `npm install --save-dev eslint-plugin-jest`, you should read the npm registry to find the latest version of `eslint-plugin-jest` and update the command to `npm install --save-dev eslint-plugin-jest@^{latest-version}`*.

For code snippets, specify file name using the following syntax:
```{language} title="{file-name}"
{code}
```

Include a **References** section at the end of the guide with the original URLs for further reading.

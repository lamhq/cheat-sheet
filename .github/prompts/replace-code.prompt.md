---
agent: agent
model: Raptor mini (Preview) (copilot)
tools: [vscode, read, edit, search, web, execute]
description: Replace GitHub links with the fetched source code.
---

Steps:
1. Read the current opening file.
2. Find all GitHub links in the file.
3. Use the `web` tool to fetch the source code from the link (for GitHub, replace "github.com" with "raw.githubusercontent.com" and remove "/blob").
4. Skip if content is not code.
5. Wrap code in a markdown block with language and filename (e.g., ```ts title="filename.ts"\n{code}\n```).
6. Add the code below the link in the file.

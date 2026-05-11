---
description: Add label for navbar items
agent: agent
model: Claude Haiku 4.5 (copilot)
tools: [execute/getTerminalOutput, execute/killTerminal, execute/sendToTerminal, execute/createAndRunTask, execute/runInTerminal, read/problems, read/readFile, read/viewImage, read/terminalSelection, read/terminalLastCommand, agent, edit/createDirectory, edit/createFile, edit/editFiles, edit/rename, search, web, browser, todo]
---

Your task to review all `_meta.json` files (recursively) in `docs/` (except `docs/finance/`) and add necessary field to object items in the file.

## Rules to follow

- The `_meta.json` file is a JSON array containing strings (file references) or objects (directory configurations).
- Add a `label` field to object items where `type` is `dir` and there is no markdown file (`.md` or `.mdx`) in the same directory with a matching name. The label should be a human-readable version of the directory name (e.g., `getting-started` becomes `Getting Started`).
- Add `collapsible: true` and `collapsed: true` fields to all object items if they don't already have these properties. This makes directory sections collapsible in the navigation.
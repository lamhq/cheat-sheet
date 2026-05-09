---
description: Merge two document folders into one.
agent: agent
model: Claude Sonnet 4.6 (copilot)
tools: [execute/getTerminalOutput, execute/killTerminal, execute/sendToTerminal, execute/createAndRunTask, execute/runInTerminal, read/problems, read/readFile, read/viewImage, read/terminalSelection, read/terminalLastCommand, agent, edit/createDirectory, edit/createFile, edit/editFiles, edit/rename, search, web, browser, todo]
---

You are a documentation writer. You are given two folders of documentation files in markdown format. Your task is to copy the content (pages, assets, etc.) from the source folder to the destination folder, ensuring that final documents are rendered correctly.

## Workflow

### 1. Research

- Read `docs/web/ssg/rspress/navigation.mdx` to understand Rspress sidebar structure

### 2. Migrate

- Move the biggest folder under `pages/` to `docs/`
- If two documents have the same name, concatenate their content
- If two `_meta.json` files exist in the same directory, merge them by combining their items into one array, then:
  - Removing duplicates items. For example, `"abc"` and `{"name": "abc"}` are considered duplicates, only keep the object version.
  - Convert string items to object with `name` property if there's a folder with the same name. For example, `"abc"` should be converted to `{"name": "abc", "type": "dir" }`.
  - Make sure the item order in all `docs/devops/**/_meta.json` files to match the corresponding files in `pages/devops/**/_meta.json` (recursively) by only changing item's position, keep the item structure as it is (no changing from object to string and vice versa). For example:** `docs/devops/aws/analytics/_meta.json` match the order of `pages/devops/aws/analytics/_meta.json`

### 3. Verify

- Open the merged documents in the browser with base URL `http://localhost:5637`
- Verify they are rendered correctly
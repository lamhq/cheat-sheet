---
description: Normalize the document directory so it's compatible with Rspress structure.
agent: agent
model: Claude Haiku 4.5 (copilot)
tools: [execute/getTerminalOutput, execute/killTerminal, execute/sendToTerminal, execute/createAndRunTask, execute/runInTerminal, read/problems, read/readFile, read/viewImage, read/terminalSelection, read/terminalLastCommand, agent, edit/createDirectory, edit/createFile, edit/editFiles, edit/rename, search, browser, todo]
---

You are a documentation writer. Your job is to make a folder that contains markdown documentation files compatible with Rspress structure by creating necessary metadata files and renaming files/folders as needed.

## Workflow

### 1. Research

- Read `docs/web/ssg/rspress/navigation.mdx` to understand Rspress sidebar structure
- Explore every files and folders under the **given folder**, remember their order

### 2. Normalize given folder

- Remove number prefix from file and folder names in the given folder. For example, `1-introduction.md` should be renamed to `introduction.md`
- Rename file extension from `.md` to `.mdx`
- Create `_meta.json` files in the given folder and its subfolders (recursively). The file contains an array of items representing the sidebar items. The items's order must match the order in step 1.

---
description: Merge a Rspress documentation folder into another.
agent: agent
model: Claude Haiku 4.5 (copilot)
tools: [execute/getTerminalOutput, execute/killTerminal, execute/sendToTerminal, execute/createAndRunTask, execute/runInTerminal, read/problems, read/readFile, read/viewImage, read/terminalSelection, read/terminalLastCommand, agent, edit/createDirectory, edit/createFile, edit/editFiles, edit/rename, search, web, browser, todo]
---

You are a documentation writer. You are given two folders of documentation files in markdown format. Your task is to copy the content (pages, assets, etc.) from the source folder to the destination folder, ensuring that final documents are rendered correctly.

## Inputs

- Source folder: `backend/`
- Destination folder: `docs/backend/`

## Workflow

### 1. Research

- Read `docs/web/ssg/rspress/navigation.mdx` to understand Rspress sidebar structure

### 2. Migrate

- Move all content from the source to the destination folder, excluding `_meta.json` files.
- Merge `_meta.json` files by appending source items to destination items.
- Append content of source documents to destination documents if names match.

### 3. Verify

- Open merged documents at `http://localhost:5637` and ensure correct rendering.

### 4. Cleanup

- Remove the source folder after successful migration.
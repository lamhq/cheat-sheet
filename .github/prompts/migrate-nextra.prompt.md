---
description: Migrate Nextra docs to Rspress
agent: agent
model: Claude Haiku 4.5 (copilot)
tools: [execute/getTerminalOutput, execute/killTerminal, execute/sendToTerminal, execute/createAndRunTask, execute/runInTerminal, read/problems, read/readFile, read/viewImage, read/terminalSelection, read/terminalLastCommand, agent, edit/createDirectory, edit/createFile, edit/editFiles, edit/rename, search, web, browser, todo]
---

## Workflow

1. **Research**:
   - To understand Nextra `_meta.json` file structure, read:
      - `docs/web/ssg/nextra/2-guide/1-organize-files.md`
      - `docs/web/ssg/nextra/4-docs/2-page-config.md`
   - To know syntax of Nextra pages, read:
      - `docs/web/ssg/nextra/2-guide/3-syntax-highlighting.md`
      - `docs/web/ssg/nextra/2-guide/6-npmyarn.md`
      - `docs/web/ssg/nextra/3-components/1-callout.md`
      - `docs/web/ssg/nextra/3-components/5-file-tree.md`
   - To understand Rspress `_meta.json` file structure, read:
      - `docs/web/ssg/rspress/navigation.mdx`
   - To know syntax of Rspress pages, read:
      - `docs/web/ssg/rspress/syntax.mdx`
      - `docs/web/ssg/rspress/ui-components.mdx`

2. **Review current Nextra docs**:
   - Review all Nextra pages (`.md` files) in the `pages/` directory (recursively).
   - List all the syntax/components in each file that needs to be changed to Rspress format.

3. **Migrate**:
   - Update the content of all `_meta.json` files to match Rspress format (recursively):
      - file content should be a json array of object or string instead of a json object.
   - Rename all `.md` files to `.mdx` (recursively).
   - Update the syntax in all pages to match Rspress format:
      - use `title="..."` instead of `filename="..."` in code blocks

4. **Validate**: With each page in `pages/`:
    - Open it in the browser with base URL `http://localhost:5637/`
    - Ensure the page renders correctly without any errors.
---
agent: agent
model: Claude Sonnet 4.6 (copilot)
description: Migrate Rspress pages from v1 to v2
tools: [execute, read/problems, read/readFile, read/viewImage, read/terminalSelection, read/terminalLastCommand, agent, edit/createDirectory, edit/createFile, edit/editFiles, edit/rename, search, web/fetch, browser, todo]
---

## Workflow

1. **Migrate pages incrementally**
   - Move (not copy) the biggest directory under `docs/` to `docs2/`
   - Add an item that corresponds to the moved directory to `docs2/_nav.json` to add an item to the top navigation bar of the documentation website (also remove it from `docs/_meta.json`).
   - For `_meta.json` files, make sure every object item has a `"type"` field, either `"file"` or `"dir"` depending on whether it maps to a `.mdx` file or a folder.
   - For each `*.mdx` file in the moved directory (recursively):
      - Replace Meta line highlight `{n1, n2,...}` with Notation line highlight `// [!code highlight]`
      - Replace GitHub Markdown Alerts syntax `> [!...]` with `:::` syntax


Plain string items like `"yaml"` are fine — only objects need the `"type"` field.

2. **Validate UI**
   - Make sure sidebar items in the two versions are the same.
   - For each migrated page:
      - Open the page in browser with base URL: `http://localhost:3000/`
      - Ensure the page looks the same as the v1 version at `https://c.lamhq.com/`.

3. **Validate Build**
   - Run build command `npm run build`.
   - Fix any warnings or errors that appear in the new version. If errors or warnings occur, please refer to the [Official Upgrade Guide](https://rspress.rs/guide/migration/rspress-1-x) and first check if it's caused by any omitted or incomplete migration steps.

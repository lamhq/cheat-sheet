# Navigation Sync Rules

This section applies when folder structure of `docs/` (including subfolders) is changed.

## Action to take

Update the **navigation config file** to match with the current folder structure.

**Why:** Each entry in the navigation config file points to a specific file or folder. It needs to be synchronized with the actual folder structure to avoid build errors.

## Navigation config file location

1. **If the item is directly under `docs/`**: update `_nav.json` (top navbar).
2. Otherwise, update the `_meta.json` file in the same folder.

## Rules

1. **Creating** a file or folder: add an entry to the **navigation config file**.
2. **Deleting** a file or folder: remove its entry from the **navigation config file**.
3. **Moving** a file or folder:
   - Remove the entry from the **navigation config file** in the old folder.
   - Add an entry to the **navigation config file** in the new folder.
4. **Validate** by ensuring the build command runs successfully.

## Navigation entry format

- A file is a string, such as `"introduction"`, or an object with `"type": "file"`.
- A folder is an object with `"type": "dir"`, `"name"` set to the folder name, and optionally `"label"`, `"collapsible"`, and `"collapsed"`.
- A folder with no matching `.mdx` or `.md` file needs an explicit `"label"`.

See [navigation.mdx](../../../docs/web/rspress/navigation.mdx) for **navigation config file** structure.

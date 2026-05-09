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
- Create `_meta.json` files in the given folder and its subfolders (recursively). The file contains an array of items representing the sidebar items. The items's order must match the order in step 1 (see **Examples** section to know `_meta.json` structure).


## Examples

### Folder containing both files and folders

If a folder contains both file and folder with the same name like below:

```
example/
├── 1-introduction.md
├── 2-getting-started.md
├── 3-advanced-topics/
└── 3-advanced-topics.md
```

The `_meta.json` file under `example/` should be:

```json
[
  "introduction",
  "getting-started",
  {
    "name": "advanced-topics",
    "type": "dir",
    "collapsible": true,
    "collapsed": true
  }
]
```

`3-advanced-topics.md` is excluded because it has the same name as the folder `3-advanced-topics`, and only the folder is kept and converted to a directory item in `_meta.json` file.


### Folder containing only files

If a folder contains only files like below:

```
example/
├── 1-introduction.md
├── 2-getting-started.md
└── 3-advanced-topics.md
```

The `_meta.json` file under `example/` should be:

```json
[
  "introduction",
  "getting-started",
  "advanced-topics"
]
```

### Folder containing folders without files

If a folder contains only folders like below:

```example/
├── 1-introduction/
├── 2-getting-started/
└── 3-advanced-topics/
```

The `_meta.json` file under `example/` should be:

```json
[
  {
    "name": "introduction",
    "label": "Introduction",
    "type": "dir",
    "collapsible": true,
    "collapsed": true
  },
  {
    "name": "getting-started",
    "label": "Getting Started",
    "type": "dir",
    "collapsible": true,
    "collapsed": true
  },
  {
    "name": "advanced-topics",
    "label": "Advanced Topics",
    "type": "dir",
    "collapsible": true,
    "collapsed": true
  }
]
```

The `label` property is added because there's no file with the same name as the folder to determine the label for sidebar item.
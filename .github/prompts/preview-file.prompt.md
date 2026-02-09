---
agent: agent
model: Grok Code Fast 1 (copilot)
description: Open the current file for preview in the browser
---

Base on the currently opening file, modify and run the command below to start the dev server:

```bash
pnpm run dev:{module}
```

Replace `{module}` with the module name extracted from the file path. For example, if the file path is `docs/game/boardgameio/multiplayer.mdx`, the module name is `game`.

Return a link that open the current opening file in the browser.
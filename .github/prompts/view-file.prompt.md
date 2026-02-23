---
agent: agent
model: GPT-4.1 (copilot)
description: Open the current file for preview in the browser
---

Follow these steps, do not do anything else (fixing bugs, waiting for the command to finish, etc.):
1. Get the relative file path of the currently active opening file
2. Split the file path by `/` and get the second segment (named `module`)
3. Run this command in the terminal: `pnpm run dev:{module}` and let it continue in background
4. Get the domain from the terminal output (e.g. `http://localhost:5174`) and return it as the result of this prompt

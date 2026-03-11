---
agent: agent
model: Grok Code Fast 1 (copilot)
tools: ['web']
description: Summarize webpage sections with short description and links
---

Use the `fetch_webpage` tool to retrieve content from the provided URL

For each section (any heading level) in the fetched content, provide a summary line:
- Format: `- {section name}: {description}`
- `{section name}`: Title of the section, linkable to the original webpage section
- `{description}`: Action-based summary, max 100 characters, starting without introduction

Wrap symbols and code-related terms with backticks
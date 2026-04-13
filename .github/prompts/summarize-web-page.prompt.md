---
agent: agent
model: Raptor mini (Preview) (copilot)
description: Summarize all sections in a web page
---

Use the `fetch_webpage` tool to retrieve content from the provided URL.

For each section (any heading level) in the fetched content, provide a summary line with format: `- {name}: {description}`, where:
- `{name}`: Title of the section, linkable to the original web page section
- `{description}`: Action-based summary, max 100 characters, starting without introduction. Wrap symbols and code-related terms with backticks.


## When to use this prompt

Use this prompt when you want to quickly get an overview of the content in a web page, especially long articles with multiple sections.

This can help you decide which sections are relevant to your needs and provide references to the original web page for further reading.

---
agent: agent
model: Raptor mini (Preview) (copilot)
description: Read a technical document and summarize the key points, including code snippets
---

use the `fetch_webpage` tool to get the content from the provided URL.

write a concise guide based on the fetched content, include summaries and code snippets if there are any.

## When to use this prompt

Use this prompt when you want to take notes on a technical document, such as a blog post, tutorial, or documentation page.

This can help you quickly capture the key points, reduce time spent on reading the entire document, and avoid copying content from the source.

## Code Snippets

Code snippets in the guide must follow the format:

```{language} title="{file-name}"
{code}
```

where:
- `{language}` is the programming language of the code snippet (e.g., `ts` for TypeScript, `js` for JavaScript, `py` for Python, etc.).
- `{file-name}` is the name of the file that the code snippet belongs to

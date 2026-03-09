---
agent: agent
model: Grok Code Fast 1 (copilot)
description: Extract all code snippets in a webpage
---

replace `github.com` with `raw.githubusercontent.com` in the provided URL and use the `fetch_webpage` tool to get the content from the replaced URL.

for each section (any heading level) in the fetched content:
- output the section name as a header
- output key points in the section in bullet points
- for each code blocks in the section:
  - output a brief description of what the code does (starting with an action, without introduction, wrap symbols and code-related terms with backticks, end with a colon)
  - output the code in format ```{language} title="{filename}"\n{code}\n```
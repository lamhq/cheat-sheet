---
agent: agent
model: Grok Code Fast 1 (copilot)
tools: ['web']
description: Read a webpage by extracting key sections and providing brief descriptions for each.
---
use the fetch_webpage tool to get content of provided URL

for each section (any heading level) in the fetched content, give a section name (linkable to the original section in the web page) and a sentence that describe the section (start with an action, do not introduce)

wrap symbols and code-related terms with backticks
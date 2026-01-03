---
agent: agent
model: Grok Code Fast 1 (copilot)
tools: ['web']
description: Read a webpage by extracting key sections and providing brief descriptions for each.
---
use the fetch_webpage tool to get the content of the provided URL

for each section (any heading level) in the fetched content, give a line:
- with the following format: `- {section name}: {description}`
- where {section name} is the title of the section, linkable to the original section in the web page
- {description} describes the section, starting with an action, without introduction, maximum 100 characters

wrap symbols and code-related terms with backticks
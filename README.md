# Learning Cheat sheet

## Overview

This repository contains my code snippets and learning notes.

I use it as a reference to quickly review my knowledge, which saves me a lot of time compared to searching on the internet.

You can view the live website at: [https://c.lamhq.com](https://c.lamhq.com)


## Installation

Clone the repository:

```bash
git clone https://github.com/lamhq/cheat-sheet.git
```

Navigate into the project directory:

```bash
cd cheat-sheet
```

Install dependencies:

```bash
pnpm install
```


## Running the Project

Start the development server:

```bash
npm run dev
```

Then open http://localhost:5002

**Use VS Code launch config**:

A launch config is available in `.vscode/launch.json`.

You can start it from the Run and Debug panel to run `npm run dev` in the integrated terminal.


## Deployment

The website is automatically deployed to Github Pages on every code change using a GitHub Action defined in `.github/workflows/deploy-github-pages.yml`.

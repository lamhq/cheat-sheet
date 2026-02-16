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

### Using command line

Start the dev server:

```bash
npm run dev
```

Then open http://localhost:5007

Since starting the whole project take a bit of time, you can also start only the part you want to work on. For example, to start only the game cheatsheet:

```bash
npm run dev:game
```

## Using GitHub Copilot

1. Open the documentation file you want to view in Visual Studio Code
2. In the Chat view, enter custom prompt: `/preview-view`
3. It will start the dev server for you and provide a link to view the documentation in your browser.


## Deployment

The website is automatically deployed to Github Pages on every code change using a GitHub Action defined in `.github/workflows/deploy-github-pages.yml`.

# Cheat sheet

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

Then open the URL output in the terminal to view the website in your browser.

### Using VS Code extension

To quickly view the documentation in the browser, you can install the [Cheat Sheet Utils](https://github.com/lamhq/cheat-sheet-utils) extension. It will start the dev server and open the correct url for the current opening markdown file.


## Deployment

The website is automatically deployed to Github Pages on every code change using a GitHub Action defined in `.github/workflows/deploy-github-pages.yml`.

import 'dotenv/config';
import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { transformerNotationHighlight } from '@shikijs/transformers';
import katex from 'rspress-plugin-katex';
import mermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  title: "Albert's Cheat sheet",
  root: path.join(__dirname, 'docs'),
  icon: '/logo.svg',
  logo: '/logo.svg',
  llms: true,
  themeConfig: {
    lastUpdated: true,
    enableScrollToTop: true,
    editLink: {
      docRepoBaseUrl: process.env.REPO_BASE ?? '',
    },
  },
  markdown: {
    shiki: {
      transformers: [transformerNotationHighlight()],
    },
  },
  // enable math syntax
  plugins: [katex(), mermaid()],
  // exclude data engineering and finance for fast development startup for now
  route: {
    exclude: ['de/**/*', 'finance/**/*', ],
  },
});
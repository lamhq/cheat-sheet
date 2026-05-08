import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import katex from 'rspress-plugin-katex';
import mermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  title: "Albert's Cheat sheet",
  root: path.join(__dirname, 'docs2'),
  icon: '/logo.svg',
  logo: '/logo.svg',
  themeConfig: {
    lastUpdated: true,
    enableScrollToTop: true,
  },
  // enable math syntax
  plugins: [katex(), mermaid()],
});
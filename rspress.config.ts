import { defineConfig } from 'rspress/config';
import katex from 'rspress-plugin-katex';
import path from 'path';

export default defineConfig({
  root: 'docs',
  title: "Albert's Cheat sheet",
  icon: '/logo.svg',
  logo: '/logo.svg',
  themeConfig: {
    lastUpdated: true,
    enableScrollToTop: true,
  },

  // enable math syntax
  plugins: [katex()],

  // add custom styles
  globalStyles: path.join(__dirname, 'assets/styles.css'),
});
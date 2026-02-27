import * as path from 'node:path';
import { defineConfig, UserConfig } from 'rspress/config';
import katex from 'rspress-plugin-katex';
import mermaid from 'rspress-plugin-mermaid';

const projectRoot = __dirname;
const docRoot = path.join(projectRoot, 'docs');
const baseConfig: UserConfig = {
  title: "Albert's Cheat sheet",
  root: docRoot,
  icon: '/logo.svg',
  logo: '/logo.svg',
  themeConfig: {
    lastUpdated: true,
    enableScrollToTop: true,
  },

  // enable math syntax
  plugins: [katex(), mermaid()],

  // add custom styles
  globalStyles: path.join(projectRoot, 'assets', 'styles.css'),
};

// Used by Cheat Sheet Utils extension to create custom config for previewing
export function createConfig(config?: UserConfig) {
  return defineConfig({
    ...baseConfig,
    ...config,
  });
}

export default defineConfig(baseConfig);
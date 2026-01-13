import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import katex from 'rspress-plugin-katex';

const projectRoot = path.join(__dirname, '..');
const docRoot = path.join(projectRoot, 'docs');
const baseConfig = {
  title: "Albert's Cheat sheet",
  root: docRoot,
  icon: '/logo.svg',
  logo: '/logo.svg',
  themeConfig: {
    lastUpdated: true,
    enableScrollToTop: true,
  },

  // enable math syntax
  plugins: [katex()],

  // add custom styles
  globalStyles: path.join(projectRoot, 'assets', 'styles.css'),
};

/**
 * List of all available document sections
 */
export enum DocSection {
  BACKEND = 'backend',
  DE = 'de',
  DEVOPS = 'devops',
  SE = 'se',
  TOOLS = 'tools',
  WEB = 'web',
  ENGLISH = 'english',
}

/**
 * Create a config that optimizes hot reload time
 * for a specific document section
 */
export function createConfig(name: DocSection) {
  const excludedRoutes = Object.entries(DocSection)
    .filter(([_, value]) => value !== name)
    .map(([_, value]) => path.join(docRoot, value, '**'));

  return defineConfig({
    ...baseConfig,
    route: {
      exclude: excludedRoutes,
      include: [path.join(docRoot, name, '**')],
    },
  });
}

export default defineConfig(baseConfig);

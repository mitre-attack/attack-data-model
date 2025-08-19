import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import * as mdx from 'eslint-plugin-mdx';

export default [
  {
    ignores: ['node_modules', 'dist', 'docusaurus'],
  },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,

  // MDX file support (in the documentation)
  {
    files: ['**/*.mdx'],
    processor: mdx.processors.mdx,
  },
  {
    files: ['**/*.{md,mdx}'],
    plugins: {
      mdx,
    },
    rules: {
      'mdx/no-unused-expressions': 'error',
    },
  },
];

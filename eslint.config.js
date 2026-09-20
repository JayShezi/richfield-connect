import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * ESLint Configuration File
 *
 * This configuration sets up linting rules and environment for JavaScript and JSX files.
 * 
 * - Uses ESLint's recommended base rules for general JavaScript (js.configs.recommended).
 * - Adds React Hooks specific linting rules via eslint-plugin-react-hooks.
 * - Integrates react-refresh plugin to support React Fast Refresh with Vite.
 * - Ignores the 'dist' directory globally to avoid linting build outputs.
 * - Enables browser globals and sets parser options to support JSX.
 */
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    '**/node_modules/',
    '**/dist/',
    '**/.expo/',
    'coverage/',
    'mobile/android/',
    'mobile/ios/',
    'mobile/expo-env.d.ts',
    'supabase/',
  ]),
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ['web/**/*.{ts,tsx}', 'mobile/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
  },
  {
    files: ['web/**/*.{ts,tsx}'],
    extends: [reactRefresh.configs.vite],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['mobile/**/*.{ts,tsx}'],
    rules: {
      // Expo loads images and fonts with require()
      '@typescript-eslint/no-require-imports': [
        'error',
        { allow: ['\\.(png|jpe?g|gif|webp|ttf|otf)$'] },
      ],
    },
  },
  {
    files: ['**/*.config.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
  },
  prettier,
]);

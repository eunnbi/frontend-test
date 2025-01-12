import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
/// <reference types="vitest" />

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  define: {
    'process.env': process.env,
  },
  test: {
    setupFiles: './setupTests.ts',
    include: ['src/**/*.test.?(c|m)[jt]s?(x)'],
    css: true,
    pool: 'vmThreads',
    poolOptions: {
      useAtomics: true,
    },
    browser: {
      enabled: true,
      headless: true,
      name: 'chromium',
      provider: 'playwright',
    },
    testTimeout: 3000,
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/**',
        'src/app/page.tsx',
        'src/app/layout.tsx',
        'src/**/*.{test,stories}.?(c|m)[jt]s?(x)',
        'src/test',
      ],
      enabled: true,
    },
  },
});

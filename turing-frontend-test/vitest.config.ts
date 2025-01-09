import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
/// <reference types="vitest" />

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  define: {
    'process.env': process.env,
  },
  test: {
    setupFiles: './setupTests.ts',
    include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
    css: true,
    pool: 'vmThreads',
    poolOptions: {
      useAtomics: true,
    },
    environment: 'happy-dom',
    browser: {
      enabled: true,
      name: 'chromium',
      headless: true,
      provider: 'playwright',
    },
    testTimeout: 3000,
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'src/**/*.{stories,fixture}.{ts,tsx}',
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/app/page.tsx',
        'src/app/layout.tsx',
        'src/app/cosmos',
      ],
      all: true,
      reporter: ['json', 'text', 'html'],
    },
  },
});

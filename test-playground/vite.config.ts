import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  test: {
    coverage: {
      provider: 'istanbul',
      include: ['src/**'],
      exclude: [
        'src/App.tsx',
        'src/main.tsx',
        'src/**/*.{test,stories}.?(c|m)[jt]s?(x)',
      ],
      extension: ['.ts', '.tsx', '.js', '.jsx'],
      enabled: true,
    },
    include: ['src/**/*.test.?(c|m)[jt]s?(x)'],
    globals: true,
    setupFiles: ['./setupTest.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
});

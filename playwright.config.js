import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Tempo máximo por teste
  timeout: 10 * 1000,

  // Tempo máximo para expect()
  expect: {
    timeout: 1000,
  },

  // Paralelismo (seu PC aguenta tranquilo)
  workers: 2,

  use: {
    channel: 'chrome',        // Chrome do sistema
    headless: false,          // visual (true em CI)
    baseURL: 'https://labmakerfsa.vercel.app',
    viewport: { width: 1280, height: 720 },

    // Só gera trace se falhar (não pesa)
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
});

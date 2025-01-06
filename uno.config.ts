import { defineConfig, presetWebFonts } from 'unocss'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter',
        mono: 'JetBrains Mono',
      },
    }),
  ],
  safelist: [
    () => Array.from({ length: 5 }, (_, index) => `grid-cols-${index + 1}`),
    () => ['danger', 'success', 'warning', 'info', 'accent'].map((c) => `bg-${c}`),
    'hover:bg-accent-focus',
    'bg-contrast-1',
    'rounded-full',
  ],
  shortcuts: {
    container: 'm-auto px-5 max-w-screen-lg w-full',
    'bg-accent': 'bg-gradient-to-r from-purple-500 to-orange-500',
    'bg-accent-focus': 'bg-gradient-to-r from-purple-600 to-orange-700',
  },
  theme: {
    colors: {
      text: 'var(--color-text)',
      neutral: 'var(--color-neutral)',
      neutralLight: {
        1: 'var(--color-neutral-light-1)',
        2: 'var(--color-neutral-light-2)',
        3: 'var(--color-neutral-light-3)',
        4: 'var(--color-neutral-light-4)',
      },
      neutralDark: {
        1: 'var(--color-neutral-dark-1)',
        2: 'var(--color-neutral-dark-2)',
        3: 'var(--color-neutral-dark-3)',
        4: 'var(--color-neutral-dark-4)',
      },
      contrast: {
        1: 'var(--color-contrast-1)',
        2: 'var(--color-contrast-2)',
        3: 'var(--color-contrast-3)',
        4: 'var(--color-contrast-4)',
      },
      // accent: 'var(--color-accent)',
      info: 'var(--color-info)',
      warning: 'var(--color-warning)',
      success: 'var(--color-success)',
      danger: 'var(--color-danger)',
    },
  },
})

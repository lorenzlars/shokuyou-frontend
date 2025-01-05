import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  presets: [presetUno()],
  safelist: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5'],
  shortcuts: {
    container: 'm-auto px-5 max-w-screen-lg w-full',
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
      primary: 'var(--color-accent)',
      default: 'var(--gray-100)',
      danger: 'var(--color-danger)',
    },
  },
})

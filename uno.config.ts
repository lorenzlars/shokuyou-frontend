import { defineConfig, presetAttributify, presetWebFonts } from 'unocss'
import presetUno from '@unocss/preset-uno'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

const colors: Record<string, string> = {
  light: 'var(--color-light)',
  dark: 'var(--color-dark)',
  'neutral-1': 'var(--color-neutral-1)',
  'neutral-2': 'var(--color-neutral-2)',
  'neutral-3': 'var(--color-neutral-3)',
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  tertiary: 'var(--color-tertiary)',
  info: 'var(--color-info)',
  warning: 'var(--color-warning)',
  success: 'var(--color-success)',
  danger: 'var(--color-danger)',
}

const generatePropertyDefinitions = (colors: Record<string, string>) => {
  return Object.keys(colors)
    .map(
      (colorKey) => `
        @property ${colors[colorKey].match(/var\((--[a-zA-Z0-9-_]+)\)/)[1]} {
          syntax: '<color>';
          initial-value: transparent;
          inherits: true;
        }
      `,
    )
    .join('\n')
}

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: {
          name: 'Inter',
          weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
          italic: true,
        },
        mono: 'JetBrains Mono',
      },
      processors: createLocalFontProcessor({
        cacheDir: 'node_modules/.cache/unocss/fonts',
        fontAssetsDir: 'public/assets/fonts',
        fontServeBaseUrl: '/assets/fonts',
      }),
    }),
  ],
  preflights: [
    {
      getCSS: () => generatePropertyDefinitions(colors),
    },
  ],
  safelist: [
    () => Array.from({ length: 5 }, (_, index) => `grid-cols-${index + 1}`),
    () => Object.keys(colors).map((color) => `bg-${color}`),
    () => Object.keys(colors).map((color) => `border-${color}`),
    () => Object.keys(colors).map((color) => `text-${color}`),
    () => Object.keys(colors).map((color) => `hover:bg-${color}/80`),
    'rounded-full',
  ],
  shortcuts: {
    container: 'm-auto px-5 max-w-screen-lg w-full',
    'bg-gradient': 'bg-gradient-to-r from-primary to-secondary ',
    'hover:bg-gradient/80': 'hover:bg-gradient-to-r hover:from-primary/80 hover:to-secondary/80',
  },
  theme: {
    colors,
  },
  rules: [
    // Rule to make bg-{color}/{opacity} compatible with css variables
    [
      /^bg-(.+)\/(\d+)$/,
      ([, color, percentage]) => ({
        'background-color': `color-mix(in srgb, var(--color-${color}), transparent ${100 - +percentage}%)`,
      }),
    ],
    // Rules to make gradient colors changeable by opacity
    [
      /^from-(.+)\/(\d+)$/,
      ([, color, percentage]) => ({
        '--un-gradient-from-position': '0%',
        '--un-gradient-from': `color-mix(in srgb, var(--color-${color}), transparent ${100 - +percentage}%)`,
      }),
    ],
    [
      /^to-(.+)\/(\d+)$/,
      ([, color, percentage]) => ({
        '--un-gradient-to-position': '100%',
        '--un-gradient-to': `color-mix(in srgb, var(--color-${color}), transparent ${100 - +percentage}%)`,
      }),
    ],
  ],
})

import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  presets: [presetUno()],
  shortcuts: {
    container: 'm-auto px-5 max-w-screen-lg w-full',
  },
})

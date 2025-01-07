import type { Preview } from '@storybook/vue3'

import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import '@/assets/main.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

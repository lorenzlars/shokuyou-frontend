import type { Preview } from '@storybook/vue3'

import '@unocss/reset/normalize.css'
import '@/assets/main.css'
import 'virtual:uno.css'

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

import type { Preview } from '@storybook/vue3'
import { initialize, mswLoader } from 'msw-storybook-addon'

import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import '@/assets/main.css'

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 */
initialize()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
}

export default preview

import type { Preview } from '@storybook/vue3'
import { initialize, mswDecorator, mswLoader } from 'msw-storybook-addon'

import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import '@/assets/main.css'

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 */
initialize({
  onUnhandledRequest: 'bypass',
})

// setup((app: App) => {
//
// })

const preview: Preview = {
  parameters: {
    docs: {
      toc: true,
    },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [mswDecorator],
}

export default preview

import '@unocss/reset/normalize.css'
import './assets/main.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { AuthPlugin } from '@/domains/auth/plugins/authPlugin.ts'
import { setupI18n } from './i18n'
import { ErrorHandlingPlugin } from '@/domains/errorHandling/plugins/errorHandlingPlugin.ts'
import { client } from '@/api'

client.setConfig({
  baseURL: import.meta.env.VITE_API_URL,
  throwOnError: true,
})

createApp(App)
  .use(setupI18n({ locale: 'en', globalInjection: true }))
  .use(createPinia())
  .use(router)
  .use(AuthPlugin)
  .use(ErrorHandlingPlugin)
  .mount('#app')

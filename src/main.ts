import './assets/main.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AuthPlugin from '@/domains/auth/plugins/authPlugin.ts'
import { setupI18n } from './i18n'

createApp(App)
  .use(setupI18n({ locale: 'en' }))
  .use(createPinia())
  .use(router)
  .use(AuthPlugin)
  .mount('#app')

window.addEventListener('error', function (event) {
  console.error(event)
})

window.addEventListener('unhandledrejection', function (event) {
  console.error(event)
})

// app.config.errorHandler = (err, instance, info) => {
//   console.error(err, instance, info)
// }

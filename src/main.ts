import './assets/main.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AuthPlugin from '@/domains/auth/plugins/authPlugin.ts'

const app = createApp(App)

app.use(createPinia()).use(router).use(AuthPlugin).mount('#app')

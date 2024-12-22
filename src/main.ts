import './assets/main.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { client } from '@/api'

client.setConfig({
  baseURL: import.meta.env.VITE_API_URL,
})

const app = createApp(App)

app.use(createPinia()).use(router).mount('#app')

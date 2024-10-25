
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "~/styles/index.scss";
import "uno.css";
import constants from '@/plugins/constantPlugin.js'

const app = createApp(App)

app.use(createPinia())
app.use(constants)
app.use(router)

app.mount('#app')

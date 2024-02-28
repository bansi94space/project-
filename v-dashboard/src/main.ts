import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import DashboardLayout from './components/DashboardLayout.vue'
const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)

app.use(router)
app.mount('#app')

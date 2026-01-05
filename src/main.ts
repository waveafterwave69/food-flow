import './styles/main.css'
import App from './App.vue'
import { router } from './router/routes'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const myApp = createApp(App)

myApp.use(router)
myApp.use(pinia)
myApp.mount('#app')

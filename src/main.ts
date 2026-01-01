import './styles/main.css'
import App from './App.vue'
import { router } from './router/routes'
import { createApp } from 'vue'

const myApp = createApp(App)

myApp.use(router)
myApp.mount('#app')

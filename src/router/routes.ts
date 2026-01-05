import FoodPage from '@/pages/FoodPage.vue'
import HomePage from '@/pages/HomePage.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    { path: '/', component: HomePage },
    { path: '/food/:id', component: FoodPage },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

import axios from 'axios'

const api = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/',
})

export const apiServices = {
    getFoodByName: async (name: string = 'a') => {
        const response = await api.get(`search.php?s=${name}`)
        return response.data.meals
    },

    getFoodByCategory: async (category: string) => {
        const response = await api.get(`filter.php?c=${category}`)
        return response.data.meals
    },

    getRandomFood: async () => {
        const response = await api.get(`randomselection.php`)
        return response.data.meals
    },
}

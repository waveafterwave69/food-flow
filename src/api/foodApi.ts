import axios from 'axios'

const api = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/',
})

export const apiServices = {
    getFoodByName: async (name: string = 'a') => {
        try {
            const response = await api.get(`search.php?s=${name}`)
            return response.data.meals
        } catch (error) {
            console.log(error)
        }
    },

    getFoodByCategory: async (category: string) => {
        try {
            const response = await api.get(`filter.php?c=${category}`)
            return response.data.meals
        } catch (error) {
            console.log(error)
        }
    },

    getRandomFood: async () => {
        try {
            const response = await api.get(`randomselection.php`)
            return response.data.meals
        } catch (error) {
            console.log(error)
        }
    },

    getFoodInfoById: async (id: string | string[]) => {
        try {
            const response = await api.get(`lookup.php?i=${id}`)
            return response.data.meals
        } catch (error) {
            console.log(error)
        }
    },
}

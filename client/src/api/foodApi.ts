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
            throw new Error(
                `Failed to fetch food by name "${name}": ${error instanceof Error ? error.message : 'Unknown error'}`,
            )
        }
    },

    getFoodByCategory: async (category: string) => {
        try {
            const response = await api.get(`filter.php?c=${category}`)
            return response.data.meals
        } catch (error) {
            throw new Error(
                `Failed to fetch food by category "${category}": ${error instanceof Error ? error.message : 'Unknown error'}`,
            )
        }
    },

    getRandomFood: async () => {
        try {
            const response = await api.get(`randomselection.php`)
            return response.data.meals
        } catch (error) {
            throw new Error(
                `Failed to fetch random food: ${error instanceof Error ? error.message : 'Unknown error'}`,
            )
        }
    },

    getFoodInfoById: async (id: string | string[]) => {
        try {
            const response = await api.get(`lookup.php?i=${id}`)
            return response.data.meals
        } catch (error) {
            throw new Error(
                `Failed to fetch food info by ID "${id}": ${error instanceof Error ? error.message : 'Unknown error'}`,
            )
        }
    },

    getFoodsByIngridient: async (ingridient: string) => {
        try {
            const response = await api.get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingridient}`,
            )
            return response.data.meals
        } catch (error) {
            throw new Error(
                `${error instanceof Error ? error.message : 'Unknown error'}`,
            )
        }
    },
}

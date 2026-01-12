import { apiServices } from '@/api/foodApi'
import { Food } from '@/types'
import { ref } from 'vue'

export const useCurrentFood = (foodId: string | string[]) => {
    const foodInfo = ref<Food[]>()

    const getFoodInfo = async () => {
        const data = await apiServices.getFoodInfoById(foodId)
        foodInfo.value = data
    }

    return {
        foodInfo,
        getFoodInfo,
    }
}

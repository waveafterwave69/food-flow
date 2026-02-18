import { apiServices } from '@/api/foodApi'
import { Food } from '@/types/food'
import { computed, ref } from 'vue'

export const useCurrentFood = (foodId: string | string[]) => {
    const foodInfo = ref<Food[]>()

    const getFoodInfo = async () => {
        const data = await apiServices.getFoodInfoById(foodId)
        foodInfo.value = data
    }

    const ingredients = computed(() => {
        if (!foodInfo.value || foodInfo.value.length === 0) return []

        const food = foodInfo.value[0]
        const result: Array<{ name: string; measure: string }> = []

        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}` as keyof Food
            const measureKey = `strMeasure${i}` as keyof Food

            const ingredient = food[ingredientKey]
            const measure = food[measureKey]

            if (
                ingredient &&
                typeof ingredient === 'string' &&
                ingredient.trim()
            ) {
                result.push({
                    name: ingredient.trim(),
                    measure:
                        measure && typeof measure === 'string'
                            ? measure.trim()
                            : '',
                })
            }
        }

        return result
    })

    return {
        foodInfo,
        getFoodInfo,
        ingredients,
    }
}

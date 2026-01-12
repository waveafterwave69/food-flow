import { apiServices } from '@/api/foodApi'
import { CategoryItem, Food } from '@/types'
import { defineStore } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'

export const useFoodStore = defineStore('food', () => {
    const foodData = ref<Food[]>([])
    const isLoading = ref<boolean>(false)
    const searchValue = ref<string>('')
    const selectedCategory = ref<string>('')
    const selectedCuisine = ref<string>('All')

    const shouldSearchByName = computed(() => {
        return searchValue.value.trim().length > 0
    })

    watch(searchValue, () => {
        fetchFood()
    })

    onMounted(() => {
        fetchFood()
    })

    const changeCategory = (category: CategoryItem) => {
        selectedCategory.value =
            selectedCategory.value === category.codeName
                ? ''
                : category.codeName
    }

    const fetchFood = async () => {
        try {
            isLoading.value = true

            if (shouldSearchByName.value && searchValue.value.trim()) {
                const searchResults = await apiServices.getFoodByName(
                    searchValue.value
                )

                if (selectedCategory.value) {
                    const categoryResults = await apiServices.getFoodByCategory(
                        selectedCategory.value
                    )
                    // Находим пересечение по idMeal
                    const categoryMealIds = new Set(
                        categoryResults?.map((meal) => meal.idMeal) || []
                    )
                    foodData.value =
                        searchResults?.filter((meal) =>
                            categoryMealIds.has(meal.idMeal)
                        ) || []
                } else {
                    foodData.value = searchResults || []
                }
            } else {
                if (selectedCategory.value) {
                    foodData.value =
                        (await apiServices.getFoodByCategory(
                            selectedCategory.value
                        )) || []
                } else {
                    foodData.value = (await apiServices.getFoodByName('')) || []
                }
            }

            console.log('Получены данные:', foodData.value)
        } catch (error: any) {
            console.error('Ошибка при загрузке данных:', error)
            foodData.value = []
        } finally {
            isLoading.value = false
        }
    }

    const resetSearch = () => {
        searchValue.value = ''
        fetchFood()
    }

    return {
        searchValue,
        foodData,
        isLoading,
        selectedCuisine,
        changeCategory,
        selectedCategory,
        fetchFood,
        resetSearch,
    }
})

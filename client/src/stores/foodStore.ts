import { apiServices } from '@/api/foodApi'
import { useDebounce } from '@/composables/useDebounce'
import { CategoryItem } from '@/types/category'
import { Food } from '@/types/food'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useFoodStore = defineStore('food', () => {
    const foodData = ref<Food[]>([])
    const isLoading = ref<boolean>(false)
    const searchValue = ref<string>('')
    const ingridientValue = ref<string>('')
    const errorMessage = ref<Error>()
    const selectedCategory = ref<string>('')
    const tempSelectedCategory = ref<string>('')
    const selectedCuisine = ref<string>('All')
    const debounceTimeout = ref<NodeJS.Timeout | null>(null)

    const shouldSearchByName = computed(() => {
        return searchValue.value.trim().length > 0
    })

    const fetchFood = async () => {
        if (debounceTimeout.value) {
            clearTimeout(debounceTimeout.value)
            debounceTimeout.value = null
        }

        try {
            isLoading.value = true
            if (ingridientValue.value) {
                foodData.value = await apiServices.getFoodsByIngridient(
                    ingridientValue.value,
                )
            } else if (shouldSearchByName.value && searchValue.value.trim()) {
                const searchResults = await apiServices.getFoodByName(
                    searchValue.value,
                )

                if (selectedCategory.value) {
                    const categoryResults = await apiServices.getFoodByCategory(
                        selectedCategory.value,
                    )
                    const categoryMealIds = new Set(
                        categoryResults?.map((meal) => meal.idMeal) || [],
                    )
                    foodData.value =
                        searchResults?.filter((meal) =>
                            categoryMealIds.has(meal.idMeal),
                        ) || []
                } else {
                    foodData.value = searchResults || []
                }
            } else {
                if (selectedCategory.value) {
                    foodData.value =
                        (await apiServices.getFoodByCategory(
                            selectedCategory.value,
                        )) || []
                } else {
                    foodData.value = (await apiServices.getFoodByName('')) || []
                }
            }
        } catch (error) {
            foodData.value = []
            errorMessage.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const { debounceFunc, cleanup } = useDebounce(fetchFood, 500)

    watch(searchValue, () => {
        debounceFunc()
    })

    const changeCategory = (category: CategoryItem) => {
        tempSelectedCategory.value =
            tempSelectedCategory.value === category.codeName
                ? ''
                : category.codeName
    }

    const applyIngridient = (ingredient: string) => {
        ingridientValue.value = ingredient
        fetchFood()
    }

    const resetIngridient = () => {
        ingridientValue.value = ''
        fetchFood()
    }

    const applyFilters = () => {
        selectedCategory.value = tempSelectedCategory.value
        fetchFood()
    }

    const resetTempCategory = () => {
        tempSelectedCategory.value = selectedCategory.value
    }

    const resetSearch = () => {
        searchValue.value = ''
        selectedCategory.value = ''
        tempSelectedCategory.value = ''
        fetchFood()
    }

    const resetAllFilters = () => {
        searchValue.value = ''
        selectedCategory.value = ''
        tempSelectedCategory.value = ''
        selectedCuisine.value = 'All'
        fetchFood()
    }

    return {
        searchValue,
        foodData,
        isLoading,
        selectedCuisine,
        changeCategory,
        selectedCategory,
        tempSelectedCategory,
        applyFilters,
        resetTempCategory,
        fetchFood,
        resetSearch,
        resetAllFilters,
        cleanup,
        ingridientValue,
        applyIngridient,
        resetIngridient,
    }
})

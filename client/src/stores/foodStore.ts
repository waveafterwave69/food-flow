import { apiServices } from '@/api/foodApi'
import { CategoryItem } from '@/types/category'
import { Food } from '@/types/food'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDebounce } from 'wave-hooks'

export const useFoodStore = defineStore('food', () => {
    const foodData = ref<Food[]>([])
    const isLoading = ref<boolean>(false)
    const searchValue = ref<string>('')
    const ingridientValue = ref<string>('')
    const errorMessage = ref<string>('')
    const selectedCategory = ref<string>('')
    const tempSelectedCategory = ref<string>('')
    const selectedCuisine = ref<string>('All')

    const fetchFoodsByIngridient = async () => {
        foodData.value =
            (await apiServices.getFoodsByIngridient(ingridientValue.value)) ||
            []
    }

    const fetchFoodByCategory = async () => {
        foodData.value =
            (await apiServices.getFoodByCategory(selectedCategory.value)) || []
    }

    const fetchFoodByName = async () => {
        const searchResults =
            (await apiServices.getFoodByName(searchValue.value || 'a')) || []

        if (selectedCategory.value) {
            const categoryResults = await apiServices.getFoodByCategory(
                selectedCategory.value,
            )
            const categoryMealIds = new Set(
                categoryResults?.map((food: Food) => food.idMeal) || [],
            )

            foodData.value = searchResults.filter((food: Food) =>
                categoryMealIds.has(food.idMeal),
            )
        } else {
            foodData.value = searchResults
        }
    }

    const fetchFood = async () => {
        try {
            isLoading.value = true
            errorMessage.value = ''

            if (ingridientValue.value) {
                await fetchFoodsByIngridient()
            } else if (searchValue.value.trim()) {
                await fetchFoodByName()
            } else if (selectedCategory.value) {
                await fetchFoodByCategory()
            } else {
                await fetchFoodByName()
            }
        } catch (error) {
            foodData.value = []
            errorMessage.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const { debounceFunc } = useDebounce(fetchFood, 500)

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
        searchValue.value = ''
        ingridientValue.value = ingredient
        fetchFood()
    }

    const resetIngridient = () => {
        ingridientValue.value = ''
        fetchFood()
    }

    const applyFilters = () => {
        ingridientValue.value = ''
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
        ingridientValue.value = ''
        selectedCuisine.value = 'All'
        fetchFood()
    }

    return {
        searchValue,
        foodData,
        isLoading,
        errorMessage,
        selectedCuisine,
        changeCategory,
        selectedCategory,
        tempSelectedCategory,
        applyFilters,
        resetTempCategory,
        fetchFood,
        resetSearch,
        resetAllFilters,
        ingridientValue,
        applyIngridient,
        resetIngridient,
    }
})

import { apiServices } from '@/api/foodApi'
import { CategoryItem, Food } from '@/types'
import { defineStore } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'

export const useFoodStore = defineStore('food', () => {
    const foodData = ref<Food[]>([])
    const isLoading = ref<boolean>(false)
    const searchValue = ref<string>('')

    // Изменяем логику: храним выбранную категорию и временную выбранную категорию
    const selectedCategory = ref<string>('')
    const tempSelectedCategory = ref<string>('') // Временное значение для чекбоксов

    const selectedCuisine = ref<string>('All')

    // Для управления debounce
    const debounceTimeout = ref<NodeJS.Timeout | null>(null)
    const DEBOUNCE_DELAY = 500 // 0.5 секунды для поиска

    const shouldSearchByName = computed(() => {
        return searchValue.value.trim().length > 0
    })

    // Дебаунс watch для поиска
    watch(searchValue, () => {
        debouncedFetchFood()
    })

    onMounted(() => {
        fetchFood()
    })

    // Теперь просто меняем временное значение, без вызова fetchFood
    const changeCategory = (category: CategoryItem) => {
        tempSelectedCategory.value =
            tempSelectedCategory.value === category.codeName
                ? ''
                : category.codeName
    }

    // Применяем фильтр и обновляем выбранную категорию
    const applyFilters = () => {
        selectedCategory.value = tempSelectedCategory.value
        fetchFood()
    }

    // Сбрасываем временный выбор к текущему выбранному значению
    const resetTempCategory = () => {
        tempSelectedCategory.value = selectedCategory.value
    }

    // Дебаунсированная версия fetchFood
    const debouncedFetchFood = () => {
        if (debounceTimeout.value) {
            clearTimeout(debounceTimeout.value)
        }

        debounceTimeout.value = setTimeout(() => {
            fetchFood()
        }, DEBOUNCE_DELAY)
    }

    // Основная функция загрузки данных
    const fetchFood = async () => {
        if (debounceTimeout.value) {
            clearTimeout(debounceTimeout.value)
            debounceTimeout.value = null
        }

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
        selectedCategory.value = ''
        tempSelectedCategory.value = ''
        fetchFood()
    }

    // Сброс всех фильтров
    const resetAllFilters = () => {
        searchValue.value = ''
        selectedCategory.value = ''
        tempSelectedCategory.value = ''
        selectedCuisine.value = 'All'
        fetchFood()
    }

    const cleanup = () => {
        if (debounceTimeout.value) {
            clearTimeout(debounceTimeout.value)
            debounceTimeout.value = null
        }
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
        debouncedFetchFood,
        resetSearch,
        resetAllFilters,
        cleanup,
    }
})

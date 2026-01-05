import { apiServices } from '@/api/foodApi'
import { CategoryItem, Food } from '@/types'
import { defineStore } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'

export const useFoodStore = defineStore('food', () => {
    const foodData = ref<Food[]>([])
    const isLoading = ref<boolean>(false)
    const searchValue = ref<string>('')
    const selectedCategory = ref<string>('Beef')
    const selectedCuisine = ref<string>('All')

    // computed свойство для определения типа запроса
    const shouldSearchByName = computed(() => {
        return searchValue.value.trim().length > 0
    })

    // watch для отслеживания searchValue
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

            // Если есть поисковый запрос, ищем по имени
            if (shouldSearchByName.value) {
                const searchResults = await apiServices.getFoodByName(
                    searchValue.value
                )

                // Если выбрана категория, фильтруем результаты по категории
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
            }
            // Если нет поискового запроса, просто получаем по категории
            else {
                foodData.value =
                    (await apiServices.getFoodByCategory(
                        selectedCategory.value
                    )) || []
            }

            console.log('Получены данные:', foodData.value)
        } catch (error: any) {
            console.error('Ошибка при загрузке данных:', error)
            foodData.value = []
        } finally {
            isLoading.value = false
        }
    }

    // Сброс поиска
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

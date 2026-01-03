<script setup lang="ts">
import { ref } from 'vue'

interface CategoryItem {
    codeName: string
    title: string
}

const categoryItems: CategoryItem[] = [
    { codeName: 'Beef', title: 'Говядина' },
    { codeName: 'Breakfast', title: 'Завтрак' },
    { codeName: 'Chicken', title: 'Курица' },
    { codeName: 'Dessert', title: 'Десерт' },
    { codeName: 'Miscellaneous', title: 'Разнообразный' },
    { codeName: 'Pasta', title: 'Паста' },
    { codeName: 'Seafood', title: 'Морепродукты' },
    { codeName: 'Vegetarian', title: 'Вегетарианский' },
]

const cuisines = [
    {
        country: 'Не выбрано',
        codeName: 'All',
    },
    {
        country: 'Русская',
        codeName: 'Russian',
    },
    {
        country: 'Индийская',
        codeName: 'Indian',
    },
]

const selectedCategory = ref<string>('')
const selectedCuisine = ref<string>('All')

const changeCategory = (category: CategoryItem) => {
    selectedCategory.value =
        selectedCategory.value === category.codeName ? '' : category.codeName
}
</script>

<template>
    <aside class="panel">
        <div class="top__content">
            <h3 class="panel__title">Фильтры</h3>
            <div class="panel__blocks">
                <div class="panel__block panel__block-category">
                    <div class="block__title">Категории:</div>
                    <ul class="block__list">
                        <li
                            class="list__item"
                            v-for="category in categoryItems"
                            :key="category.codeName"
                        >
                            <input
                                type="checkbox"
                                :value="category.codeName"
                                :checked="
                                    selectedCategory === category.codeName
                                "
                                @change="changeCategory(category)"
                            />
                            {{ category.title }}
                        </li>
                    </ul>
                </div>
                <div class="panel__block panel__block-cuisines">
                    <div class="block__title">Кухня:</div>
                    <select
                        name="cuisines"
                        id="cuisines"
                        class="block__select"
                        v-model="selectedCuisine"
                    >
                        <option
                            v-for="cuisine in cuisines"
                            :key="cuisine.codeName"
                            :value="cuisine.codeName"
                        >
                            {{ cuisine.country }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <button class="panel__button">Применить</button>
    </aside>
</template>

<style scoped>
.panel {
    background-color: var(--color-white-dark);
    padding: 20px 25px;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80vh;
    width: 420px;
    animation: fromLeftToRight 0.5s;
    position: relative;
}

.panel__title {
    max-width: 150px;
    margin: 0 auto;
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 26px;
    text-align: center;
    margin-bottom: 40px;
    border-bottom: 3px solid var(--color-yellow-dark);
}

.panel__block-category {
    margin-bottom: 50px;
}

.block__title {
    font-weight: 300;
    font-size: 24px;
    margin-bottom: 10px;
}

.block__list {
    background-color: var(--color-white);
    padding: 12px 20px;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}

.list__item {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-weight: 200;
    font-size: 18px;
}

.list__item input {
    cursor: pointer;
    width: 17px;
    height: 17px;
}

.block__select {
    background-color: var(--color-white);
    width: 100%;
    padding: 12px 20px;
    border-radius: var(--border-radius);
}

.panel__button {
    font-weight: 500;
    font-size: 20px;
    background-color: var(--color-yellow-dark);
    padding: 15px;
    border-radius: var(--border-radius);
}

@media (max-width: 1800px) {
    .panel {
        display: none;
    }
}
</style>

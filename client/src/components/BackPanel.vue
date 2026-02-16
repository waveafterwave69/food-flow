<script setup lang="ts">
import { useFoodStore } from '@/stores/foodStore'
import { CategoryItem } from '@/types'
import { onMounted } from 'vue'

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

const foodStore = useFoodStore()

interface Props {
    toggleOpen?: () => void
}

const props = defineProps<Props>()

onMounted(() => {
    foodStore.resetTempCategory()
})

const applyFilters = () => {
    foodStore.applyFilters()
    props.toggleOpen()
}

const resetFilters = () => {
    foodStore.resetAllFilters()
    props.toggleOpen()
}
</script>

<template>
    <aside class="panel">
        <div class="top__content">
            <h3 class="panel__title">Категории</h3>
            <div class="panel__blocks">
                <div class="panel__block panel__block-category">
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
                                    foodStore.tempSelectedCategory ===
                                    category.codeName
                                "
                                @change="foodStore.changeCategory(category)"
                            />
                            {{ category.title }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="panel__actions">
            <button
                class="panel__button panel__button-reset"
                @click="resetFilters"
            >
                Сбросить
            </button>
            <button
                class="panel__button panel__button-apply"
                @click="applyFilters"
            >
                Применить
            </button>
        </div>
    </aside>
</template>

<style scoped>
.panel {
    background-color: var(--color-white);
    padding: 20px 25px;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80vh;
    width: 420px;
    animation: fromLeftToRight 0.5s;
    position: sticky;
    top: 20px;
}

.panel__title {
    margin: 0 auto;
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 26px;
    text-align: center;
    margin-bottom: 40px;
    border-bottom: 3px solid var(--color-accent);
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
    background-color: var(--color-main);
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

    font-size: 18px;
}

.list__item input {
    cursor: pointer;
    width: 17px;
    height: 17px;
}

.panel__actions {
    display: flex;
    gap: 10px;
}

.panel__button {
    flex: 1;
    font-weight: 500;
    font-size: 20px;
    padding: 15px;
    border-radius: var(--border-radius);
    cursor: pointer;
}

.panel__button-apply {
    background-color: var(--color-accent);
}

.panel__button-reset {
    background-color: var(--color-gray-light);
    color: var(--color-gray-dark);
}

@media (max-width: 1800px) {
    .panel {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        animation: none;
    }
}

@media (max-width: 768px) {
    .panel {
        padding: 30px 25px;
    }

    .panel__title {
        max-width: 130px;
        font-size: 24px;
        margin-bottom: 20px;
    }

    .panel__block-category {
        margin-bottom: 40px;
    }

    .block__title {
        font-size: 22px;
        margin-bottom: 5px;
    }

    .block__list {
        padding: 15px 20px;
        row-gap: 22px;
    }

    .list__item {
        column-gap: 8px;
        font-size: 18px;
    }

    .list__item input {
        cursor: pointer;
        width: 16px;
        height: 16px;
    }

    .panel__button {
        font-size: 18px;
        padding: 13px;
    }
}

@media (max-width: 425px) {
    .panel {
        padding: 30px 25px;
    }

    .panel__title {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .panel__block-category {
        margin-bottom: 30px;
    }

    .block__title {
        font-size: 20px;
        margin-bottom: 5px;
    }

    .list__item {
        font-size: 16px;
    }

    .panel__button {
        font-size: 18px;
        padding: 12px;
    }
}
</style>

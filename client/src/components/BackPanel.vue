<script setup lang="ts">
import { useFoodStore } from '@/stores/foodStore'
import { CategoryItem } from '@/types'
import { onMounted } from 'vue'

const categoryItems: CategoryItem[] = [
    { codeName: 'Beef', title: 'Говядина', icon: '🥩' },
    { codeName: 'Breakfast', title: 'Завтрак', icon: '🍳' },
    { codeName: 'Chicken', title: 'Курица', icon: '🍗' },
    { codeName: 'Dessert', title: 'Десерт', icon: '🍰' },
    { codeName: 'Miscellaneous', title: 'Разное', icon: '🍲' },
    { codeName: 'Pasta', title: 'Паста', icon: '🍝' },
    { codeName: 'Seafood', title: 'Морепродукты', icon: '🦐' },
    { codeName: 'Vegetarian', title: 'Вегетарианское', icon: '🥗' },
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
    props.toggleOpen?.()
}

const resetFilters = () => {
    foodStore.resetAllFilters()
    props.toggleOpen?.()
}

const closePanel = () => {
    props.toggleOpen?.()
}
</script>

<template>
    <div class="panel-overlay" @click.self="closePanel">
        <aside class="panel">
            <div class="panel__content">
                <div class="panel__section">
                    <h4 class="panel__section-title">
                        <span class="section-title__icon">📋</span>
                        Категории
                    </h4>

                    <ul class="categories-list">
                        <li
                            v-for="category in categoryItems"
                            :key="category.codeName"
                            class="categories-list__item"
                        >
                            <label class="category-checkbox">
                                <input
                                    type="checkbox"
                                    :value="category.codeName"
                                    :checked="
                                        foodStore.tempSelectedCategory ===
                                        category.codeName
                                    "
                                    @change="foodStore.changeCategory(category)"
                                    class="category-checkbox__input"
                                />
                                <span class="category-checkbox__custom">
                                    <svg
                                        class="checkbox__icon"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M20 6L9 17L4 12"
                                            stroke="currentColor"
                                            stroke-width="3"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </span>
                                <span class="category-checkbox__label">
                                    <span class="category__icon">{{
                                        category.icon
                                    }}</span>
                                    {{ category.title }}
                                </span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="panel__actions">
                <button
                    class="panel__button panel__button--reset"
                    @click="resetFilters"
                >
                    <svg
                        class="button__icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 4V10H7"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <path
                            d="M3.51 14.5C4.17 16.14 5.33 17.5 6.99 18.26C9.92 19.66 13.45 19.03 16.26 16.76C19.45 14.17 20.39 9.66 18.31 6.02C16.23 2.38 12.11 0.95 8.06 2.06C5.56 2.74 3.63 4.64 2.79 7"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                    <span>Сбросить</span>
                </button>
                <button
                    class="panel__button panel__button--apply"
                    @click="applyFilters"
                >
                    <svg
                        class="button__icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <span>Применить</span>
                </button>
            </div>
        </aside>
    </div>
</template>

<style scoped>
.panel-overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 500;
    display: flex;
    justify-content: flex-start;
    animation: fadeIn 0.3s ease;
}

.panel {
    width: 420px;
    height: 80vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    animation: slideInLeft 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 15px;
}

.panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    background: linear-gradient(135deg, #fff, #faf7f2);
}

.panel__title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0;
    font-size: 1.8rem;
    font-weight: 500;
    font-family: var(--font-second);
    color: #2d2d2d;
}

.panel__title-icon {
    font-size: 2rem;
    filter: drop-shadow(0 2px 4px rgba(226, 125, 96, 0.3));
}

.panel__close {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #666;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;
}

.panel__close:hover {
    background: rgba(226, 125, 96, 0.1);
    color: var(--color-accent);
    transform: rotate(90deg);
}

.panel__close svg {
    width: 24px;
    height: 24px;
}

.panel__content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem 2rem;
}

.panel__section {
    margin-bottom: 2rem;
}

.panel__section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: #2d2d2d;
    margin: 0 0 1.2rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--color-accent);
}

.section-title__icon {
    font-size: 1.4rem;
}

.categories-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.categories-list__item {
    transition: transform 0.2s ease;
}

.categories-list__item:hover {
    transform: translateX(5px);
}

.category-checkbox {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: white;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.category-checkbox:hover {
    background: #faf7f2;
    border-color: var(--color-accent);
    box-shadow: 0 4px 12px rgba(226, 125, 96, 0.1);
}

.category-checkbox__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.category-checkbox__custom {
    position: relative;
    width: 22px;
    height: 22px;
    border: 2px solid #ddd;
    border-radius: 8px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.category-checkbox__input:checked + .category-checkbox__custom {
    background: var(--color-accent);
    border-color: var(--color-accent);
    transform: scale(1.05);
}

.checkbox__icon {
    width: 14px;
    height: 14px;
    color: white;
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease;
}

.category-checkbox__input:checked + .category-checkbox__custom .checkbox__icon {
    opacity: 1;
    transform: scale(1);
}

.category-checkbox__label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.1rem;
    color: #2d2d2d;
    font-weight: 500;
    flex: 1;
}

.category__icon {
    font-size: 1.3rem;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
}

.panel__actions {
    display: flex;
    gap: 1rem;
    padding: 1.5rem 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    background: #faf7f2;
    border-radius: 15px;
}

.panel__button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
}

.panel__button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition:
        width 0.5s,
        height 0.5s;
}

.panel__button:hover::before {
    width: 300px;
    height: 300px;
}

.button__icon {
    width: 20px;
    height: 20px;
    position: relative;
    z-index: 1;
}

.panel__button span {
    position: relative;
    z-index: 1;
}

.panel__button--apply {
    background-color: var(--color-accent);
    color: white;
    box-shadow: 0 8px 20px rgba(226, 125, 96, 0.3);
}

.panel__button--apply:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(226, 125, 96, 0.5);
}

.panel__button--apply:active {
    transform: translateY(0);
}

.panel__button--reset {
    background: white;
    color: #666;
    border: 1px solid #ddd;
}

.panel__button--reset:hover {
    background: #f5f5f5;
    color: #ff4444;
    border-color: #ff4444;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 68, 68, 0.15);
}

@media (max-width: 1800px) {
    .panel-overlay {
        position: fixed;
        justify-content: center;
        align-items: center;
        background: none;
        background-color: rgba(0, 0, 0, 0.267);
    }

    .panel {
        width: 90%;
        max-width: 480px;
        height: 90vh;
        animation: slideInBottom 0.4s ease;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
}

@media (max-width: 768px) {
    .panel__header {
        padding: 1.25rem 1.5rem;
    }

    .panel__title {
        font-size: 1.6rem;
    }

    .panel__title-icon {
        font-size: 1.8rem;
    }

    .panel__content {
        padding: 1.25rem 1.5rem;
    }

    .panel__section-title {
        font-size: 1.2rem;
    }

    .category-checkbox {
        padding: 0.6rem 1rem;
    }

    .category-checkbox__label {
        font-size: 1rem;
    }

    .category__icon {
        font-size: 1.2rem;
    }

    .panel__actions {
        padding: 1.25rem 1.5rem;
    }

    .panel__button {
        padding: 0.875rem 1.25rem;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .panel {
        width: 95%;
        height: 95vh;
        border-radius: 24px;
    }

    .panel__header {
        padding: 1rem 1.25rem;
    }

    .panel__title {
        font-size: 1.4rem;
    }

    .panel__title-icon {
        font-size: 1.6rem;
    }

    .panel__close {
        width: 36px;
        height: 36px;
    }

    .panel__content {
        padding: 1rem 1.25rem;
    }

    .categories-list {
        gap: 0.4rem;
    }

    .category-checkbox {
        padding: 0.5rem 0.875rem;
    }

    .category-checkbox__custom {
        width: 20px;
        height: 20px;
        border-radius: 6px;
    }

    .category-checkbox__label {
        font-size: 0.95rem;
        gap: 0.5rem;
    }

    .panel__actions {
        padding: 1rem 1.25rem;
        gap: 0.75rem;
    }

    .panel__button {
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
    }

    .button__icon {
        width: 18px;
        height: 18px;
    }
}
</style>

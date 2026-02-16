<script setup lang="ts">
import { useFoodStore } from '@/stores/foodStore'

const foodStore = useFoodStore()
</script>

<template>
    <div class="recipes">
        <div v-if="foodStore.isLoading" class="recipes__state">
            <div class="recipes__loader">
                <svg class="recipes__spinner" viewBox="0 0 50 50">
                    <circle
                        class="spinner__path"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="4"
                    />
                </svg>
                <p class="recipes__state-text">Загружаем рецепты...</p>
            </div>
        </div>

        <ul v-else-if="foodStore.foodData.length" class="recipes__grid">
            <li
                v-for="(food, index) in foodStore.foodData"
                :key="food.idMeal"
                class="recipes__item"
                :style="{ animationDelay: `${index * 0.05}s` }"
            >
                <router-link :to="`/food/${food.idMeal}`" class="recipe-card">
                    <div class="recipe-card__image-wrapper">
                        <img
                            :src="food.strMealThumb"
                            :alt="food.strMeal"
                            class="recipe-card__image"
                            loading="lazy"
                        />
                        <div class="recipe-card__overlay">
                            <span class="recipe-card__view">Смотреть</span>
                        </div>
                    </div>
                    <div class="recipe-card__content">
                        <h3 class="recipe-card__title">{{ food.strMeal }}</h3>
                    </div>
                </router-link>
            </li>
        </ul>

        <div v-else class="recipes__state">
            <div class="recipes__empty">
                <svg
                    class="recipes__empty-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                >
                    <path
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <p class="recipes__state-text">Ничего не найдено</p>
                <p class="recipes__state-hint">
                    Попробуйте изменить параметры поиска или включить VPN
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.recipes {
    width: 100%;
    min-height: 400px;
    padding: 1rem 0;
}

.recipes__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.8rem;
    list-style: none;
    padding: 0;
    margin: 0;
}

.recipes__item {
    opacity: 0;
    animation: fadeInUp 0.5s ease forwards;
}

.recipe-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(226, 125, 96, 0.1);
}

.recipe-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 30px -8px rgba(226, 125, 96, 0.2);
    border-color: var(--color-accent);
}

.recipe-card__image-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 75%;
    overflow: hidden;
    background: linear-gradient(45deg, #f3f3f3, #e9e9e9);
}

.recipe-card__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.recipe-card:hover .recipe-card__image {
    transform: scale(1.08);
}

.recipe-card__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.recipe-card:hover .recipe-card__overlay {
    opacity: 1;
}

.recipe-card__view {
    color: white;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.6rem 1.5rem;
    border: 2px solid white;
    border-radius: 40px;
    transform: translateY(20px);
    transition: transform 0.3s ease;
    backdrop-filter: blur(4px);
    background: rgba(255, 255, 255, 0.1);
}

.recipe-card:hover .recipe-card__view {
    transform: translateY(0);
}

.recipe-card__content {
    padding: 1.2rem 1rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
}

.recipe-card__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: #2d2d2d;
    text-align: center;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
    transition: color 0.3s ease;
}

.recipe-card:hover .recipe-card__title {
    color: var(--color-accent);
}

.recipes__state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    width: 100%;
}

.recipes__loader,
.recipes__empty {
    text-align: center;
    animation: fadeIn 0.5s ease;
}

.recipes__spinner {
    width: 50px;
    height: 50px;
    animation: rotate 1.5s linear infinite;
    color: var(--color-accent);
    margin: 0 auto 1rem;
}

.spinner__path {
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
    stroke: currentColor;
}

.recipes__empty-icon {
    width: 80px;
    height: 80px;
    color: #ccc;
    margin: 0 auto 1rem;
    animation: pulse 2s infinite;
}

.recipes__state-text {
    font-size: 1.2rem;
    font-weight: 500;
    color: #666;
    margin: 0 0 0.5rem;
}

.recipes__state-hint {
    font-size: 0.95rem;
    color: #999;
    margin: 0;
    max-width: 300px;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .recipes__grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1.2rem;
    }

    .recipe-card__content {
        padding: 1rem 0.8rem;
    }

    .recipe-card__title {
        font-size: 0.95rem;
    }

    .recipes__state-text {
        font-size: 1.1rem;
    }

    .recipes__empty-icon {
        width: 60px;
        height: 60px;
    }
}

@media (max-width: 480px) {
    .recipes__grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.8rem;
    }

    .recipe-card__image-wrapper {
        padding-bottom: 80%;
    }

    .recipe-card__content {
        padding: 0.8rem 0.5rem;
    }

    .recipe-card__title {
        font-size: 0.9rem;
    }

    .recipe-card__view {
        font-size: 0.85rem;
        padding: 0.4rem 1rem;
    }

    .recipes__state {
        min-height: 300px;
    }

    .recipes__spinner {
        width: 40px;
        height: 40px;
    }

    .recipes__state-text {
        font-size: 1rem;
    }

    .recipes__state-hint {
        font-size: 0.85rem;
        padding: 0 1rem;
    }
}

@media (max-width: 360px) {
    .recipes__grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .recipe-card {
        flex-direction: row;
        align-items: center;
    }

    .recipe-card__image-wrapper {
        width: 100px;
        padding-bottom: 100px;
        flex-shrink: 0;
    }

    .recipe-card__content {
        flex: 1;
        padding: 1rem;
    }

    .recipe-card__title {
        text-align: left;
        font-size: 0.95rem;
    }

    .recipe-card__overlay {
        display: none;
    }
}
</style>

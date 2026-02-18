<script setup lang="ts">
import { Food } from '@/types/food'

interface Props {
    food: Food
}

defineProps<Props>()
</script>

<template>
    <div class="food-detail__hero">
        <img
            :src="food.strMealThumb"
            :alt="food.strMeal"
            class="food-detail__image"
        />
        <div class="food-detail__hero-overlay">
            <h1 class="food-detail__title">{{ food.strMeal }}</h1>
            <div class="food-detail__meta">
                <span class="food-detail__category">
                    <span class="meta-label">Категория:</span>
                    {{ food.strCategory }}
                </span>
                <a
                    v-if="food.strSource"
                    :href="food.strSource"
                    target="_blank"
                    class="food-detail__source"
                >
                    <span class="meta-label">Источник</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                        />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.food-detail__hero {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    margin-bottom: 3rem;
    animation: fadeIn 0.6s ease-out;
}

.food-detail__image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
}

.food-detail__hero:hover .food-detail__image {
    transform: scale(1.02);
}

.food-detail__hero-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.5rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: var(--color-light);
}

.food-detail__title {
    font-size: 3.5rem;
    font-weight: 600;
    font-family: var(--font-second);
    margin: 0 0 1rem 0;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.6s ease-out 0.2s both;
}

.food-detail__meta {
    display: flex;
    gap: 2rem;
    align-items: center;
    flex-wrap: wrap;
    animation: slideUp 0.6s ease-out 0.3s both;
}

.food-detail__category,
.food-detail__source {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.1rem;
}

.meta-label {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.8;
    font-weight: 400;
}

.food-detail__source {
    color: var(--color-light);
    text-decoration: none;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 40px;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
}

.food-detail__source:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

.food-detail__source svg {
    transition: transform 0.3s ease;
}

.food-detail__source:hover svg {
    transform: translate(2px, -2px);
}

@media (max-width: 768px) {
    .food-detail {
        padding: 1rem;
    }

    .food-detail__image {
        height: 300px;
    }

    .food-detail__hero-overlay {
        padding: 1.5rem;
    }

    .food-detail__category,
    .food-detail__source {
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .food-detail__image {
        height: 250px;
    }

    .food-detail__title {
        font-size: 2rem;
    }

    .food-detail__hero-overlay {
        padding: 1rem;
    }

    .food-detail__meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}
</style>

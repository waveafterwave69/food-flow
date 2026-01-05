<script setup lang="ts">
import { useFoodStore } from '@/stores/foodStore'

const foodStore = useFoodStore()
</script>

<template>
    <div v-if="foodStore.isLoading" class="list__loading">Загрузка...</div>
    <ul v-else class="list__content">
        <li
            v-for="food in foodStore.foodData"
            :key="food.idMeal"
            class="list__item-wrapper"
        >
            <router-link :to="`/food/${food.idMeal}`" class="list__item">
                <div class="list__item-image">
                    <img :src="food.strMealThumb" :alt="food.strMeal" />
                </div>
                <div class="list__item-content">
                    <p>{{ food.strMeal }}</p>
                </div>
            </router-link>
        </li>
    </ul>
    <div
        v-if="!foodStore.foodData.length && !foodStore.isLoading"
        class="list__loading"
    >
        Ничего не найдено :(
    </div>
</template>

<style scoped>
.list__content {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
    gap: 21px;
    list-style: none;
    padding: 0;
}

.list__item-wrapper {
    display: flex;
    height: 100%;
}

.list__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: var(--color-white-dark);
    border-radius: var(--border-radius);
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
}

.list__item:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.list__item-image {
    width: 100%;
    height: 180px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-white);
}

.list__item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.list__item-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 80px; /* Минимальная высота для контента */
}

.list__item-content p {
    color: var(--color-black);
    font-size: 17px;
    font-weight: 500;
    margin: 0;
    line-height: 1.4;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.list__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-size: 18px;
    color: var(--color-gray);
}

@media (max-width: 768px) {
    .list__content {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
    }

    .list__item-image {
        height: 150px;
    }

    .list__item-content {
        padding: 15px;
    }

    .list__item-content p {
        font-size: 15px;
    }
}

@media (max-width: 480px) {
    .list__content {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .list__item-image {
        height: 120px;
    }

    .list__item-content {
        padding: 10px;
        min-height: 60px;
    }
}
</style>

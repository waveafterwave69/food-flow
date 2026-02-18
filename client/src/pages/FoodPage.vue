<script setup lang="ts">
import FoodPromo from '@/components/FoodPromo.vue'
import { useCurrentFood } from '@/composables/useCurrentFood'
import { useFoodStore } from '@/stores/foodStore'
import { Food } from '@/types/food'
import { convertToEmbedUrl } from '@/utils/utils'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const foodStore = useFoodStore()
const router = useRouter()
const foodId = router.currentRoute.value.params.id
const { foodInfo, getFoodInfo, ingredients } = useCurrentFood(foodId)

const food = ref<Food>()

const youtubeEmbedUrl = computed(() => {
    if (!food.value?.strYoutube) return ''
    return convertToEmbedUrl(food.value.strYoutube)
})

const handleIngridientClick = (ingredientName: string) => {
    foodStore.applyIngridient(ingredientName)
    router.push('/')
}

onMounted(async () => {
    await getFoodInfo()
    food.value = foodInfo.value[0]
})
</script>

<template>
    <div class="food__detail">
        <div v-if="food" class="food__detail__container">
            <FoodPromo :food="food" />
            <div class="food__detail__content">
                <div
                    v-if="ingredients.length > 0"
                    class="food__detail__ingredients"
                >
                    <h2 class="section-title">Ингредиенты</h2>
                    <ul class="ingredients-list">
                        <li
                            v-for="(ingredient, index) in ingredients"
                            :key="index"
                            class="ingredients-list__item"
                            @click="handleIngridientClick(ingredient.name)"
                        >
                            <span class="ingredients-list__name">{{
                                ingredient.name
                            }}</span>
                            <span class="ingredients-list__measure">{{
                                ingredient.measure
                            }}</span>
                        </li>
                    </ul>
                </div>
                <div class="food__detail__instructions">
                    <h2 class="section-title">Способ приготовления</h2>
                    <p class="food__detail__guide">
                        {{ food.strInstructions }}
                    </p>
                </div>
            </div>
            <div v-if="youtubeEmbedUrl" class="food__detail__video">
                <h2 class="section-title">Видео-рецепт</h2>
                <div class="video-wrapper">
                    <iframe
                        :src="youtubeEmbedUrl"
                        title="YouTube video player"
                        frameborder="0"
                        allow="
                            accelerometer;
                            autoplay;
                            clipboard-write;
                            encrypted-media;
                            gyroscope;
                            picture-in-picture;
                        "
                        allowfullscreen
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.food__detail {
    min-height: 100vh;
    padding: 2rem 1rem;
}

.food__detail__container {
    max-width: 1200px;
    margin: 0 auto;
}

.food__detail__content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    margin-bottom: 3rem;
}

.food__detail__ingredients {
    background: var(--color-light);
    border-radius: 24px;
    padding: 2rem;
    animation: fadeIn 0.6s ease-out 0.2s both;
    height: fit-content;
    border: 1px solid rgba(226, 125, 96, 0.1);
}

.section-title {
    font-size: 1.8rem;
    font-weight: 500;
    font-family: var(--font-second);
    color: var(--color-black);
    margin: 0 0 1.5rem 0;
    position: relative;
    display: inline-block;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(
        90deg,
        var(--color-accent),
        var(--color-accent)
    );
    border-radius: 3px;
}

.ingredients-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.ingredients-list__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: var(--color-var(--color-light));
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.ingredients-list__item:hover {
    transform: translateX(8px);
    background: var(--color-light);
    border-color: var(--color-accent);
}

.ingredients-list__name {
    font-size: 1.1rem;
    font-weight: 500;
    color: #2d2d2d;
    position: relative;
    padding-left: 1.5rem;
}

.ingredients-list__name::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-size: 1.5rem;
    line-height: 1;
}

.ingredients-list__measure {
    font-size: 0.95rem;
    color: #666;
    background: var(--color-light);
    padding: 0.4rem 1rem;
    border-radius: 40px;
    font-weight: 500;
}

.food__detail__instructions {
    background: var(--color-light);
    border-radius: 24px;
    padding: 2rem;
    animation: fadeIn 0.6s ease-out 0.3s both;
    border: 1px solid rgba(226, 125, 96, 0.1);
}

.food__detail__guide {
    font-size: 1.1rem;
    line-height: 1.8;
    margin: 0;
}

.food__detail__video {
    margin-top: 2rem;
    animation: fadeIn 0.6s ease-out 0.4s both;
}

.video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    border-radius: 24px;
    background: var(--color-var(--color-light));
    margin-top: 1.5rem;
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

@media (max-width: 1024px) {
    .food__detail__image {
        height: 400px;
    }

    .food__detail__title {
        font-size: 3rem;
    }

    .food__detail__content {
        gap: 1.5rem;
    }

    .food__detail__ingredients,
    .food__detail__instructions {
        padding: 1.5rem;
    }
}

@media (max-width: 768px) {
    .food__detail {
        padding: 1rem;
    }

    .food__detail__image {
        height: 300px;
    }

    .food__detail__hero-overlay {
        padding: 1.5rem;
    }

    .food__detail__title {
        font-size: 2.5rem;
    }

    .food__detail__meta {
        gap: 1rem;
    }

    .food__detail__content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .food__detail__category,
    .food__detail__source {
        font-size: 1rem;
    }

    .section-title {
        font-size: 1.6rem;
    }

    .ingredients-list__item {
        padding: 0.875rem 1rem;
    }

    .ingredients-list__name {
        font-size: 1rem;
        padding-left: 1.25rem;
    }

    .ingredients-list__measure {
        font-size: 0.875rem;
        padding: 0.3rem 0.875rem;
    }

    .food__detail__guide {
        font-size: 1rem;
        line-height: 1.7;
    }
}

@media (max-width: 480px) {
    .food__detail__image {
        height: 250px;
    }

    .food__detail__title {
        font-size: 2rem;
    }

    .food__detail__hero-overlay {
        padding: 1rem;
    }

    .food__detail__meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .section-title {
        font-size: 1.4rem;
    }

    .section-title::after {
        width: 40px;
    }

    .food__detail__ingredients,
    .food__detail__instructions {
        padding: 1.25rem;
        border-radius: 20px;
    }

    .ingredients-list__item {
        padding: 0.75rem 1rem;
    }

    .ingredients-list__name::before {
        font-size: 1.2rem;
    }
}

@media (max-width: 360px) {
    .food__detail__title {
        font-size: 1.75rem;
    }

    .ingredients-list__item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .ingredients-list__measure {
        align-self: flex-start;
    }
}
</style>

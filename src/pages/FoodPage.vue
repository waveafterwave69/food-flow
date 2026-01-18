<script setup lang="ts">
import { useCurrentFood } from '@/composables/useCurrentFood'
import { Food } from '@/types'
import { convertToEmbedUrl } from '@/utils/utils'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const foodId = router.currentRoute.value.params.id

const { foodInfo, getFoodInfo, ingredients } = useCurrentFood(foodId)
const food = ref<Food>()

const youtubeEmbedUrl = computed(() => {
    if (!food.value?.strYoutube) return ''
    return convertToEmbedUrl(food.value.strYoutube)
})

onMounted(async () => {
    await getFoodInfo()
    food.value = foodInfo.value[0]
})
</script>

<template>
    <div class="container">
        <div class="food" v-if="food">
            <img
                :src="food.strMealThumb"
                :alt="food.strMeal"
                class="food__img"
            />
            <div class="main__content">
                <div class="food__text">
                    <h2 class="food__title">
                        {{ food.strMeal }}
                    </h2>
                    <div class="block__content">
                        <span class="block__text"
                            >Source Link:
                            <a :href="food.strSource" target="_blank">{{
                                food.strSource
                            }}</a></span
                        >
                    </div>
                    <div class="block__content">
                        <span class="block__text"
                            >Category: {{ food.strCategory }}</span
                        >
                    </div>

                    <div
                        class="block__content ingredients"
                        v-if="ingredients.length > 0"
                    >
                        <h3 class="ingredients__title">Ingredients:</h3>
                        <ul class="ingredients__list">
                            <li
                                v-for="(ingredient, index) in ingredients"
                                :key="index"
                                class="ingredients__item"
                            >
                                <span class="ingredient__name">{{
                                    ingredient.name
                                }}</span>
                                <span class="ingredient__measure">{{
                                    ingredient.measure
                                }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="block__content">
                        <span class="block__text">
                            Guide: {{ food.strInstructions }}</span
                        >
                    </div>
                </div>
            </div>

            <!-- ВИДЕО-ГАЙД -->
            <iframe
                v-if="youtubeEmbedUrl"
                class="yt__video"
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
</template>

<style scoped>
.food {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 50px;
    margin-bottom: 50px;
}

.main__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 25px;
    animation: fromLeftToRight 0.4s;
    position: relative;
}

.food__img {
    width: 100%;
    margin-top: 20px;
    height: 400px;
    border-radius: 5px;
    object-fit: cover;
    animation: fromRightToLeft 0.4s;
    position: relative;
}

.food__text {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 100%;
}

.food__title {
    font-weight: 400;
    font-size: 48px;
    font-family: var(--font-second);
    border-bottom: 3px solid var(--color-yellow);
    color: var(--color-black);
}

.block__content {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
}

.block__text {
    font-size: 18px;
    font-weight: 500;
}

.block__text a {
    color: var(--color-black);
    text-decoration: underline;
}

/* СТИЛИ ДЛЯ ИНГРЕДИЕНТОВ */
.ingredients {
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border-left: 4px solid var(--color-yellow);
}

.ingredients__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
    color: var(--color-black);
    font-family: var(--font-second);
}

.ingredients__list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.ingredients__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
}

.ingredients__item:hover {
    transform: translateX(5px);
}

.ingredient__name {
    font-size: 16px;
    font-weight: 500;
    color: #333;
}

.ingredient__measure {
    font-size: 14px;
    font-weight: 400;
    color: #666;
    background-color: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
}

.yt__video {
    width: 560px;
    height: 315px;
}

@media (max-width: 1024px) {
    .food {
        row-gap: 20px;
    }

    .food__img {
        width: 100%;
        margin-top: 15px;
        height: 250px;
    }

    .food__text {
        row-gap: 20px;
    }

    .food__title {
        font-size: 44px;
        border-bottom: 3px solid var(--color-yellow);
    }

    .block__content {
        row-gap: 4px;
    }

    .block__text {
        font-size: 18px;
    }

    .ingredients__title {
        font-size: 22px;
    }
}

@media (max-width: 768px) {
    .food {
        row-gap: 20px;
    }

    .food__img {
        width: 100%;
        margin-top: 15px;
        height: 200px;
    }

    .food__text {
        row-gap: 15px;
    }

    .food__title {
        font-size: 38px;
        border-bottom: 2px solid var(--color-yellow);
    }

    .block__content {
        row-gap: 4px;
    }

    .block__text {
        font-size: 16px;
    }

    .ingredients {
        padding: 12px;
    }

    .ingredients__title {
        font-size: 20px;
    }

    .ingredients__item {
        padding: 6px 10px;
    }

    .ingredient__name {
        font-size: 15px;
    }

    .ingredient__measure {
        font-size: 13px;
        padding: 3px 6px;
    }

    .yt__video {
        width: 355px;
        height: 200px;
    }
}

@media (max-width: 425px) {
    .food {
        row-gap: 20px;
    }

    .food__img {
        width: 100%;
        margin-top: 15px;
        height: 200px;
    }

    .food__text {
        row-gap: 15px;
    }

    .food__title {
        font-size: 36px;
        border-bottom: 2px solid var(--color-yellow);
    }

    .block__content {
        row-gap: 4px;
    }

    .block__text {
        font-size: 16px;
    }

    .ingredients__title {
        font-size: 18px;
    }

    .ingredient__name {
        font-size: 14px;
    }

    .ingredient__measure {
        font-size: 12px;
    }

    .yt__video {
        width: 100%;
        height: 200px;
    }
}
</style>

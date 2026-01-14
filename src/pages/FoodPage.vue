<script setup lang="ts">
import { useCurrentFood } from '@/composables/useCurrentFood'
import { Food } from '@/types'
import { convertToEmbedUrl } from '@/utils/utils'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const foodId = router.currentRoute.value.params.id

const { foodInfo, getFoodInfo } = useCurrentFood(foodId)
const food = ref<Food>()

const youtubeEmbedUrl = computed(() => {
    if (!food.value?.strYoutube) return ''
    return convertToEmbedUrl(food.value.strYoutube)
})

onMounted(async () => {
    await getFoodInfo()
    console.log(foodInfo.value[0])
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

            <div class="food__text">
                <h2 class="food__title">
                    {{ food.strMeal }} (<a
                        :href="food.strSource"
                        target="_blank"
                        >Link</a
                    >)
                </h2>
                <div class="block__content">
                    <span class="block__text"
                        >Category: {{ food.strCategory }}</span
                    >
                </div>
                <div class="block__content">
                    <span class="block__text">
                        Guide: {{ food.strInstructions }}</span
                    >
                </div>
            </div>

            <!-- ВИДЕО-ГАЙД -->
            <iframe
                v-if="youtubeEmbedUrl"
                width="560"
                height="315"
                :src="youtubeEmbedUrl"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</template>

<style scoped>
.food {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 25px;
}

.food__img {
    width: 500px;
    border-radius: 5px;
}

.food__text {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.food__title {
    font-weight: 400;
    font-size: 48px;
    font-family: var(--font-second);
    border-bottom: 3px solid var(--color-yellow);
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
</style>

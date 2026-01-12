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
            <div>НАЗВАНИЕ: {{ food.strMeal }}</div>
            <img :src="food.strMealThumb" alt="" />
            <div>КАК ПРИГОТОВИТЬ: {{ food.strInstructions }}</div>

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

            <a :href="food.strSource" target="_blank">ССЫЛКА НА ИСТОЧНИК</a>
        </div>
    </div>
</template>

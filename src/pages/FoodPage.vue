<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const currentId = router.currentRoute.value.params.id
</script>

<template>
    <div class="">FOOD: {{ currentId }}</div>
</template>

<style scoped></style>

<script setup lang="ts">
import BackPanel from '@/components/BackPanel.vue'
</script>

<template>
    <main class="main-container">
        <BackPanel />
    </main>
</template>

<style scoped>
.main-container {
    max-width: 1620px;
    margin-top: 20px;
    margin-left: 80px;
    margin-right: auto;
}

@media (max-width: 1800px) {
    .main-container {
        max-width: var(--container-width);
        padding: 0 var(--container-padding-x);
        margin: 0 auto;
        margin-top: 20px;
    }
}
</style>

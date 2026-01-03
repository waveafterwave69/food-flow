<script setup lang="ts">
import BackPanel from '@/components/BackPanel.vue'
import Search from '@/components/Search.vue'
</script>

<template>
    <main class="main-container">
        <BackPanel />
        <Search />
    </main>
</template>

<style scoped>
.main-container {
    max-width: 1670px;
    margin: 0 auto;
    margin-top: 20px;
    margin-left: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 20px;
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

<script setup lang="ts">
import BackPanel from '@/components/BackPanel.vue'
import FoodList from '@/components/FoodList.vue'
import Search from '@/components/Search.vue'
</script>

<template>
    <main class="main-container">
        <div class="row">
            <BackPanel class="panel" />
            <div class="column">
                <Search />
                <FoodList />
            </div>
        </div>
    </main>
</template>

<style scoped>
.row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 20px;
}

.column {
    width: 100%;
}

.main-container {
    max-width: 1670px;
    margin: 0 auto;
    margin-top: 20px;
    margin-left: 80px;
}

@media (max-width: 1800px) {
    .main-container {
        max-width: var(--container-width);
        padding: 0 var(--container-padding-x);
        margin: 0 auto;
        margin-top: 20px;
    }

    .panel {
        display: none;
    }
}

@media (max-width: 500px) {
    .main-container {
        padding: 0 var(--container-padding-mobile-x);
    }
}
</style>

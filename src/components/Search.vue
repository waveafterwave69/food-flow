<script setup lang="ts">
import { ref } from 'vue'
import BackPanel from './BackPanel.vue'

const searchValue = ref<string>('')
</script>

<template>
    <div class="search">
        <!-- <BackPanel /> -->
        <button class="search__button">
            <img src="../assets/img/header/menu.png" alt="Открыть филтры" />
        </button>
        <div class="input__content">
            <input
                type="text"
                v-model="searchValue"
                class="search__input"
                placeholder="Название блюда"
            />
            <button>
                <img
                    src="../assets/img/search/search.svg"
                    alt=""
                    class="input__img"
                />
            </button>
        </div>
    </div>
</template>

<style scoped>
.search {
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: 100%;
}

.search__button {
    background-color: var(--color-white-dark);
    padding: 12px;
    border-radius: var(--border-radius);
}

.search__button img {
    width: 25px;
}

.input__content {
    background-color: var(--color-white-dark);
    font-weight: 300;
    font-size: 20px;
    padding: 12px 20px;
    width: 100%;
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    column-gap: 20px;
}

.search__input {
    width: 100%;
}

.input__img {
    width: 20px;
}
</style>

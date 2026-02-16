<script setup lang="ts">
import { useFoodStore } from '@/stores/foodStore'
import { ref } from 'vue'
import BackPanel from './BackPanel.vue'

const foodStore = useFoodStore()
const isOpenPanel = ref<boolean>(false)

const toggleOpen = () => {
    isOpenPanel.value = !isOpenPanel.value
}
</script>

<template>
    <div class="search">
        <BackPanel v-if="isOpenPanel" :toggleOpen="toggleOpen" />
        <button
            v-if="!foodStore.ingridientValue"
            class="search__button"
            @click="toggleOpen"
        >
            <img src="../assets/img/header/menu.png" alt="Открыть фильтры" />
        </button>
        <div class="input__content">
            <input
                type="text"
                v-model="foodStore.searchValue"
                class="search__input"
                placeholder="Название блюда(на английском)"
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
    <div class="search__ingiridients" v-if="foodStore.ingridientValue">
        <span class="ingiridients__text"
            >Search by ingridient: {{ foodStore.ingridientValue }}</span
        >
        <button class="ingiridients__button" @click="foodStore.resetIngridient">
            <img
                class="button__img"
                src="../assets/img/search/cancel.png"
                alt="закрыть"
            />
        </button>
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
    background-color: var(--color-main-dark);
    padding: 12px;
    border-radius: var(--border-radius);
    display: none;
}

.search__button img {
    width: 25px;
}

.input__content {
    background-color: var(--color-white);
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

.search__ingiridients {
    background-color: var(--color-main-dark);
    border-radius: var(--border-radius);
    padding: 10px 20px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button__img {
    width: 25px;
}

@media (max-width: 1800px) {
    .search__button {
        display: block;
    }
}

@media (max-width: 1024px) {
    .search {
        column-gap: 10px;
        width: 100%;
    }

    .search__button {
        padding: 10px;
    }

    .search__button img {
        width: 23px;
    }

    .input__content {
        font-size: 20px;
        padding: 10px 20px;
        width: 100%;
        column-gap: 15px;
    }

    .input__img {
        width: 20px;
    }
}

@media (max-width: 768px) {
    .search {
        column-gap: 10px;
    }

    .search__button {
        padding: 10px;
    }

    .search__button img {
        width: 20px;
    }

    .input__content {
        font-size: 18px;
        padding: 10px 20px;
        column-gap: 15px;
    }

    .input__img {
        width: 20px;
    }
}

@media (max-width: 425px) {
    .search {
        column-gap: 8px;
    }

    .search__button {
        padding: 10px;
    }

    .search__button img {
        width: 20px;
    }

    .input__content {
        font-size: 18px;
        padding: 10px 15px;
    }

    .search__ingiridients {
        padding: 8px 15px;
        margin-top: 10px;
    }

    .button__img {
        width: 20px;
    }
}
</style>

<script setup lang="ts">
import { useFoodStore } from '@/stores/foodStore'
import { ref, watch } from 'vue'
import BackPanel from './BackPanel.vue'

const foodStore = useFoodStore()
const isOpenPanel = ref<boolean>(false)

const toggleOpen = () => {
    isOpenPanel.value = !isOpenPanel.value
}
</script>

<template>
    <div class="search__section">
        <BackPanel v-if="isOpenPanel" :toggleOpen="toggleOpen" />

        <div class="search__bar">
            <button
                v-if="!foodStore.ingridientValue"
                class="search__bar__filter-btn"
                @click="toggleOpen"
                aria-label="Открыть фильтры"
                title="Фильтры"
            >
                <img
                    class="search__bar__img"
                    src="../assets/img/header/menu.png"
                    alt=""
                />
            </button>

            <div class="search__bar__input-wrapper">
                <input
                    type="text"
                    v-model="foodStore.searchValue"
                    class="search__bar__input"
                    placeholder="Название блюда (на английском)"
                    aria-label="Поиск рецептов"
                />
                <button
                    class="search__bar__submit-btn"
                    aria-label="Найти"
                    title="Найти"
                >
                    <svg
                        class="submit-btn__icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <div v-if="foodStore.ingridientValue" class="active-filter">
            <span class="active-filter__label">
                <svg
                    class="filter-label__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 6V12L16 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                </svg>
                Поиск по ингредиенту:
            </span>
            <span class="active-filter__value">{{
                foodStore.ingridientValue
            }}</span>
            <button
                class="active-filter__remove"
                @click="foodStore.resetIngridient"
                aria-label="Убрать фильтр по ингредиенту"
                title="Сбросить"
            >
                <svg
                    class="remove-btn__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.search__section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.search__bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
}

.search__bar__filter-btn {
    display: none;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
}

.search__bar__img {
    width: 20px;
}

.search__bar__filter-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition:
        width 0.5s,
        height 0.5s;
}

.search__bar__filter-btn:hover::before {
    width: 200px;
    height: 200px;
}

.search__bar__filter-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(226, 125, 96, 0.3);
}

.search__bar__filter-btn:active {
    transform: translateY(0);
}

.filter-btn__icon {
    width: 24px;
    height: 24px;
    position: relative;
    z-index: 1;
}

.search__bar__input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    background: white;
    border-radius: 20px;
    padding: 0.5rem 0.5rem 0.5rem 1.25rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    border: 2px solid transparent;
    backdrop-filter: blur(10px);
}

.search__bar__input-wrapper:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 8px 25px rgba(226, 125, 96, 0.15);
    transform: scale(1.01);
}

.search__bar__input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 400;
    color: #2d2d2d;
    background: transparent;
    padding: 0.5rem 0;
}

.search__bar__input::placeholder {
    color: #aaa;
    font-weight: 300;
    transition: opacity 0.3s ease;
}

.search__bar__input:focus::placeholder {
    opacity: 0.7;
}

.search__bar__submit-btn {
    background: none;
    border: none;
    padding: 0.6rem;
    border-radius: 14px;
    cursor: pointer;
    color: #666;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
}

.search__bar__submit-btn:hover {
    color: var(--color-accent);
    background: #f0f0f0;
    transform: scale(1.05);
}

.search__bar__submit-btn:active {
    transform: scale(0.95);
}

.submit-btn__icon {
    width: 20px;
    height: 20px;
}

.active-filter {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: #fff;
    border-radius: 50px;
    padding: 0.5rem 0.5rem 0.5rem 1.25rem;
    border-left: 4px solid var(--color-accent);
    animation: slideDown 0.3s ease;
    flex-wrap: wrap;
}

.active-filter__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.filter-label__icon {
    width: 18px;
    height: 18px;
    color: var(--color-accent);
}

.active-filter__value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-accent);
    background: var(--color-white);
    padding: 0.35rem 1rem;
    border-radius: 40px;
    word-break: break-word;
}

.active-filter__remove {
    background: none;
    border: none;
    padding: 0.5rem;
    margin-left: auto;
    border-radius: 50%;
    cursor: pointer;
    color: #999;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.02);
}

.active-filter__remove:hover {
    color: #ff4444;
    background: rgba(255, 68, 68, 0.1);
    transform: rotate(90deg);
}

.active-filter__remove:active {
    transform: rotate(90deg) scale(0.9);
}

.remove-btn__icon {
    width: 20px;
    height: 20px;
}

@media (max-width: 1800px) {
    .search__bar__filter-btn {
        display: flex;
    }
}

@media (max-width: 1024px) {
    .search__bar__filter-btn {
        padding: 0.7rem;
    }

    .filter-btn__icon {
        width: 22px;
        height: 22px;
    }

    .search__bar__input-wrapper {
        padding: 0.4rem 0.4rem 0.4rem 1rem;
    }

    .search__bar__input {
        font-size: 0.95rem;
    }

    .active-filter {
        padding: 0.4rem 0.4rem 0.4rem 1rem;
    }

    .active-filter__label {
        font-size: 0.85rem;
    }

    .active-filter__value {
        font-size: 0.95rem;
        padding: 0.3rem 0.9rem;
    }
}

@media (max-width: 768px) {
    .search__bar__filter-btn {
        padding: 0.6rem;
    }

    .filter-btn__icon {
        width: 20px;
        height: 20px;
    }

    .search__bar__input-wrapper {
        padding: 0.3rem 0.3rem 0.3rem 0.9rem;
    }

    .search__bar__input {
        font-size: 0.9rem;
    }

    .submit-btn__icon {
        width: 18px;
        height: 18px;
    }

    .search__bar__submit-btn {
        padding: 0.5rem;
    }

    .active-filter {
        gap: 0.5rem;
    }

    .active-filter__label {
        font-size: 0.8rem;
    }

    .active-filter__value {
        font-size: 0.9rem;
        padding: 0.25rem 0.8rem;
    }

    .remove-btn__icon {
        width: 18px;
        height: 18px;
    }
}

@media (max-width: 480px) {
    .search__bar {
        gap: 0.5rem;
    }

    .search__bar__filter-btn {
        padding: 0.5rem;
    }

    .filter-btn__icon {
        width: 18px;
        height: 18px;
    }

    .search__bar__input-wrapper {
        padding: 0.2rem 0.2rem 0.2rem 0.8rem;
    }

    .search__bar__input {
        font-size: 0.85rem;
    }

    .search__bar__input::placeholder {
        font-size: 0.85rem;
    }

    .submit-btn__icon {
        width: 16px;
        height: 16px;
    }

    .search__bar__submit-btn {
        padding: 0.4rem;
    }

    .active-filter {
        padding: 0.3rem 0.3rem 0.3rem 0.8rem;
        gap: 0.4rem;
    }

    .active-filter__label {
        font-size: 0.75rem;
    }

    .filter-label__icon {
        width: 14px;
        height: 14px;
    }

    .active-filter__value {
        font-size: 0.85rem;
        padding: 0.2rem 0.7rem;
    }

    .remove-btn__icon {
        width: 16px;
        height: 16px;
    }

    .active-filter__remove {
        padding: 0.4rem;
    }
}

@media (max-width: 360px) {
    .active-filter {
        flex-direction: column;
        align-items: flex-start;
        border-radius: 20px;
    }

    .active-filter__label {
        width: 100%;
    }

    .active-filter__remove {
        align-self: flex-end;
        margin-top: -0.5rem;
    }
}
</style>

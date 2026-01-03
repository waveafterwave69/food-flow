<script setup lang="ts">
interface Props {
    toggleOpen: () => void
}

defineProps<Props>()
</script>

<template>
    <div class="overlay" @click="toggleOpen"></div>
    <div class="burger">
        <button @click="toggleOpen">
            <img
                src="../assets/img/header/close.png"
                alt="Закрыть меню"
                class="close__btn"
            />
        </button>
        <div class="burger__content">
            <ul class="content__list">
                <li>
                    <router-link to="/" class="list__item">
                        <img
                            src="../assets/img/header/header-profile.png"
                            alt="Профиль"
                        />
                        <span>Профиль</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.35);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
}

.burger {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 5;
    background-color: var(--color-white);
    width: 500px;
    height: 100vh;
    animation: fromRightToLeft 0.3s;
}

.close__btn {
    width: 25px;
    position: absolute;
    right: 25px;
    top: 38px;
}

.content__list {
    padding: 50px;
}

.list__item {
    display: flex;
    align-items: center;
    column-gap: 10px;
}

.list__item img {
    width: 35px;
}

.list__item span {
    font-size: 18px;
    color: var(--color-black);
}

@media (max-width: 1024px) {
    .burger {
        width: 350px;
    }

    .close__btn {
        width: 25px;
        right: 25px;
        top: 38px;
    }

    .content__list {
        padding: 30px;
    }

    .list__item {
        column-gap: 10px;
    }

    .list__item img {
        width: 35px;
    }

    .list__item span {
        font-size: 18px;
        color: var(--color-black);
    }
}

@media (max-width: 768px) {
    .burger {
        width: 330px;
    }

    .close__btn {
        width: 25px;
        right: 26px;
        top: 27px;
    }

    .content__list {
        padding: 30px;
    }

    .list__item {
        column-gap: 10px;
    }

    .list__item img {
        width: 32px;
    }

    .list__item span {
        font-size: 17px;
        color: var(--color-black);
    }

    .close__btn {
        width: 20px;
        top: 29px;
        right: 27px;
    }
}

@media (max-width: 425px) {
    .burger {
        width: 75%;
    }

    .close__btn {
        width: 25px;
        right: 20px;
        top: 20px;
    }

    .content__list {
        padding: 40px 30px;
    }

    .list__item {
        column-gap: 10px;
    }

    .list__item img {
        width: 30px;
    }

    .list__item span {
        font-size: 17px;
        color: var(--color-black);
    }

    .close__btn {
        width: 20px;
        top: 23px;
        right: 18px;
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import BurgerMenu from './BurgerMenu.vue'

const isOpen = ref<boolean>(false)

const toggleOpen = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <BurgerMenu v-if="isOpen" :toggleOpen="toggleOpen" />
    <header class="header">
        <div class="container">
            <div class="header__content">
                <router-link to="/" class="header__logo-link">
                    <div class="header__logo">
                        <div class="logo__image-wrapper">
                            <img
                                src="../assets/img/header/header-logo.png"
                                alt="Food Flow"
                                class="logo__image"
                            />
                        </div>
                        <div class="logo__text">
                            <span class="logo__title">FoodFlow</span>
                            <span class="logo__subtitle"
                                >рецепты и продукты для вас</span
                            >
                        </div>
                    </div>
                </router-link>

                <div class="header__actions">
                    <router-link to="/" class="header__profile-link">
                        <div class="header__profile">
                            <div class="profile__image-wrapper">
                                <img
                                    src="../assets/img/header/header-profile.png"
                                    alt="Профиль"
                                    class="profile__image"
                                />
                            </div>
                        </div>
                    </router-link>

                    <button
                        class="header__menu-button"
                        @click="toggleOpen"
                        aria-label="Открыть меню"
                    >
                        <span class="menu-button__line"></span>
                        <span class="menu-button__line"></span>
                        <span class="menu-button__line"></span>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    /* position: sticky; */
    top: 0;
    z-index: 100;
    padding: 1rem 0;
    background-color: var(--color-accent);
    animation: slideDown 0.5s ease;
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.header__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header__logo-link {
    text-decoration: none;
    transition: transform 0.3s ease;
}

.header__logo-link:hover {
    transform: scale(1.02);
}

.header__logo {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo__image-wrapper {
    width: 70px;
    height: 70px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: 3px solid rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
}

.header__logo-link:hover .logo__image-wrapper {
    transform: rotate(5deg);
    border-color: white;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.logo__image {
    width: 45px;
    height: 45px;
    object-fit: contain;
}

.logo__text {
    display: flex;
    flex-direction: column;
}

.logo__title {
    font-family: var(--font-second);
    font-weight: 600;
    font-size: 2rem;
    color: white;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    letter-spacing: -0.5px;
}

.logo__subtitle {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.3px;
}

.header__actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.header__profile-link {
    text-decoration: none;
}

.header__profile {
    transition: transform 0.3s ease;
}

.header__profile:hover {
    transform: translateY(-2px);
}

.profile__image-wrapper {
    width: 45px;
    height: 45px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
}

.header__profile:hover .profile__image-wrapper {
    border-color: white;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.profile__image {
    width: 25px;
    height: 25px;
    object-fit: contain;
}

.header__menu-button {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 35px;
    height: 25px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: transform 0.3s ease;
}

.menu-button__line {
    width: 100%;
    height: 3px;
    background: white;
    border-radius: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1800px) {
    .header__profile-link {
        display: none;
    }

    .header__menu-button {
        display: flex;
    }
}

@media (max-width: 1024px) {
    .header {
        padding: 0.875rem 0;
    }

    .logo__image-wrapper {
        width: 60px;
        height: 60px;
    }

    .logo__image {
        width: 38px;
        height: 38px;
    }

    .logo__title {
        font-size: 1.75rem;
    }

    .logo__subtitle {
        font-size: 0.85rem;
    }

    .header__menu-button {
        width: 32px;
        height: 22px;
    }
}

@media (max-width: 768px) {
    .header {
        padding: 0.75rem 0;
    }

    .logo__image-wrapper {
        width: 55px;
        height: 55px;
    }

    .logo__image {
        width: 35px;
        height: 35px;
    }

    .logo__title {
        font-size: 1.5rem;
    }

    .logo__subtitle {
        font-size: 0.8rem;
    }

    .header__menu-button {
        width: 30px;
        height: 20px;
    }

    .menu-button__line {
        height: 2.5px;
    }
}

@media (max-width: 480px) {
    .header {
        padding: 0.625rem 0;
    }

    .header__logo {
        gap: 0.75rem;
    }

    .logo__image-wrapper {
        width: 45px;
        height: 45px;
        border-width: 2px;
    }

    .logo__image {
        width: 28px;
        height: 28px;
    }

    .logo__title {
        font-size: 1.25rem;
    }

    .logo__subtitle {
        display: none;
    }

    .header__menu-button {
        width: 28px;
        height: 18px;
    }

    .menu-button__line {
        height: 2px;
    }
}

@media (max-width: 360px) {
    .logo__image-wrapper {
        width: 40px;
        height: 40px;
    }

    .logo__image {
        width: 25px;
        height: 25px;
    }

    .logo__title {
        font-size: 1.1rem;
    }

    .header__menu-button {
        width: 25px;
        height: 16px;
    }
}
</style>

<script setup lang="ts">
interface Props {
    toggleOpen: () => void
}

defineProps<Props>()
</script>

<template>
    <div class="overlay" @click="toggleOpen"></div>
    <div class="burger-menu">
        <button
            class="burger-menu__close"
            @click="toggleOpen"
            aria-label="Закрыть меню"
        >
            <svg
                class="close__icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                />
            </svg>
        </button>

        <div class="burger-menu__content">
            <div class="burger-menu__header">
                <h3 class="burger-menu__title">Меню</h3>
            </div>

            <nav class="burger-menu__nav">
                <ul class="nav__list">
                    <li class="nav__item">
                        <router-link
                            to="/"
                            class="nav__link"
                            @click="toggleOpen"
                        >
                            <div class="nav__icon-wrapper">
                                <svg
                                    class="nav__icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                    <circle
                                        cx="12"
                                        cy="7"
                                        r="4"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    />
                                </svg>
                            </div>
                            <span class="nav__text">Профиль</span>
                        </router-link>
                    </li>
                    <li class="nav__item">
                        <router-link
                            to="/favorites"
                            class="nav__link"
                            @click="toggleOpen"
                        >
                            <div class="nav__icon-wrapper">
                                <svg
                                    class="nav__icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 21L10.55 19.7C5.4 15.2 2 12.2 2 8.5C2 5.4 4.4 3 7.5 3C9.3 3 11 4 12 5.2C13 4 14.7 3 16.5 3C19.6 3 22 5.4 22 8.5C22 12.2 18.6 15.2 13.45 19.7L12 21Z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            <span class="nav__text">Избранное</span>
                        </router-link>
                    </li>
                </ul>
            </nav>

            <div class="burger-menu__footer">
                <button class="footer__logout" @click="toggleOpen">
                    <svg
                        class="logout__icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                        <path
                            d="M16 17L21 12L16 7"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M21 12H9"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                    <span class="logout__text">Выйти</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.burger-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 450px;
    height: 100vh;
    background: linear-gradient(135deg, #ffffff, #faf7f2);
    z-index: 1001;
    animation: slideIn 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: -10px 0 30px -10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
}

.burger-menu__close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(226, 125, 96, 0.1);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent);
    transition: all 0.3s ease;
    z-index: 10;
}

.burger-menu__close:hover {
    background: var(--color-accent);
    color: white;
    transform: rotate(90deg);
}

.close__icon {
    width: 20px;
    height: 20px;
}

.burger-menu__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5rem 2rem 2rem;
}

.burger-menu__header {
    margin-bottom: 3rem;
    text-align: center;
}

.burger-menu__title {
    font-family: var(--font-second);
    font-size: 2.5rem;
    font-weight: 500;
    color: #2d2d2d;
    margin: 0;
    position: relative;
    display: inline-block;
}

.burger-menu__title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, var(--color-accent), #ffb347);
    border-radius: 4px;
}

.burger-menu__nav {
    flex: 1;
}

.nav__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.nav__item {
    opacity: 0;
    animation: fadeInItem 0.4s ease forwards;
}

.nav__item:nth-child(1) {
    animation-delay: 0.1s;
}
.nav__item:nth-child(2) {
    animation-delay: 0.15s;
}
.nav__item:nth-child(3) {
    animation-delay: 0.2s;
}
.nav__item:nth-child(4) {
    animation-delay: 0.25s;
}

.nav__link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    text-decoration: none;
    color: #2d2d2d;
    border-radius: 16px;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(226, 125, 96, 0.1);
}

.nav__link:hover {
    background: linear-gradient(135deg, var(--color-accent), #ff9f4b);
    color: white;
    transform: translateX(8px);
    box-shadow: 0 8px 20px rgba(226, 125, 96, 0.3);
    border-color: transparent;
}

.nav__icon-wrapper {
    width: 40px;
    height: 40px;
    background: rgba(226, 125, 96, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.nav__link:hover .nav__icon-wrapper {
    background: rgba(255, 255, 255, 0.2);
}

.nav__icon {
    width: 22px;
    height: 22px;
    color: var(--color-accent);
    transition: all 0.3s ease;
}

.nav__link:hover .nav__icon {
    color: white;
    transform: scale(1.1);
}

.nav__text {
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.burger-menu__footer {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 2px dashed rgba(226, 125, 96, 0.2);
}

.footer__logout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem;
    border: none;
    background: white;
    border-radius: 50px;
    color: #ff4444;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 68, 68, 0.2);
}

.footer__logout:hover {
    background: #ff4444;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3);
}

.logout__icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
}

.footer__logout:hover .logout__icon {
    transform: translateX(5px);
}

.logout__text {
    transition: all 0.3s ease;
}

@media (max-width: 1024px) {
    .burger-menu {
        width: 400px;
    }

    .burger-menu__title {
        font-size: 2.2rem;
    }

    .nav__link {
        padding: 0.875rem 1.25rem;
    }

    .nav__icon-wrapper {
        width: 36px;
        height: 36px;
    }

    .nav__icon {
        width: 20px;
        height: 20px;
    }

    .nav__text {
        font-size: 1rem;
    }
}

@media (max-width: 768px) {
    .burger-menu {
        width: 380px;
    }

    .burger-menu__close {
        top: 1.25rem;
        right: 1.25rem;
        width: 36px;
        height: 36px;
    }

    .close__icon {
        width: 18px;
        height: 18px;
    }

    .burger-menu__content {
        padding: 4rem 1.5rem 1.5rem;
    }

    .burger-menu__title {
        font-size: 2rem;
    }

    .nav__link {
        padding: 0.75rem 1rem;
    }

    .nav__icon-wrapper {
        width: 32px;
        height: 32px;
        border-radius: 10px;
    }

    .nav__icon {
        width: 18px;
        height: 18px;
    }

    .footer__logout {
        padding: 0.875rem;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .burger-menu {
        width: 85%;
    }

    .burger-menu__close {
        top: 1rem;
        right: 1rem;
        width: 32px;
        height: 32px;
    }

    .close__icon {
        width: 16px;
        height: 16px;
    }

    .burger-menu__content {
        padding: 3.5rem 1.25rem 1.25rem;
    }

    .burger-menu__title {
        font-size: 1.8rem;
    }

    .burger-menu__title::after {
        width: 40px;
        height: 3px;
        bottom: -8px;
    }

    .nav__list {
        gap: 0.5rem;
    }

    .nav__link {
        padding: 0.625rem 0.875rem;
        gap: 0.75rem;
    }

    .nav__icon-wrapper {
        width: 28px;
        height: 28px;
        border-radius: 8px;
    }

    .nav__icon {
        width: 16px;
        height: 16px;
    }

    .nav__text {
        font-size: 0.95rem;
    }

    .footer__logout {
        padding: 0.75rem;
        font-size: 0.95rem;
    }

    .logout__icon {
        width: 18px;
        height: 18px;
    }
}

@media (max-width: 360px) {
    .burger-menu__title {
        font-size: 1.6rem;
    }

    .nav__link {
        padding: 0.5rem 0.75rem;
    }

    .nav__icon-wrapper {
        width: 24px;
        height: 24px;
    }

    .nav__icon {
        width: 14px;
        height: 14px;
    }

    .nav__text {
        font-size: 0.9rem;
    }
}
</style>

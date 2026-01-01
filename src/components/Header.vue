<script setup lang="ts"></script>

<template>
    <header class="header">
        <div class="container">
            <div class="header__content">
                <router-link to="/">
                    <div class="header__logo">
                        <img
                            src="../assets/img/header/header-logo.png"
                            alt="Food Flow"
                            class="logo__img"
                        />
                        <div class="logo__text">
                            <h2>FoodFlow</h2>
                            <h3>рецепты и продкуты для вас</h3>
                        </div>
                    </div>
                </router-link>
                <router-link to="/">
                    <div class="header__profile">
                        <img
                            src="../assets/img/header/header-profile.png"
                            alt="Профиль"
                            class="profile__img"
                        />
                    </div>
                </router-link>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    top: 0;
    padding: 25px 0px;
    background-color: var(--color-yellow);
    position: relative;
    animation: fromTopToBottom 0.5s;
}

.header__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header__logo {
    display: flex;
    align-items: center;
    column-gap: 13px;
}

.logo__img {
    width: 60px;
}

.logo__text h2 {
    font-family: var(--font-second);
    font-weight: 400;
    font-size: 38px;
    color: var(--color-black);
    line-height: 40px;
}

.logo__text h3 {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 18px;
    color: #614f09;
}

.profile__img {
    width: 40px;
}

@media (max-width: 1024px) {
    .header {
        padding: 20px 0px;
    }

    .header__logo {
        column-gap: 10px;
    }

    .logo__img {
        width: 50px;
    }

    .logo__text h2 {
        font-size: 34px;
        line-height: auto;
    }

    .logo__text h3 {
        font-size: 16px;
    }

    .profile__img {
        width: 30px;
    }
}

@media (max-width: 768px) {
    .header {
        padding: 15px 0px;
    }

    .header__logo {
        column-gap: 10px;
    }

    .logo__img {
        width: 50px;
    }

    .logo__text h2 {
        font-size: 28px;
        line-height: 28px;
    }

    .logo__text h3 {
        font-size: 16px;
    }

    .profile__img {
        width: 30px;
    }
}

@media (max-width: 425px) {
    .header {
        padding: 13px 0px;
    }

    .logo__img {
        width: 40px;
    }

    .logo__text h2 {
        font-size: 28px;
        line-height: 28px;
    }

    .logo__text h3 {
        display: none;
    }
}
</style>

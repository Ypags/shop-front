<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
import { jwtDecode } from "jwt-decode";
import { ref, computed } from "vue";
import router from "@/router/router";

const hasToken = ref(false);

const userInfo = computed(() => jwtDecode(localStorage.getItem("token")));
const userEmail = computed(
  () =>
    userInfo.value[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ] || "",
);
const userRole = computed(
  () =>
    userInfo.value[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] || "",
);

if (localStorage.getItem("token")) {
  hasToken.value = true;
}

function logOut() {
  localStorage.removeItem("token");
  router.push("/");
}
</script>

<template>
  <div class="container">
    <Header></Header>
    <div class="mt-2 mb-5 flex items-center gap-1.5">
      <RouterLink to="/">Главная</RouterLink>
      <svg
        width="7"
        height="10"
        viewBox="0 0 7 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.88906 5L0 1.11094L1.11094 0L6.11094 5L1.11094 10L0 8.88906L3.88906 5Z"
          fill="#e0bea2"
        />
      </svg>
      <RouterLink to="/profile">Профиль</RouterLink>
    </div>

    <div v-if="!hasToken">
      <div class="flex min-h-110 flex-col items-center justify-center">
        <h2 class="text-2xl">Вы не зашли в аккаунт</h2>
        <div class="mt-12">
          <RouterLink
            to="/sign-up"
            class="button--beige mr-10 px-4 py-2.5 text-center"
            >Создать новый</RouterLink
          >
          <RouterLink to="/sign-in" class="button--white px-5 py-2 text-center"
            >Войти в аккаунт</RouterLink
          >
        </div>
      </div>
    </div>

    <main v-else class="min-h-110">
      <div class="rounded-lg border-1 p-5">
        <h1>ПРОФИЛЬ</h1>
        <h3>Ваша почта: {{ userEmail }}</h3>
        <h3>Ваша роль: {{ userRole }}</h3>
        <button @click="logOut" class="cursor-pointer text-red-500">
          Выйти из аккаунта
        </button>
      </div>
    </main>
  </div>

  <Footer></Footer>
</template>

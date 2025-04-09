<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
import { jwtDecode } from "jwt-decode";
import { ref, computed } from "vue";
import router from "@/router/router";
import axios from "axios";
import Toast from "@/components/UI/toast.vue";
import { useToastStore } from "@/stores/toast";

const hasToken = ref(false);
const token = ref(null);
const toastStore = useToastStore();

if (localStorage.getItem("token")) {
  hasToken.value = true;
}

const userInfo = computed(() => jwtDecode(localStorage.getItem("token")));
const userEmail = computed(() => userInfo.value["email"] || "");
const userRole = computed(
  () =>
    userInfo.value[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] || "",
);
const userNickname = computed(() => userInfo.value["nickname"] || "");
const userName = computed(() => userInfo.value["name"] || "");
const userSurname = computed(() => userInfo.value["family_name"] || "");
const userAddress = computed(() => userInfo.value["address"] || "");

function logOut() {
  localStorage.removeItem("token");
  toastStore.showToast("Вы успешно вышли из аккаунта", "success");
  router.push("/");
}

async function sendData() {
  const newUser = {
    email: "admin@gmail.com",
    password: "admin123",
    rememberMe: true,
  };
  const data = await axios
    .post("http://localhost:5082/api/Auth/login", newUser)
    .then(function (response) {
      if (response.status == 200) {
        console.log(response);
        token.value = response.data.token;
        localStorage.setItem("token", response.data.token);
        if (localStorage.getItem("token")) {
          router.push("/");
        }
      }
    });
}
</script>

<template>
  <Toast />
  <div class="flex min-h-screen flex-col bg-gray-50">
    <Header class="container"></Header>

    <div class="container mt-2 mb-5 flex items-center gap-1.5">
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
      <RouterLink to="/catalog">Профиль</RouterLink>
    </div>

    <!-- Основной контент -->
    <div v-if="!hasToken" class="flex flex-1 items-center justify-center">
      <div class="px-4 text-center">
        <h2 class="mb-8 text-2xl font-medium text-gray-900">
          Вы не зашли в аккаунт
        </h2>
        <button
          @click="sendData"
          class="flex cursor-pointer items-center text-green-400 transition-colors hover:text-green-600"
        >
          Войти как админ
        </button>
        <div class="space-x-4">
          <RouterLink
            to="/sign-up"
            class="bg-beige hover:bg-beige/90 inline-block rounded-lg px-6 py-3 text-white transition-colors"
            >Создать новый</RouterLink
          >
          <RouterLink
            to="/sign-in"
            class="inline-block rounded-lg border border-gray-200 bg-white px-6 py-3 text-gray-800 transition-colors hover:border-gray-300"
            >Войти в аккаунт</RouterLink
          >
        </div>
      </div>
    </div>

    <main v-else class="container mx-auto flex-1 px-4 py-8">
      <div class="mx-auto max-w-2xl space-y-6">
        <!-- Основная информация -->
        <div
          class="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div class="border-b border-gray-100 pb-4">
            <h1 class="text-2xl font-semibold text-gray-900">ПРОФИЛЬ</h1>
          </div>

          <div class="space-y-3 pb-2">
            <div class="flex items-center space-x-2">
              <svg
                class="text-beige h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div class="text-gray-600">
                <span class="text-sm">Ваше имя и фамилия:</span>
                <span class="ml-2 text-gray-900"
                  >{{ userName }} {{ userSurname }}</span
                >
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <svg
                class="text-beige h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div class="text-gray-600">
                <span class="text-sm">Ваша почта:</span>
                <span class="ml-2 text-gray-900">{{ userEmail }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <svg
                class="text-beige h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <div class="text-gray-600">
                <span class="text-sm">Ваш никнейм:</span>
                <span class="ml-2 text-gray-900">{{ userNickname }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <svg
                class="text-beige h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div class="text-gray-600">
                <span class="text-sm">Ваш адрес:</span>
                <span class="ml-2 text-gray-900">{{ userAddress }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <svg
                class="text-beige h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <div class="text-gray-600">
                <span class="text-sm">Ваша роль:</span>
                <span class="ml-2 text-gray-900">{{ userRole }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопка выхода -->
        <div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <button
            @click="logOut"
            class="flex cursor-pointer items-center text-red-400 transition-colors hover:text-red-600"
          >
            <svg
              class="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </main>

    <Footer></Footer>
  </div>
</template>

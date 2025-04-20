<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
import { jwtDecode } from "jwt-decode";
import { ref, computed } from "vue";
import router from "@/router/router";
import axios from "axios";
import { useToastStore } from "@/stores/toast";

const hasToken = ref(false);
const token = ref(null);
const toastStore = useToastStore();
const isEditing = ref(false);

if (localStorage.getItem("token")) {
  hasToken.value = true;
  token.value = localStorage.getItem("token");
}

const userInfo = computed(() => jwtDecode(localStorage.getItem("token")));

// Инфа о пользователе
const userDisplay = computed(() => ({
  name: userInfo.value["name"] || "Отсутствует",
  family_name: userInfo.value["family_name"] || "Отсутствует",
  email: userInfo.value["email"] || "Отсутствует",
  nickname: userInfo.value["nickname"] || "Отсутствует",
  address: userInfo.value["address"] || "Отсутствует",
  role:
    userInfo.value[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] || "",
  id: userInfo.value["sub"] || "",
}));

// Форма для редактирования
const editedUser = ref({
  nickName: "",
  firstName: "",
  surName: "",
  address: "",
});

// Начало редактирования
function startEditing() {
  editedUser.value = {
    nickName: userDisplay.value.nickname,
    firstName: userDisplay.value.name,
    surName: userDisplay.value.family_name,
    address: userDisplay.value.address,
  };
  isEditing.value = true;
}

// Сохранение изменений
async function saveChanges() {
  try {
    const data = await axios.put(
      `http://localhost:5082/api/Auth/updateUser/${userDisplay.value.id}`,
      editedUser.value,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    );
    console.log(data);
    isEditing.value = false;
    localStorage.removeItem("token");
    toastStore.showToast("Изменения сохранены", "success");
    setTimeout(() => {
      router.go(0);
    }, 1000);
  } catch (error) {
    toastStore.showToast("Ошибка при сохранении изменений", "error");
    console.log(error);
  }
}

// Отмена редактирования
function cancelEditing() {
  isEditing.value = false;
}

// Войти как админ
async function sendData() {
  const newUser = {
    email: "admin@gmail.com",
    password: "admin123",
    rememberMe: true,
  };
  try {
    const data = await axios.post(
      "http://localhost:5082/api/Auth/login",
      newUser,
    );
    console.log(data);
    token.value = data.data.token;
    localStorage.setItem("token", token.value);
    toastStore.showToast("Вы успешно вошли как администратор", "success");
    setTimeout(() => {
      router.go(0);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}

// Выйти из аккаунта
function logOut() {
  localStorage.removeItem("token");
  toastStore.showToast("Вы успешно вышли из аккаунта", "success");
  setTimeout(() => {
    router.push("/");
  }, 1000);
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <Header class="container"></Header>

    <!-- Хлебные крошки -->
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

    <!-- Не автризованн -->
    <div v-if="!hasToken" class="flex flex-1 items-center justify-center">
      <div class="px-4 text-center">
        <h2 class="mb-8 text-2xl font-medium text-gray-900">
          Вы не зашли в аккаунт
        </h2>
        <button
          @click="sendData"
          class="mb-4 flex w-full items-center justify-center space-x-2 rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50"
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

    <!-- Авторизованн -->
    <main v-else class="container mx-auto flex-1 px-4 py-8">
      <div class="mx-auto max-w-3xl">
        <!-- Карточка профиля -->
        <div class="overflow-hidden rounded-2xl bg-white shadow-lg">
          <!-- Заголовок -->
          <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
            <div class="flex items-center justify-between">
              <h1 class="text-xl font-semibold text-gray-900">
                Профиль пользователя
              </h1>
              <div class="flex space-x-2">
                <button
                  v-if="!isEditing"
                  @click="startEditing"
                  class="bg-beige hover:bg-beige/90 flex h-9 items-center space-x-2 rounded-lg px-4 text-sm font-medium text-white transition-colors"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Изменить</span>
                </button>
                <template v-else>
                  <button
                    @click="cancelEditing"
                    class="flex h-9 items-center space-x-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Отменить</span>
                  </button>
                  <button
                    class="bg-beige hover:bg-beige/90 flex h-9 items-center space-x-2 rounded-lg px-4 text-sm font-medium text-white transition-colors"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span @click="saveChanges">Сохранить</span>
                  </button>
                </template>
              </div>
            </div>
          </div>

          <!-- Основная информация -->
          <div class="p-6">
            <div class="space-y-6">
              <!-- Имя и фамилия -->
              <div class="flex items-start space-x-4">
                <div
                  class="bg-beige/10 text-beige flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <svg
                    class="h-5 w-5"
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
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Имя и фамилия</label
                  >
                  <div v-if="!isEditing" class="mt-1 text-gray-900">
                    {{ userDisplay.name }} {{ userDisplay.family_name }}
                  </div>
                  <div v-else class="mt-1 flex space-x-2">
                    <input
                      type="text"
                      v-model="editedUser.firstName"
                      class="focus:border-beige focus:ring-beige w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:ring-1 focus:outline-none"
                      placeholder="Имя"
                    />
                    <input
                      type="text"
                      v-model="editedUser.surName"
                      class="focus:border-beige focus:ring-beige w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:ring-1 focus:outline-none"
                      placeholder="Фамилия"
                    />
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start space-x-4">
                <div
                  class="bg-beige/10 text-beige flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <svg
                    class="h-5 w-5"
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
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Email</label
                  >
                  <div class="mt-1 text-gray-900">{{ userDisplay.email }}</div>
                </div>
              </div>

              <!-- Никнейм -->
              <div class="flex items-start space-x-4">
                <div
                  class="bg-beige/10 text-beige flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <svg
                    class="h-5 w-5"
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
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Никнейм</label
                  >
                  <div v-if="!isEditing" class="mt-1 text-gray-900">
                    {{ userDisplay.nickname }}
                  </div>
                  <input
                    v-else
                    type="text"
                    v-model="editedUser.nickName"
                    class="focus:border-beige focus:ring-beige mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:ring-1 focus:outline-none"
                    placeholder="Никнейм"
                  />
                </div>
              </div>

              <!-- Адрес -->
              <div class="flex items-start space-x-4">
                <div
                  class="bg-beige/10 text-beige flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <svg
                    class="h-5 w-5"
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
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Адрес</label
                  >
                  <div v-if="!isEditing" class="mt-1 text-gray-900">
                    {{ userDisplay.address }}
                  </div>
                  <input
                    v-else
                    type="text"
                    v-model="editedUser.address"
                    class="focus:border-beige focus:ring-beige mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:ring-1 focus:outline-none"
                    placeholder="Адрес"
                  />
                </div>
              </div>

              <!-- Роль -->
              <div class="flex items-start space-x-4">
                <div
                  class="bg-beige/10 text-beige flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <svg
                    class="h-5 w-5"
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
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Роль</label
                  >
                  <p class="mt-1 text-gray-900">{{ userDisplay.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопка выхода -->
        <div class="mt-6 flex justify-end">
          <button
            @click="logOut"
            class="flex items-center space-x-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <svg
              class="h-4 w-4"
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
            <span>Выйти из аккаунта</span>
          </button>
        </div>
      </div>
    </main>

    <Footer></Footer>
  </div>
</template>

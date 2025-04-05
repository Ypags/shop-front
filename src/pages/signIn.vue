<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const token = ref(null);

const email = ref("");
const pass = ref("");
const rememberMe = ref(false);

const alert = ref(null);

async function sendData() {
  const newUser = {
    email: email.value,
    password: pass.value,
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
    })

    .catch(function (error) {
      console.log(error);
      alert.value = "Ошибка. Неправильный пароль";
    });
  return data;
}
</script>

<template>
  <div
    class="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Авторизация
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="sendData" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="focus:ring-beige focus:border-beige block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                placeholder="Ваш e-mail*"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Пароль</label
            >
            <div class="mt-1">
              <input
                id="password"
                v-model="pass"
                type="password"
                required
                class="focus:ring-beige focus:border-beige block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                placeholder="Ваш пароль*"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                v-model="rememberMe"
                class="text-beige focus:ring-beige h-4 w-4 rounded border-gray-300"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Запомнить меня
              </label>
            </div>
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-gray-700 underline hover:text-black"
              >
                Забыли пароль?
              </a>
            </div>
          </div>

          <div v-if="alert" class="text-center text-sm text-red-600">
            {{ alert }}
          </div>

          <div>
            <button
              type="submit"
              class="button--beige flex w-full justify-center rounded-md py-2 text-sm font-medium shadow-sm"
            >
              Войти
            </button>
          </div>
          <div class="text-center text-sm">
            <RouterLink
              to="/sign-up"
              class="font-medium text-gray-700 underline hover:text-black"
            >
              Еще не зарегистрированы?
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToastStore } from "@/stores/toast";

import { useRouter } from "vue-router";
const router = useRouter();
const toastStore = useToastStore();
const user = ref({
  email: "",
  password: "",
  nickName: "",
  firstName: "",
  surName: "",
});

async function sendData() {
  const newUser = {
    email: user.value.email,
    password: user.value.password,
    nickName: user.value.nickName,
    firstName: user.value.firstName,
    surName: user.value.surName,
  };

  const data = await axios
    .post("http://localhost:5082/api/Auth/register", newUser)
    .then(function (response) {
      console.log(response);
      toastStore.showToast("Вы успешно зарегистрировались", "success");
      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
      // const newUser = {
      //   email: user.value.email,
      //   password: user.value.password,
      // };
      // const data = axios
      //   .post("http://localhost:5082/api/Auth/login", newUser)
      //   .then(function (response) {
      //     console.log(response);
      //     localStorage.setItem("token", response.data.token);
      //     router.push("/");
      //   });
    })

    .catch(function (error) {
      if (error.response && error.response.status === 415) {
        toastStore.showToast(
          "Формат содержимого не поддерживается сервером",
          "error",
        );
      } else if (error.response && error.response.status === 400) {
        toastStore.showToast(
          "Cервер не может обработать данные в том виде, в котором вы их отправляете",
          "error",
        );
      } else {
        console.error("Ошибка:", error.message);
        toastStore.showToast("Произошла ошибка при регистрации", "error");
      }
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
        Регистрация
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="sendData" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700"
                >Имя</label
              >
              <div class="mt-1">
                <input
                  v-model="user.firstName"
                  type="text"
                  required
                  class="focus:ring-beige focus:border-beige block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                  placeholder="Ваше имя*"
                />
              </div>
            </div>
            <div>
              <label
                for="surName"
                class="block text-sm font-medium text-gray-700"
                >Фамилия</label
              >
              <div class="mt-1">
                <input
                  v-model="user.surName"
                  type="text"
                  required
                  class="focus:ring-beige focus:border-beige block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                  placeholder="Ваша фамилия*"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              for="nickName"
              class="block text-sm font-medium text-gray-700"
              >Никнейм</label
            >
            <div class="mt-1">
              <input
                v-model="user.nickName"
                type="text"
                required
                class="focus:ring-beige focus:border-beige block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                placeholder="Ваш никнейм*"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <div class="mt-1">
              <input
                v-model="user.email"
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
                v-model="user.password"
                type="password"
                required
                class="focus:ring-beige focus:border-beige block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                placeholder="Ваш пароль*"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="button--beige flex w-full justify-center rounded-md py-2 text-sm font-medium shadow-sm"
            >
              Зарегистрироваться
            </button>
          </div>

          <div class="text-center text-sm">
            <RouterLink
              to="/sign-in"
              class="font-medium text-gray-700 underline hover:text-black"
            >
              Уже есть аккаунт?
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

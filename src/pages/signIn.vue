<script setup>
import { ref } from "vue";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
// import jwt from "jsonwebtoken";

const router = useRouter();

const email = ref("");
const pass = ref("");
const token = ref(null);

const alert = ref(null);

async function sendData() {
  const newUser = {
    email: email.value,
    password: pass.value,
  };
  const data = await axios
    .post("http://localhost:5082/api/Auth/login", newUser)
    .then(function (response) {
      if (response.status == 200) {
        console.log(response);
        token.value = response.data.token;
        // ------------------------------
        const userInfo = jwtDecode(token.value);
        const role =
          userInfo[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        console.log(role);
        // ------------------------------
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
  <div class="my-auto flex h-screen w-screen items-center justify-center">
    <form @submit.prevent="sendData" class="flex w-2/7 flex-col gap-3">
      <h2 class="mb-5 text-center text-xl">Авторизация</h2>
      <input
        class="input py-2"
        v-model="email"
        type="email"
        placeholder="Ваш e-mail*"
      />
      <input
        class="input py-2"
        v-model="pass"
        type="password"
        placeholder="Ваш пароль*"
      />
      <div class="flex justify-between">
        <p class="cursor-pointer underline">Забыли пароль?</p>
        <RouterLink to="/sign-up" class="underline">Нет аккаунта?</RouterLink>
      </div>
      <h3 v-if="alert" class="text-red-600">{{ alert }}</h3>
      <button class="button--beige py-2" type="submit">ВОЙТИ</button>
    </form>
  </div>
</template>

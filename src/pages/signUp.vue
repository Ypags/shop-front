<script setup>
import { ref } from "vue";
import axios from "axios";

import { useRouter } from "vue-router";
const router = useRouter();

const email = ref(null);
const pass = ref(null);

async function sendData() {
  const newUser = {
    email: email.value,
    password: pass.value,
  };
  if (newUser != null) {
    const data = await axios
      .post("http://localhost:5082/api/Auth/register", newUser)
      .then(function (response) {
        console.log(response);
        router.push("/sign-in");
      })

      .catch(function (error) {
        console.log(error);
      });
    return data;
  }
}
</script>

<template>
  <RouterLink to="/">Главная</RouterLink>
  <div class="my-auto flex h-screen w-screen items-center justify-center">
    <form @submit.prevent="sendData" class="flex w-2/7 flex-col gap-3">
      <h2 class="mb-3 text-center text-xl">Регистрация</h2>
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
      <RouterLink to="/sign-in" class="flex justify-end underline"
        >Уже есть аккаунт?</RouterLink
      >
      <button class="button--beige py-2" type="submit">Продолжить</button>
    </form>
  </div>
</template>

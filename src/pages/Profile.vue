<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

if (!localStorage.getItem("token")) {
  router.push("/sign-up");
}
</script>

<template>
  <h1>ПРОФИЛЬ</h1>
</template>

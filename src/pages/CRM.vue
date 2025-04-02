<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
import Card from "../components/Card/ProductCardCRM.vue";

import axios from "axios";
import { onMounted, ref } from "vue";

import { jwtDecode } from "jwt-decode";
import router from "@/router/router";

try {
  const userInfo = jwtDecode(localStorage.getItem("token"));
  const userRole =
    userInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  if (userRole != "Admin") {
    router.push("/сrm");
  }
} catch {
  router.push("/сrm");
}

const products = ref([]);

onMounted(async () => {
  try {
    const response = await axios
      .get("http://localhost:5082/api/Product/getAll")
      .then((res) => res.data);
    products.value = response;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="flex h-screen flex-col overflow-y-hidden">
    <Header class="container"></Header>
    <div class="bg-beige py-4">
      <div class="text-10 container flex items-center justify-between">
        <h3 class="text-2xl text-white">Ваши товары</h3>
        <RouterLink
          class="cursor-pointer rounded-lg border-1 border-white px-6 py-2 text-white"
          to="/addProduct"
          >Добавить товар</RouterLink
        >
      </div>
    </div>
    <main class="container mb-2 overflow-y-auto">
      <Card
        v-for="product in products"
        :key="product.productId"
        :product="product"
      />
    </main>
  </div>
</template>

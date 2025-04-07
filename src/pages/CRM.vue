<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Card from "../components/Card/ProductCardCRM.vue";
import Toast from "@/components/UI/toast.vue";

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
  <Toast />
  <div class="flex min-h-screen flex-col bg-gray-50">
    <Header class="container"></Header>

    <!-- Header Section -->
    <div class="bg-beige py-4">
      <div class="container mx-auto flex h-8 items-center justify-between px-4">
        <div class="flex items-center space-x-4">
          <h3 class="text-xl font-semibold text-white">Управление товарами</h3>
          <span class="rounded-full bg-white/20 px-3 py-1 text-sm text-white">
            {{ products.length }} товаров
          </span>
        </div>
        <RouterLink
          to="/addProduct"
          class="flex items-center space-x-2 rounded-lg bg-white/20 px-6 py-2.5 text-white transition-colors hover:bg-white/30"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Добавить товар</span>
        </RouterLink>
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto flex-1 px-4 py-6">
      <div class="rounded-xl bg-white p-6 shadow-sm">
        <!-- Table Header -->
        <div class="mb-4 grid grid-cols-4 gap-4 border-b border-gray-100 pb-4">
          <div class="font-medium text-gray-500">Товар</div>
          <div class="justify-self-center font-medium text-gray-500">
            Размер
          </div>
          <div class="justify-self-center font-medium text-gray-500">Цена</div>
          <div class="justify-self-center font-medium text-gray-500">
            Действия
          </div>
        </div>

        <!-- Products List -->
        <div class="space-y-4">
          <Card
            v-for="product in products"
            :key="product.productId"
            :product="product"
          />
        </div>
      </div>
    </main>
  </div>
</template>

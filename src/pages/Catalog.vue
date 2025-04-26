<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Card from "../components/Card/ProductCard.vue";
import Footer from "../components/Footer/Footer.vue";
import { useCategoriesStore } from "@/stores/categories";
import { RouterLink } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";

const categoriesStore = useCategoriesStore();
const products = ref([]);
const selectedCategory = ref(null);
const selectedSize = ref(null);
const priceSort = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(
      "http://localhost:5082/api/Product/getAll",
    );
    products.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
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
      <RouterLink to="/catalog">Каталог</RouterLink>
    </div>
    <main class="flex gap-8">
      <!-- Категории -->
      <aside class="w-64 shrink-0">
        <h3 class="mb-4 text-lg font-medium">КАТАЛОГ</h3>
        <ul class="space-y-2">
          <li
            v-for="category in categoriesStore.getCategories"
            :key="category.slug"
            class="cursor-pointer rounded px-3 py-2 text-sm transition-colors hover:bg-gray-100"
            :class="{
              'bg-beige hover:bg-beige text-white':
                selectedCategory === category.slug,
            }"
            @click="selectedCategory = category.slug"
          >
            {{ category.name }}
          </li>
        </ul>
      </aside>

      <!-- Основной контент -->
      <div class="flex-1">
        <!-- Фильтры -->
        <div
          class="mb-8 flex items-center justify-between border-b border-gray-200 pb-4"
        >
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-600">Размер</span>
              <div class="flex gap-1">
                <button
                  v-for="size in ['XS', 'S', 'M', 'L', 'XL']"
                  :key="size"
                  class="hover:border-beige hover:text-beige h-8 w-8 rounded-full border text-sm"
                >
                  {{ size }}
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-600">Сортировка</span>
            <select
              v-model="priceSort"
              class="focus:border-beige focus:ring-beige rounded border border-gray-200 px-3 py-1.5 text-sm focus:ring-1 focus:outline-none"
            >
              <option value="">По умолчанию</option>
              <option value="asc">По возрастанию цены</option>
              <option value="desc">По убыванию цены</option>
            </select>
          </div>
        </div>

        <!-- Товары -->
        <div class="grid grid-cols-3 gap-6">
          <Card
            v-for="product in products"
            :key="product.productId"
            :product="product"
          />
        </div>
      </div>
    </main>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const route = useRoute();
const product = ref();
const selectedImage = ref("");

// Отображение продукта по id
onMounted(async () => {
  const productId = route.params.id;
  const response = await axios.get(
    `http://localhost:5082/api/Product/getById?id=${productId}`,
  );
  product.value = response.data;
  selectedImage.value = product.value.imageUrl[0];
  console.log(response);
});

// Выбор изображения
function selectImage(image) {
  selectedImage.value = image;
}
</script>

<template>
  <div v-if="product" class="container">
    <Header />
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
      <span class="cursor-pointer">{{ product.name }}</span>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- Левая часть - Галерея изображений -->
      <div class="flex gap-4">
        <div class="flex w-20 flex-col gap-3">
          <img
            v-for="image in product.imageUrl"
            :key="image"
            :src="image"
            @click="selectImage(image)"
            alt=""
            class="h-20 w-20 cursor-pointer object-cover hover:opacity-80"
          />
        </div>
        <div class="w-150">
          <img
            :src="selectedImage"
            alt=""
            class="aspect-[3/4] h-150 w-full object-cover"
          />
        </div>
      </div>

      <!-- Правая часть - Информация о продукте -->
      <div class="flex flex-col">
        <span class="text-beige">арт. {{ product.articleNumber }}</span>
        <h1 class="text-2xl font-light">{{ product.name }}</h1>
        <p class="my-6 text-xl">{{ product.price }} ₽</p>

        <!-- Выбор размера -->
        <div class="flex flex-col gap-2">
          <select class="w-full appearance-none border bg-white p-3">
            <option value="" disabled selected>Выберите размер</option>
            <option v-for="size in product.size" :key="size">
              {{ size }}
            </option>
          </select>
        </div>

        <!-- Подробности -->
        <div class="border-t">
          <div class="py-4">
            <h3 class="mb-2 font-medium">Подробности</h3>
            <div class="text-sm text-gray-600">
              <p class="mb-2">{{ product.description }}</p>
              <p>Состав: 60% Шерсть, 40% Полиэстер</p>
              <p>Подкладка: 100% Полиэстер</p>
              <p>Утеплитель: 40% Пух, 60% Перо</p>
              <ul class="mt-2">
                <li>- Не стирать</li>
                <li>- Гладить при температуре утюга до 110°С</li>
                <li>- Не отбеливать</li>
                <li>- Сухая химчистка</li>
                <li>- Барабанная сушка запрещена</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

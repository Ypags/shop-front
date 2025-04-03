<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const route = useRoute(); // Получаем параметры маршрута
const product = ref();

onMounted(async () => {
  const productId = route.params.id; // Берём `id` из URL
  const response = await axios.get(
    `http://localhost:5082/api/Product/getById?id=${productId}`,
  );
  product.value = response;
  console.log(response);
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
      <RouterLink to="/catalog">Куртка</RouterLink>
    </div>
    <div v-for="pd in product" :key="pd.productId" :product="pd">
      <div><img class="w-50" :src="pd.imageUrl" alt="" /></div>
      <h2>{{ pd.name }}</h2>
      <h2>{{ pd.price }}</h2>
      <h2>{{ pd.size }}</h2>
    </div>
  </div>
  <Footer></Footer>
</template>

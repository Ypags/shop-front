<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Card from "../components/Card/ProductCard.vue";
import Footer from "../components/Footer/Footer.vue";

import { watch, ref } from "vue";
import { RouterLink } from "vue-router";

let data = ref([]);

watch(async () => {
  const response = await fetch(
    "https://67a5e90b510789ef0df9b1fc.mockapi.io/products",
  );
  data.value = await response.json();
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
    <main>
      <div class="aside-filter">
        <aside>
          <h3>КАТАЛОГ</h3>
          <ul>
            <li>New</li>
            <li>Bestsellers</li>
            <li>Верхняя одежда</li>
            <li>Шубы</li>
            <li>Тренчи</li>
            <li>Пальто</li>
            <li>Пуховики и жилеты</li>
            <li>Костюмы</li>
            <li>Жакеты</li>
            <li>Платья</li>
            <li>Рубашки и блузы</li>
            <li>Юбки</li>
            <li>Футболки и топы</li>
            <li>Аксессуары</li>
          </ul>
        </aside>
        <div class="main">
          <div class="filter">
            <span>Размер</span>
            <span>Цвет</span>
            <span>Цена</span>
            <span>Сортировать по цене</span>
          </div>
          <div class="product-cards">
            <Card
              v-for="d in data"
              :key="d.id"
              :img="d.img"
              :name="d.name"
              :price="d.price"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
  <Footer></Footer>
</template>

<style scoped>
aside ul {
  margin-top: 30px;
}
aside ul li {
  margin-top: 10px;
}

.aside-filter {
  display: flex;
}

.main {
  margin-left: 100px;
  width: 100%;
}

.filter {
  display: flex;
  gap: 25px;
}

.product-cards {
  display: grid;
  grid-template-columns: 32% 34% 34%;
}
</style>

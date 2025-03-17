<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
import { ref } from "vue";

const productName = ref("");
const productPrice = ref("");
const productCount = ref("");

const products = [];
</script>

<template>
  <div class="container">
    <Header></Header>
    <main class="flex">
      <div>
        <div class="rounded-md border-1 border-dashed border-[#25252548] p-4">
          <img src="../assets/img/CRM/Group 67.png" alt="" />
        </div>
      </div>
      <div class="ml-15 flex flex-col gap-5">
        <RouterLink to="/crm">← Назад</RouterLink>
        <input
          class="input"
          v-model="productName"
          type="text"
          placeholder="Название товара"
        />
        <input
          class="input"
          v-model="productPrice"
          type="text"
          placeholder="Цена"
        />
        <input
          class="input"
          v-model="productCount"
          type="text"
          placeholder="Осталось"
        />
        <h5>Состав и уход</h5>
        <textarea class="input min-h-50 w-lg" name="" id=""></textarea>
        <div>
          <RouterLink
            to="/crm"
            class="button--white mr-10 rounded-md px-7 py-2.5"
            >Отмена</RouterLink
          >
          <button class="button--beige h-10 w-35 rounded-md">Сохранить</button>
        </div>
      </div>
      <h1>{{ productName }}</h1>
      <h1>{{ productPrice }}</h1>
      <h1>{{ productCount }}</h1>
    </main>
  </div>
  <Footer></Footer>
</template>

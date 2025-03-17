<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
</script>

<template>
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
  <main class="container my-12">
    <section class="my-3 flex items-center justify-between">
      <div class="flex">
        <img src="../assets/img/CRM/crm-item1.jpg" alt="" />
        <div class="ml-3">
          <p class="text-beige mb-4">арт. 1589956</p>
          <h5>Кремовое пальто</h5>
        </div>
      </div>
      <span>XXS XS S M L</span>
      <span class="border-1 px-4 py-2 font-bold">3150 ₽</span>
      <div class="flex gap-5">
        <img src="../assets/img/crm/edit.svg" alt="" />
        <img src="../assets/img/crm/delete.svg" alt="" />
      </div>
    </section>
    <hr class="bg-mainGray" />
  </main>
  <Footer></Footer>
</template>

<script setup>
defineProps({
  product: Object,
});
</script>

<template>
  <section class="my-3 flex items-center justify-between">
    <div class="flex">
      <img src="../../assets/img/CRM/crm-item1.jpg" alt="" />
      <div class="ml-3">
        <p class="text-beige mb-4">арт. 1589956</p>
        <h5>{{ product.name }}</h5>
      </div>
    </div>
    <span>{{ product.size }}</span>
    <span class="w-20 border-1 px-4 py-2 font-bold">{{ product.price }}₽</span>
    <div class="flex gap-5">
      <img src="../assets/img/crm/edit.svg" alt="" />
      <img src="../assets/img/crm/delete.svg" alt="" />
    </div>
  </section>
  <hr class="bg-mainGray" />
</template>

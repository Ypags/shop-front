<script setup>
defineProps({
  product: Object,
});
</script>

<template>
  <section class="my-3 grid grid-cols-4 items-center gap-4">
    <div class="flex">
      <img src="../../assets/img/CRM/crm-item1.jpg" alt="" />
      <div class="ml-3">
        <p class="text-beige mb-4">арт. {{ product.articleNumber }}</p>
        <h5>{{ product.name }}</h5>
      </div>
    </div>
    <span class="justify-self-center">{{ product.size }}</span>
    <span class="w-23 justify-self-end border-1 py-2 text-center font-bold"
      >{{ product.price }}₽</span
    >
    <div class="flex gap-5 justify-self-center">
      <img src="../../assets/img/CRM/edit.svg" alt="" />
      <img src="../../assets/img/CRM/delete.svg" alt="" />
    </div>
  </section>
  <hr class="bg-mainGray" />
</template>

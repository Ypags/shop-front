<script setup>
import { RouterLink } from "vue-router";
defineProps({
  product: Object,
});
</script>

<template>
  <RouterLink :to="`/catalog/product/${product.productId}`" class="product">
    <div :key="product.key">
      <img :src="product.imageUrl[0]" alt="" />
      <h4>{{ product.name }}</h4>
      <h5>{{ product.price }} ₽</h5>
      <span v-for="size in product.size" :key="size">{{ size }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.product img {
  height: 300px;
  width: 250px;
}
.product h4 {
  margin-top: 5px;
}

.product h5 {
  margin: 5px 0;
  font-weight: 700;
}

.product span {
  color: #25252550;
}
</style>

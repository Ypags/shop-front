<script setup>
import Toast from "@/components/UI/toast.vue";
import axios from "axios";
import router from "@/router/router";
import { useToastStore } from "@/stores/toast";
const toastStore = useToastStore();

const token = localStorage.getItem("token");

const props = defineProps({
  product: Object,
});

async function deleteProduct() {
  try {
    await axios.delete(
      `http://localhost:5082/api/Product/delById?id=${props.product.productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    toastStore.showToast("Товар успешно удален", "success");
    setTimeout(() => {
      router.go(0);
    }, 1000);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <section
    class="my-3 grid grid-cols-4 items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
  >
    <div class="flex">
      <img
        class="h-25 w-25 rounded-md object-cover"
        :src="product.imageUrl[0]"
        alt=""
      />
      <div class="ml-3">
        <p class="text-beige mb-2 text-sm font-medium">
          арт. {{ product.articleNumber }}
        </p>
        <h5 class="font-medium text-gray-800">{{ product.name }}</h5>
      </div>
    </div>
    <div class="justify-self-center">
      <span
        v-for="size in product.size"
        :key="size"
        class="ml-3 text-gray-600"
        >{{ size }}</span
      >
    </div>
    <span
      class="w-23 justify-self-center border-1 py-2 text-center font-bold text-gray-800"
      >{{ product.price }}₽</span
    >
    <div class="ml-8 flex gap-5 justify-self-center">
      <img
        class="cursor-pointer transition-opacity hover:opacity-80"
        src="../../assets/img/CRM/edit.svg"
        alt=""
      />
      <img
        @click="deleteProduct"
        class="cursor-pointer transition-opacity hover:opacity-80"
        src="../../assets/img/CRM/delete.svg"
        alt=""
      />
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import router from "@/router/router";
import { useToastStore } from "@/stores/toast";
import { ref } from "vue";
const toastStore = useToastStore();

const token = localStorage.getItem("token");
const isEditing = ref(false);
const availableSizes = ref(["XS", "S", "M", "L", "XL", "XXL"]);

const props = defineProps({
  product: Object,
});

// Локальные переменные для редактирования
const editedProduct = ref({
  Name: props.product.name,
  Desc: props.product.description,
  Price: props.product.price,
  Size: [...props.product.size],
  Quantity: props.product.quantity || 0,
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
    toastStore.showToast("Ошибка при удалении товара", "error");
  }
}

async function saveChanges() {
  try {
    const data = {
      Name: editedProduct.value.Name,
      Desc: editedProduct.value.Desc,
      Price: editedProduct.value.Price,
      Quantity: editedProduct.value.Quantity,
      Size: Array.isArray(editedProduct.value.Size)
        ? editedProduct.value.Size
        : Object.values(editedProduct.value.Size),
    };

    await axios.put(
      `http://localhost:5082/api/Product/editProd/${props.product.productId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    toastStore.showToast("Товар успешно обновлен", "success");
    isEditing.value = false;
    setTimeout(() => {
      router.go(0);
    }, 1000);
  } catch (error) {
    console.error("Ошибка:", error.response?.data || error);
    toastStore.showToast("Ошибка при обновлении товара", "error");
  }
}

function startEditing() {
  isEditing.value = true;
}

function cancelEditing() {
  isEditing.value = false;
  // Сбросить изменения
  editedProduct.value = {
    Name: props.product.name,
    articleNumber: props.product.articleNumber,
    Price: props.product.price,
    Size: [...props.product.size],
    Quantity: props.product.quantity || 0,
  };
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
        <template v-if="!isEditing">
          <h5 class="font-medium text-gray-800">{{ product.name }}</h5>
        </template>
        <input
          v-else
          v-model="editedProduct.Name"
          class="w-full rounded border border-gray-300 px-2 py-1"
          type="text"
        />
      </div>
    </div>
    <div class="justify-self-center">
      <template v-if="!isEditing">
        <span
          v-for="size in product.size"
          :key="size"
          class="ml-3 text-gray-600"
          >{{ size }}</span
        >
      </template>
      <template v-else>
        <div class="grid grid-cols-3 gap-2">
          <label
            v-for="size in availableSizes"
            :key="size"
            class="flex cursor-pointer items-center space-x-2 rounded-md border border-gray-200 p-1.5 hover:bg-gray-50"
          >
            <input
              type="checkbox"
              :value="size"
              v-model="editedProduct.Size"
              class="h-3 w-3 rounded border-gray-300"
            />
            <span class="text-sm text-gray-700">{{ size }}</span>
          </label>
        </div>
      </template>
    </div>
    <div class="justify-self-center">
      <template v-if="!isEditing">
        <div class="border-1 py-1.5 text-center font-bold text-gray-800">
          {{ product.price }}₽
        </div>
        <div class="mt-2 text-sm text-gray-500">
          Осталось: {{ product.quantity || 0 }} шт.
        </div>
      </template>
      <div v-else class="flex flex-col items-center gap-2">
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-500">Цена:</label>
          <input
            v-model="editedProduct.Price"
            class="w-20 rounded border border-gray-300 px-2 py-1 text-center"
            type="number"
          />
          <label class="ml-2 text-sm text-gray-500">Кол-во:</label>
          <input
            v-model="editedProduct.Quantity"
            class="w-20 rounded border border-gray-300 px-2 py-1 text-center"
            type="number"
          />
        </div>
      </div>
    </div>
    <div class="ml-8 flex gap-5 justify-self-center">
      <template v-if="!isEditing">
        <img
          @click="startEditing"
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
      </template>
      <template v-else>
        <button
          @click="cancelEditing"
          class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </button>
        <button
          @click="saveChanges"
          class="bg-beige hover:bg-beige/90 rounded px-3 py-1 text-sm text-white transition-colors"
        >
          Сохранить
        </button>
      </template>
    </div>
  </section>
</template>

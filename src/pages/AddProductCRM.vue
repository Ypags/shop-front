<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
import { useToastStore } from "@/stores/toast";

import axios from "axios";
import { ref } from "vue";

import { jwtDecode } from "jwt-decode";
import router from "@/router/router";

const toastStore = useToastStore();
const token = localStorage.getItem("token");
const imagePreview = ref([]);

try {
  const userInfo = jwtDecode(localStorage.getItem("token"));
  const userRole =
    userInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  if (userRole != "Admin") {
    router.push("/сrm");
  }
} catch {
  localStorage.removeItem("token");
  router.push("/sign-in");
}

const product = ref({
  name: "",
  desc: "",
  price: "",
  size: [],
  quantity: "",
  images: [],
});

function handleImageUpload(event) {
  const files = event.target.files;
  product.value.images.push(files[0]);
  imagePreview.value.push(window.URL.createObjectURL(files[0]));
}

const availableSizes = ref(["XS", "S", "M", "L", "XL", "XXL"]);

const isLoading = ref(false);

async function sendData() {
  isLoading.value = true;
  const formData = new FormData();
  formData.append("name", product.value.name);
  formData.append("desc", product.value.desc);
  formData.append("price", product.value.price);
  product.value.size.forEach((size) => {
    formData.append("size", size);
  });
  formData.append("quantity", product.value.quantity);
  product.value.images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await axios.post(
      "http://localhost:5082/api/Product/createProd",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    // Проверяем содержимое FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    if (response.status == 200) {
      toastStore.showToast("Товар успешно добавлен", "success");
      router.go(-1);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toastStore.showToast("Токен истек. Пожалуйста, войдите снова.", "error");
      setTimeout(() => {
        router.push("/crm");
        localStorage.removeItem("token");
      }, 2000);
    } else if (error.response && error.response.status === 400) {
      toastStore.showToast(
        "Cервер не может обработать данные в том виде, в котором вы их отправляете",
        "error",
      );
    } else {
      console.error("Ошибка:", error.message);
      toastStore.showToast("Произошла ошибка при отправке данных.", "error");
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50">
    <Header class="container"></Header>

    <!-- Header Section -->
    <div class="bg-beige py-4">
      <div class="container mx-auto flex h-8 items-center px-4">
        <RouterLink
          to="/crm"
          class="flex items-center space-x-2 text-white hover:text-white/80"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span class="text-xl">Назад</span>
        </RouterLink>
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto flex-1 px-4 py-8">
      <div class="mx-auto max-w-6xl">
        <div class="rounded-xl bg-white p-8 shadow-sm">
          <h2 class="mb-8 text-2xl font-semibold text-gray-800">
            Добавление товара
          </h2>

          <div class="flex gap-8">
            <!-- Image Upload Section -->
            <div class="w-1/2">
              <div
                class="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center transition-colors hover:border-gray-300"
              >
                <input
                  type="file"
                  @change="handleImageUpload"
                  accept="image/*"
                  class="hidden"
                  id="file-upload"
                  required
                />
                <label for="file-upload" class="cursor-pointer">
                  <div class="space-y-4">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p class="text-sm text-gray-500">
                      Нажмите для загрузки изображения
                    </p>
                  </div>
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <img
                    v-for="(image, index) in imagePreview"
                    :key="index"
                    :src="image"
                    class="mx-auto mt-6 max-h-64 rounded-lg object-cover shadow-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Form Section -->
            <div class="w-1/2">
              <form class="space-y-6" @submit.prevent="sendData">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Название товара</label
                  >
                  <input
                    v-model="product.name"
                    type="text"
                    required
                    class="input focus:border-beige focus:ring-beige w-full rounded-md border-gray-200 py-0.5"
                    placeholder="Введите название"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Описание</label
                  >
                  <textarea
                    v-model="product.desc"
                    required
                    class="input focus:border-beige focus:ring-beige min-h-[120px] w-full rounded-md border-gray-200 py-0.5"
                    placeholder="Введите описание товара"
                  ></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Цена</label
                    >
                    <input
                      v-model="product.price"
                      type="number"
                      required
                      class="input focus:border-beige focus:ring-beige w-full rounded-md border-gray-200 py-0.5"
                      placeholder="Введите цену"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Количество</label
                    >
                    <input
                      v-model="product.quantity"
                      type="number"
                      required
                      class="input focus:border-beige focus:ring-beige w-full rounded-md border-gray-200 py-0.5"
                      placeholder="Введите количество"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Размеры</label
                  >

                  <div class="grid grid-cols-3 gap-2">
                    <label
                      v-for="size in availableSizes"
                      :key="size"
                      class="flex cursor-pointer items-center space-x-2 rounded-md border border-gray-200 p-2 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        :value="size"
                        v-model="product.size"
                        class="h-4 w-4 rounded border-gray-300"
                      />
                      <span class="text-sm text-gray-700">{{ size }}</span>
                    </label>
                  </div>
                  <h2>Выбранные размеры: {{ product.size }}</h2>
                </div>

                <div class="flex justify-end space-x-4 pt-4">
                  <RouterLink
                    to="/crm"
                    class="rounded-lg border border-gray-200 px-6 py-2.5 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Отмена
                  </RouterLink>
                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="bg-beige hover:bg-beige/90 cursor-pointer rounded-lg px-6 py-2.5 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span v-if="isLoading">Сохранение...</span>
                    <span v-else>Сохранить</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

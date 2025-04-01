<script setup>
import Header from "../components/Header/HeaderBeige.vue";
import Footer from "../components/Footer/Footer.vue";
import axios from "axios";
import { ref } from "vue";
import { jwtDecode } from "jwt-decode";
import router from "@/router/router";

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

const Name = ref("");
const Decs = ref("");
const Price = ref();
const Size = ref([]);
const Quantity = ref();

const alert = ref(null);
const alertError = ref(null);
const token = localStorage.getItem("token");

async function sendData() {
  const sizesArray = Size.value.split(",");
  const newProduct = {
    name: Name.value,
    desc: Decs.value,
    price: Price.value,
    size: sizesArray,
    quantity: Quantity.value,
  };
  const data = await axios
    .post("http://localhost:5082/api/Product/createProd", newProduct, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      if (response.status == 200) {
        console.log(response);
        alert.value = "Продукт успешно создан";
      }
    })

    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        alertError.value = "Токен истек. Пожалуйста, войдите снова.";
        localStorage.removeItem("token");
      } else {
        console.error("Ошибка:", error.message);
        alertError.value = "Произошла ошибка при отправке данных.";
      }
    });
  return data;
}
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
      <div class="ml-15">
        <RouterLink to="/crm">← Назад</RouterLink>
        <form class="mt-5 flex flex-col gap-5" @submit.prevent="sendData">
          <input
            class="input"
            v-model="Name"
            type="text"
            placeholder="Название товара"
            required
          />
          <textarea
            v-model="Decs"
            class="input min-h-50 w-lg"
            placeholder="Описание"
            required
          ></textarea>
          <input class="input" v-model="Price" type="text" placeholder="Цена" />
          <input
            class="input"
            v-model="Size"
            type="text"
            placeholder="Размеры"
            required
          />
          <input
            class="input"
            v-model="Quantity"
            type="text"
            placeholder="Осталось"
            required
          />
          <h3 v-if="alertError" class="text-red-600">{{ alertError }}</h3>
          <h3 v-if="alert" class="text-green-500">{{ alert }}</h3>

          <div>
            <RouterLink
              to="/crm"
              class="button--white mr-10 rounded-md px-7 py-2.5"
              >Отмена</RouterLink
            >
            <button class="button--beige h-10 w-35 rounded-md">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from "../components/Header/HeaderWhite.vue";
import Footer from "../components/Footer/Footer.vue";
</script>

<template>
  <main>
    <section class="section-wrapper">
      <Header></Header>
      <RouterLink to="/catalog"> <h2>Новая коллекция</h2> </RouterLink>
      <hr class="mx-auto my-6 w-40 border-white" />
      <div class="justify-items-center">
        <RouterLink to="/catalog"
          >СМОТРЕТЬ НОВИНКИ <img src="../assets/img/Vector.svg" alt=""
        /></RouterLink>
      </div>
    </section>
    <div class="container">
      <section class="section">
        <h3>Категории</h3>
        <div class="items">
          <article><img src="../assets/img/main/item1.jpg" alt="" /></article>
          <article><img src="../assets/img/main/item2.jpg" alt="" /></article>
          <article><img src="../assets/img/main/item3.jpg" alt="" /></article>
          <article><img src="../assets/img/main/item4.jpg" alt="" /></article>
        </div>
      </section>
      <section class="section section-email">
        <h3>Узнайте первым о новинках</h3>
        <div>
          <input type="email" class="input" placeholder="Ваш email" />
          <button class="button--beige">ПОДПИСАТЬСЯ</button>
          <p>
            Нажимая на кнопку «Подписаться», я соглашаюсь на обработку моих
            персональных данных и ознакомлен(а) с условиями конфиденциальности.
          </p>
        </div>
      </section>
    </div>
  </main>
  <Footer></Footer>
</template>

<style scoped>
a {
  color: #fff;
}

.section-wrapper {
  height: 120vh;
  text-align: center;
  background-image: url("../assets/img/Home/background-main.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.section-wrapper h2 {
  font-size: 46px;
  font-weight: 300;
  margin: 280px auto 0;
  color: #fff;
}

.section-wrapper img {
  cursor: pointer;
  margin-left: 5px;
}

.section-wrapper a {
  position: relative;
}

.section-wrapper a img {
  position: absolute;
  right: -15px;
  top: 4px;
}

.section {
  margin-top: 100px;
}

.section h3 {
  font-size: 36px;
  margin-bottom: 40px;
}

.items {
  display: flex;
  justify-content: space-between;
}

.section-email h3 {
  text-align: center;
}

.section-email div {
  display: flex;
  flex-direction: column;
}

.section-email input {
  height: 40px;
  width: 50%;
  margin-inline: auto;
}

.section-email input::placeholder {
  text-align: center;
}

.section-email .button--beige {
  margin: 15px 0;
  height: 40px;
  width: 50%;
  margin-inline: auto;
}

.section-email p {
  text-align: center;
  font-weight: 200;
  width: 50%;
  margin-inline: auto;
}
</style>

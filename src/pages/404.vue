<template>
  <div class="flex h-screen flex-col items-center justify-center gap-4">
    <img src="../assets/img/404/404.png" alt="" />
    <h4 class="text-2xl font-medium">Упс! Страница не найдена</h4>
    <p>
      Возможно, страница, которую вы ищете, была удалена или временно
      недоступна.
    </p>
    <RouterLink class="button--beige w-1/3 rounded-md py-2 text-center" to="/"
      >Вернуться на главную страницу</RouterLink
    >
  </div>
</template>

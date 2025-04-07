import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
  // Состояние
  const show = ref(false);
  const message = ref("");
  const type = ref("success");

  // Действия
  function showToast(msg, toastType = "success") {
    message.value = msg;
    type.value = toastType;
    show.value = true;

    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
      show.value = false;
    }, 3000);
  }

  return {
    // Состояние
    show,
    message,
    type,
    // Действия
    showToast,
  };
});

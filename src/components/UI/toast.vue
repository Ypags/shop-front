<script setup>
import { useToastStore } from "@/stores/toast";

const toastStore = useToastStore();
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-x-full opacity-0"
    enter-to-class="transform translate-x-0 opacity-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform translate-x-0 opacity-100"
    leave-to-class="transform translate-x-full opacity-0"
  >
    <div v-if="toastStore.show" class="fixed top-4 right-4 z-50">
      <div
        v-if="toastStore.type === 'success'"
        class="mb-4 flex items-center rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 shadow-lg"
      >
        <svg
          class="mr-3 h-5 w-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div class="text-sm font-medium">{{ toastStore.message }}</div>
      </div>
      <div
        v-else-if="toastStore.type === 'error'"
        class="mb-4 flex items-center rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 shadow-lg"
      >
        <svg
          class="mr-3 h-5 w-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div class="text-sm font-medium">{{ toastStore.message }}</div>
      </div>
    </div>
  </Transition>
</template>

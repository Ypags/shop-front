import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [
      { name: "New", slug: "new" },
      { name: "Bestsellers", slug: "bestsellers" },
      { name: "Верхняя одежда", slug: "outerwear" },
      { name: "Шубы", slug: "fur-coats" },
      { name: "Тренчи", slug: "trench-coats" },
      { name: "Пальто", slug: "coats" },
      { name: "Пуховики и жилеты", slug: "down-jackets" },
      { name: "Костюмы", slug: "suits" },
      { name: "Жакеты", slug: "jackets" },
      { name: "Платья", slug: "dresses" },
      { name: "Рубашки и блузы", slug: "shirts" },
      { name: "Юбки", slug: "skirts" },
      { name: "Футболки и топы", slug: "t-shirts" },
      { name: "Аксессуары", slug: "accessories" },
    ],
  }),
  getters: {
    getCategories: (state) => state.categories,
    getCategoryBySlug: (state) => (slug) =>
      state.categories.find((category) => category.slug === slug),
  },
});

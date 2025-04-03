import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../pages/signUp.vue";
import SignIn from "@/pages/signIn.vue";
import Home from "../pages/HomeView.vue";
import profile from "../pages/Profile.vue";
import NotFound from "../pages/404.vue";
import crm from "../pages/CRM.vue";
import addProduct from "../pages/AddProductCRM.vue";
import Catalog from "../pages/Catalog.vue";
import Product from "../pages/Product.vue";

const routes = [
  { path: "/:pathMatch(.*)*", component: NotFound },
  { path: "/", component: Home },
  { path: "/profile", component: profile },
  { path: "/sign-up", component: SignUp },
  { path: "/sign-in", component: SignIn },
  { path: "/catalog", component: Catalog },
  { path: "/catalog/product/:id", component: Product },
  { path: "/crm", component: crm },
  { path: "/addProduct", component: addProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

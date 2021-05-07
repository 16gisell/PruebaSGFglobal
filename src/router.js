import Vue from "vue";
import Router from "vue-router";
import AppHeader1 from "./layout/AppHeader1.vue";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Recargar from "./views/Recargar.vue";
import Pagar from "./views/Pagar.vue";
import Consultar from "./views/Consulta.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/inicio",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader1,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/",
      name: "register",
      components: {
        header: AppHeader1,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/recargar",
      name: "recargar",
      components: {
        header: AppHeader,
        default: Recargar,
        footer: AppFooter
      }
    },
    {
      path: "/pagar",
      name: "pagar",
      components: {
        header: AppHeader,
        default: Pagar,
        footer: AppFooter
      }
    },
    {
      path: "/consultar",
      name: "consultar",
      components: {
        header: AppHeader,
        default: Consultar,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

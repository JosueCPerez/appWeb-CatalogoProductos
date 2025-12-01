import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from '../views/LoginView.vue'
import CatalogsView from '../views/CatalogsView.vue'
import ProductsView from '../views/ProductsView.vue'
import UsersView from '../views/UsersView.vue'
import MainLayout from '../layouts/MainLayout.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes:[

    // inicio de sesion - Ruta publica
    { path:"/login", component:LoginView },

    // Rutas protegidas
    {
      path:"/",
      component: MainLayout,
      beforeEnter:(to,from,next)=>{
        const token = localStorage.getItem("token")
        if(!token) return next("/login")
        next()
      },
      children:[
        { path:"catalogs", component:CatalogsView },
        { path:"products", component:ProductsView },
        { path:"users", component:UsersView }
      ]
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue' // Importação adicionada
import CustomerLayout from '@/layouts/CustomerLayout.vue'
import Home from '@/views/home.vue'
import Products from '@/views/Products.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import ProductAdmin from '@/views/admin/products.vue'
import Register from '@/views/register.vue'
import NotFound from '@/views/not-found.vue'
import History from '@/views/History.vue'
import { authenticatedGuard } from './guards/authenticated.guard'
import { authorizedGuard } from './guards/authorized.guard'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/',
      component: CustomerLayout,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: 'products',
          component: Products,
        },
        {
          path: 'products/:id',
          component: ProductDetail,
          meta: {
            auth: true,
            role: ['CUSTOMER']
          },
        },
        {
          name: 'history',
          path: 'history',
          component: History,
          meta: {
            auth: true,
            role: ['CUSTOMER']
          }
        }
      ],
    },
    {
      path: '/admin',
      meta: {
        auth: true,
        role: ['ADMIN'],
      },
      component: AdminLayout,
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'products',
          component: ProductAdmin,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    }
  ],
})

authenticatedGuard(router)
authorizedGuard(router)

export default router

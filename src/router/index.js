import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    redirect: to => {
      return { path: '/login' }
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: to => {
      return { path: '/login' }
    }
  },
  {
    path: '/login',
    name: 'welcome to app | Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard | Reports',
    component: () => import('../views/DashboardView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});


export default router

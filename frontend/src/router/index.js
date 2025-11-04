import { createRouter, createWebHistory } from 'vue-router'
import Hero from '../views/Hero.vue'
import AdminPanel from '../views/AdminPanel.vue'
import IssuerPanel from '../views/IssuerPanel.vue'
import UserPanel from '../views/UserPanel.vue'
import VerifyPanel from '../views/VerifyPanel.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Hero
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel
  },
  {
    path: '/issuer',
    name: 'Issuer',
    component: IssuerPanel
  },
  {
    path: '/user',
    name: 'User',
    component: UserPanel
  },
  {
    path: '/verify',
    name: 'Verify',
    component: VerifyPanel
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

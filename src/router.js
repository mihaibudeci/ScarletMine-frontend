import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AuthService from './services/AuthService'
const authService = new AuthService()
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/user/Login.vue'),
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/user/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/user/Register.vue'),
      meta: {
        requiresVisitor: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!authService.isLoggedIn() && to.matched.some(record => record.meta.requiresAuth)) {
    next({
      name: 'login'
    })
  } else if (authService.isLoggedIn() && to.matched.some(record => record.meta.requiresVisitor)) {
    next({
      name: 'home'
    })
  } else {
    next()
  }
})

export default router

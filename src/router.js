import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/projects/Projects'
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
      component: Home
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
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "about" */ './views/admin/Users.vue'),
      meta: {
        authorize: [],
        requiresAuth: true
      }
    },
    {
      path: '/users/add',
      name: 'users-add',
      component: () => import(/* webpackChunkName: "about" */ './views/admin/UserAdd.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users/edit/:userId',
      name: 'users-edit',
      component: () => import(/* webpackChunkName: "about" */ './views/admin/UserEdit.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/boards',
      name: 'boards',
      component: () => import(/* webpackChunkName: "about" */ './components/Boards.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: List,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/add',
      name: 'project-add',
      component: () => import(/* webpackChunkName: "about" */ './views/projects/ProjectAdd.vue')
    },
    {
      path: '/projects/edit/:projectId',
      name: 'projects-edit',
      component: () => import(/* webpackChunkName: "about" */ './views/projects/ProjectEdit.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/tasks/',
      name: 'tasks',
      component: () => import(/* webpackChunkName: "about" */ './views/projects/TaskList.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/tasks/task',
      name: 'task',
      component: () => import(/* webpackChunkName: "about" */ './views/projects/TaskCard.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!authService.isLoggedIn() && to.matched.some(record => record.meta.requiresAuth)) {
    next({
      name: 'home'
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/MainPage.vue'
import Search from '../pages/SearchPage.vue'
import Check from '../pages/CheckPage.vue'
import Garage from '../pages/GaragePage.vue'
import Manual from '../pages/ManualPage.vue'
import auth from '../auth'

Vue.use(VueRouter)

// meta.userRole - доступ для пользователя с определенной ролью и выше

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      userRole: 0
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      userRole: 1
    }
  },
  {
    path: '/check',
    name: 'check',
    component: Check,
    meta: {
      userRole: 1
    }
  },
  {
    path: '/garage',
    name: 'garage',
    component: Garage,
    meta: {
      userRole: 1
    }
  },
  {
    path: '/manual',
    name: 'manual',
    component: Manual,
    meta: {
        userRole: 1
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('routing')
  console.log(auth)
  if (to.name !== 'main' && !auth.role === 0 && auth.loaded) {
    return next({name: 'main'})
  } else if (auth.role < to.meta.userRole && auth.loaded) {
    return false
  } else {
    return next()
  }
})

export default router

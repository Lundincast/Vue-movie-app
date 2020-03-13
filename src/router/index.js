import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'movie',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (movie.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "movie" */ '../views/Movie.vue')
  },
  {
    path: '/people/:id',
    name: 'people',
    props: true,
    component: () => import(/* webpackChunkName: "people" */ '../views/People.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import(/* webpackChunkName: "favorites" */ '../views/FavsAndWished.vue'),
    beforeEnter: (to, from, next) => {
      console.log(store.state.user)
      if (store.state.user === null) next(from)
      else next()
    }
  },
  {
    path: '/watchlisted',
    name: 'watchlisted',
    component: () => import(/* webpackChunkName: "watchlisted" */ '../views/FavsAndWished.vue'),
    beforeEnter: (to, from, next) => {
      console.log(store.state.user)
      if (store.state.user === null) next(from)
      else next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router

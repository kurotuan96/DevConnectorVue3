import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
import { store } from '../store'

const router = createRouter({
  base: '/',
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    if (to.matched.some(page => page.meta.isPublic)) {
      store.commit('auth/setLogout')
      next()
    } else {
      next()
    }
  } else {
    store.commit('auth/setLogout')
    next()
  }
})

export default router

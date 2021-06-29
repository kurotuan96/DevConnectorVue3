import { store } from '../../store'

export const AuthGuard = async (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    store.commit('auth/setLogout')
    next({ name: 'Login' })
    return
  }
  next()
}

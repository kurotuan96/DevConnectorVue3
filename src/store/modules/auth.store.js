import { AuthService } from '../../api'
import Cookie from 'js-cookie'

const state = {
  isAuthenticated: !!Cookie.get('token'),
  currentUserId: Cookie.get('currentUserId')
}

const mutations = {
  setToken (state, payload) {
    state.isAuthenticated = true
    Cookie.set('token', payload.token)
  },

  setLogout (state) {
    state.isAuthenticated = false
    Cookie.set('token', '')
    Cookie.set('currentUserId', '')
  },

  setCurrentUserId (state, payload) {
    state.currentUserId = payload
    Cookie.set('currentUserId', payload)
  }
}

const actions = {
  async login ({ commit }, body) {
    const { data } = await AuthService.getAuthToken(body)
    commit('setToken', data)
  },

  async getUserInfo ({ commit }) {
    const { data } = await AuthService.getUserInfo()
    commit('setCurrentUserId', data._id)
  }
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  currentUserId: state => state.currentUserId
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

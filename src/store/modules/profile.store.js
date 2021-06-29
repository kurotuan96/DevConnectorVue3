import { ProfileService } from '../../api'
import axios from 'axios'

const state = {
  profiles: [],
  profile: {},
  githubRepos: []
}

const mutations = {
  setProfiles (state, payload) {
    state.profiles = payload
  },

  setProfile (state, payload) {
    state.profile = payload
  },

  setGithubRepos (state, payload) {
    state.githubRepos = payload
  }
}

const actions = {
  async getAllProfiles ({ commit }) {
    const { data } = await ProfileService.getProfiles()
    commit('setProfiles', data)
  },

  async getCurrentProfile ({ commit }) {
    const { data } = await ProfileService.getLoggedInProfile()
    commit('setProfile', data)
  },

  async getProfile ({ commit }, userId) {
    const { data } = await ProfileService.getProfile(userId)
    commit('setProfile', data)
  },

  async addProfile (_, body) {
    await ProfileService.updateProfile(body)
  },

  async addExp (_, body) {
    await ProfileService.addExp(body)
  },

  async addEdu (_, body) {
    await ProfileService.addEdu(body)
  },

  async deleteExp (_, expId) {
    await ProfileService.deleteExp(expId)
  },

  async deleteEdu (_, eduId) {
    await ProfileService.deleteEdu(eduId)
  },

  async deleteAccount ({ commit }) {
    const { data } = await ProfileService.deleteAccount()
    commit('setProfile', {})
    return data
  },

  async getGithubRepos ({ commit }, userName) {
    const { data } = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.VUE_APP_GIT_CLIENT_ID}&client_secret=${process.env.VUE_APP_GIT_SECRET}`)
    commit('setGithubRepos', data)
  }
}

const getters = {
  profiles: state => state.profiles,
  profile: state => state.profile,
  githubRepos: state => state.githubRepos
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

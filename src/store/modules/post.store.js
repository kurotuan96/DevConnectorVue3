import { PostService } from '../../api'

const state = {
  posts: [],
  post: {}
}

const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },

  setPost (state, payload) {
    state.post = payload
  }
}

const actions = {
  async getPosts ({commit}) {
    const { data } = await PostService.getAllPosts()
    commit('setPosts', data)
  },

  async getPost ({commit}, postId) {
    const { data } = await PostService.getPost(postId)
    commit('setPost', data)
  },

  async deletePost (_, postId) {
    await PostService.deletePost(postId)
  },

  async addPost (_, body) {
    await PostService.createPost(body)
  },

  async addComment (_, payload = {}) {
    await PostService.commentOnPost(payload.postId, payload.body)
  },

  async deleteComment (_, payload = {}) {
    await PostService.deleteComment(payload.postId, payload.commentId)
  },

  async likePost (_, postId) {
    await PostService.likePost(postId)
  },

  async dislikePost (_, postId) {
    await PostService.dislikePost(postId)
  }
}

const getters = {
  posts: state => state.posts,
  post: state => state.post
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

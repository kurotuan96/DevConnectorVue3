import { ApiService } from './api.service'

const baseUrl = 'posts'

export const PostService = {
  /**
   * Get all posts
   * @returns {AxiosPromise<any>}
   */
  getAllPosts () {
    return ApiService.get(`${baseUrl}`)
  },

  /**
   * Get post by id
   * @param postId
   * @returns {AxiosPromise<any>}
   */
  getPost (postId) {
    return ApiService.get(`${baseUrl}/${postId}`)
  },

  /**
   * Add a post
   * @param body
   * @returns {AxiosPromise<any>}
   */
  createPost (body) {
    return ApiService.post(`${baseUrl}`, body)
  },

  /**
   * Delete a post
   * @param postId
   * @returns {AxiosPromise}
   */
  deletePost (postId) {
    return ApiService.delete(`${baseUrl}/${postId}`)
  },

  /**
   * Like a post
   * @param postId
   * @returns {AxiosPromise<any>}
   */
  likePost (postId) {
    return ApiService.put(`${baseUrl}/like/${postId}`)
  },

  /**
   * Dislike a post
   * @param postId
   * @returns {AxiosPromise<any>}
   */
  dislikePost (postId) {
    return ApiService.put(`${baseUrl}/unlike/${postId}`)
  },

  /**
   * Comment on a post
   * @param postId
   * @param body
   * @returns {AxiosPromise<any>}
   */
  commentOnPost (postId, body) {
    return ApiService.post(`${baseUrl}/comment/${postId}`, body)
  },

  /**
   * Delete a comment
   * @param postId
   * @param commentId
   * @returns {AxiosPromise}
   */
  deleteComment (postId, commentId) {
    return ApiService.delete(`${baseUrl}/comment/${postId}/${commentId}`)
  }
}

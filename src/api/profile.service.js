import { ApiService } from './api.service'

const baseUrl = 'profile'

export const ProfileService = {
  /**
   * Get all profile
   * @returns
   */
  getProfiles () {
    return ApiService.get(`${baseUrl}`)
  },

  /**
   * Get logged in user profile
   * @returns
   */
  getLoggedInProfile () {
    return ApiService.get(`${baseUrl}/me`)
  },

  /**
   * Get profile by userId
   * @param {*} userId
   * @returns
   */
  getProfile (userId) {
    return ApiService.get(`${baseUrl}/user/${userId}`)
  },

  /**
   * Get github repo
   * @param {*} userName
   * @returns
   */
  getGithubRepo (userName) {
    return ApiService.get(`${baseUrl}/github/${userName}`)
  },

  /**
   * Create/Update profile
   * @param {*} body
   * @returns
   */
  updateProfile (body) {
    return ApiService.post(`${baseUrl}`, body)
  },

  /**
   * Delete account
   * @returns
   */
  deleteAccount () {
    return ApiService.delete(`${baseUrl}`)
  },

  /**
   * Create/Update experience
   * @param {*} body
   * @returns
   */
  addExp (body) {
    return ApiService.put(`${baseUrl}/experience`, body)
  },

  /**
   * Delete experience
   * @param {*} expId
   * @returns
   */
  deleteExp (expId) {
    return ApiService.delete(`${baseUrl}/experience/${expId}`)
  },

  /**
   * Create/Update education
   * @param {*} body
   * @returns
   */
  addEdu (body) {
    return ApiService.put(`${baseUrl}/education`, body)
  },

  /**
   * Delete education
   * @param {*} eduId
   * @returns
   */
  deleteEdu (eduId) {
    return ApiService.delete(`${baseUrl}/education/${eduId}`)
  }
}

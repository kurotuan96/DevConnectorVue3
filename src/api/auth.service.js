import { ApiService } from './api.service'

const baseUrl = 'auth'
const userUrl = 'users'

export const AuthService = {
  /**
   *
   * @param {*} auth
   * @returns
   */
  getAuthToken (auth) {
    return ApiService.post(`${baseUrl}`, auth)
  },

  /**
   *
   * @returns
   */
  getUserInfo () {
    return ApiService.get(`${baseUrl}`)
  },

  /**
   *
   * @param {*} body
   * @returns
   */
  registUser (body) {
    return ApiService.post(`${userUrl}`, body)
  }
}

import axios from 'axios'
import {
  axiosConfig,
  axiosInterceptorRequestConfig,
  axiosInterceptorRequestError,
  axiosInterceptorResponseConfig,
  axiosInterceptorResponseError
} from '@/config/interceptor'

const axiosInstance = axios.create(axiosConfig)

// set request global
axiosInstance.interceptors.request.use(
  axiosInterceptorRequestConfig,
  axiosInterceptorRequestError
)

// set response global
axiosInstance.interceptors.response.use(
  axiosInterceptorResponseConfig,
  axiosInterceptorResponseError
)

export const ApiService = {

  get (url, config = {}) {
    return axiosInstance.get(`${url}`, config)
  },

  delete (url, config = {}) {
    return axiosInstance.delete(url, config)
  },

  post (url, data, config = {}) {
    return axiosInstance.post(`${url}`, data, config)
  },

  put (url, data, config = {}) {
    return axiosInstance.put(`${url}`, data, config)
  }
}

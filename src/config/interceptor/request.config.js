import Cookies from 'js-cookie'
import App from '../../main'

// Config Axios
export const axiosConfig = {
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  timeout: 30000 // request timeout
}

// Config Request Interceptor
export const axiosInterceptorRequestConfig = config => {
  const token = Cookies.get('token') || ''
  if (token) config.headers['x-auth-token'] = token

  App.$Progress.start()
  return config
}

// Config Request Error Interceptor
export const axiosInterceptorRequestError = error => {
  App.$Progress.fail()
  return Promise.reject(error)
}

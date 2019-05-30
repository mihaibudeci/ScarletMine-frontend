import axios from 'axios'

class ApiService {
  constructor () {
    this.axiosInstance = null
  }

  getApiUrl () {
    return 'http://localhost:8021/api'
  }

  axios () {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create()

      this.axiosInstance.interceptors.request.use((config) => {
        let headers = {}

        const jwtToken = localStorage.getItem('jwt_token')

        if (jwtToken) {
          headers['Authorization'] = `Bearer ${jwtToken}`
        }

        config.headers = { ...(config.headers || {}), ...headers }
        return config
      })
    }

    return this.axiosInstance
  }
}

export default new ApiService()

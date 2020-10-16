import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.0.0.121:1995/api'
  // baseURL: 'http://35.198.29.33/api'
})

export default api

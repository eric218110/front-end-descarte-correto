import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://192.168.0.111:1995/api'
  baseURL: 'http://35.198.29.33/api'
})

export default api

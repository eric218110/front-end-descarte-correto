import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.111:1995/api'
})

export default api

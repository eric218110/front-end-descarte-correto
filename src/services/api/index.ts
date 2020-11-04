import axios from 'axios'

export interface ResponseType<T> {
  error: string
  dataResponse: T | null
}

const api = axios.create({
  baseURL: 'http://ec2-177-71-251-90.sa-east-1.compute.amazonaws.com/api'
})

export default api

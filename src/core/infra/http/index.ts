import axios from 'axios'

export const httpClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/tractian/fake-api'
})

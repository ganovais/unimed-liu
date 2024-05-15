import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3301/',
  headers: {
    'Content-Type': 'application/json'
  }
})
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://3.136.23.116:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
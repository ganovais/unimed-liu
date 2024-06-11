import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://apputf01.unimedpg.com.br:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
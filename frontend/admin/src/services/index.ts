import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081'
})

export * from './User'
export * from './Auth'


import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${atob(localStorage.getItem('jwt')!)}`,
    },
})
export * from './User'
export * from './Auth'
export * from './Category'
export * from './Item'
export * from './Role'

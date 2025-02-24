import axios from "axios"

export const getAxiosInstance = () => axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + atob(localStorage.getItem('jwt') ?? ''),
    },
})

export interface IBaseResponse<T> {
    status: number
    timestamp: string
    message: string
    data: T
}

export * from './auth'
export * from './item'

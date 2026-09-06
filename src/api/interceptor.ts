import { api } from './api'
import toast from 'react-hot-toast'


api.interceptors.response.use(
    response => response,
    (err) => {
        if(!err.response) {
            return Promise.reject(err)
        }
        switch(err.response.status) {
            case 401:
                return Promise.reject(err)
            case 403:
                toast.error("Account has been blocked", {duration: 3000})
                return Promise.reject(err)
            default:
                return Promise.reject(err)
        }
    }
)



api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)
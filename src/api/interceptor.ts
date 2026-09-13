import { api } from './api'
import toast from 'react-hot-toast'

let isRefreshing = false
let refreshedPromise: Promise<string | null> | null = null 


api.interceptors.response.use(
    response => response,
    async (err) => {
        if(!err.response) {
            return Promise.reject(err)
        }

        const originalRequest = err.config

        switch(err.response.status) {
            case 401:{
                if(originalRequest._retry) {
                    localStorage.removeItem('accessToken')
                    toast.error("Invalid token, login again", { duration: 3000 })
                    window.location.href = '/signIn'
                    return Promise.reject(err)
                }

                originalRequest._retry = true

                if(!isRefreshing) {
                    isRefreshing = true
                    refreshedPromise = refreshToken().finally(() => {
                        isRefreshing = false
                    })
                }

                const newToken = await refreshedPromise

                if(!newToken) {
                    localStorage.removeItem('accessToken')
                    window.location.href = '/signIn'
                    toast.error("Invalid token, login again", { duration: 3000 })
                    return Promise.reject(err)
                }

                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return api(originalRequest)
            }
                
            case 403: {
                window.location.href = '/signIn'
                toast.error("Account has been blocked", {duration: 3000})
                return Promise.reject(err)
            }
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

const refreshToken = async() => {
    try {
        const response = await api.get('/auth/refresh')
        if(response.status === 200) {
            const accessToken  = response.data.accessToken
            localStorage.setItem('accessToken', accessToken)
            return accessToken
        }
        return null
        
    }catch(err) {
        console.log("Error occurred while signing in:", err);
        return null
    }
}
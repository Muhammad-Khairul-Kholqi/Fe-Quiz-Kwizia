import axios from 'axios'
import Swal from 'sweetalert2'

const API_BASE_URL =
    import.meta.env.VITE_URL_API

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response ?.status === 401) {
            const errorMessage = error.response ?.data ?.message || ''

            if (errorMessage.includes('expired') || errorMessage.includes('invalid')) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')

                const currentPath = window.location.pathname
                if (currentPath !== '/signin' && currentPath !== '/signup') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Session Expired',
                        text: 'Your session has expired. Please sign in again.',
                        confirmButtonColor: '#2563eb'
                    }).then(() => {
                        window.location.href = '/signin'
                    })
                }
            }
        }

        return Promise.reject(error)
    }
)

const authApi = {
    register: async (userData) => {
        try {
            const response = await apiClient.post('/api/auth/register', userData)

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: response.data.message,
                    confirmButtonColor: '#2563eb',
                    timer: 2000,
                    timerProgressBar: true
                })
            }

            return response.data
        } catch (error) {
            let errorMessage = 'An error occurred during registration.'

            if (error.response ?.data ?.errors && Array.isArray(error.response.data.errors)) {
                const errors = error.response.data.errors
                errorMessage = errors.map(err => err.msg).join('\n')
            } else if (error.response ?.data ?.message) {
                errorMessage = error.response.data.message
            }

            Swal.fire({
                icon: 'error',
                title: 'Registration Failed!',
                html: errorMessage.replace(/\n/g, '<br>'),
                confirmButtonColor: '#dc2626'
            })

            throw error
        }
    },

    login: async (credentials) => {
        try {
            const response = await apiClient.post('/api/auth/login', credentials)

            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.data.user))

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: response.data.message,
                    confirmButtonColor: '#2563eb',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
            }

            return response.data
        } catch (error) {
            let errorMessage = 'An error occurred during login.'

            if (error.response ?.data ?.errors && Array.isArray(error.response.data.errors)) {
                const errors = error.response.data.errors
                errorMessage = errors.map(err => err.msg).join('\n')
            } else if (error.response ?.data ?.message) {
                errorMessage = error.response.data.message
            }

            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                html: errorMessage.replace(/\n/g, '<br>'),
                confirmButtonColor: '#dc2626'
            })

            throw error
        }
    },

    adminLogin: async (credentials) => {
        try {
            const response = await apiClient.post('/api/auth/admin-login', credentials)

            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.data.user))

                Swal.fire({
                    icon: 'success',
                    title: 'Admin Login Successful!',
                    text: response.data.message,
                    confirmButtonColor: '#2563eb',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
            }

            return response.data
        } catch (error) {
            const errorMessage = error.response ?.data ?.message || 'An error occurred during admin login.'

            Swal.fire({
                icon: 'error',
                title: 'Admin Login Failed!',
                text: errorMessage,
                confirmButtonColor: '#dc2626'
            })

            throw error
        }
    },

    getProfile: async () => {
        try {
            const response = await apiClient.get('/api/auth/profile')
            return response.data
        } catch (error) {
            const errorMessage = error.response ?.data ?.message || 'Failed to retrieve profile data.'

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMessage,
                confirmButtonColor: '#dc2626'
            })

            throw error
        }
    },

    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        Swal.fire({
            icon: 'success',
            title: 'Logout Successful!',
            text: 'You have been signed out.',
            confirmButtonColor: '#2563eb',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false
        })
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token')
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    }
}

export default authApi

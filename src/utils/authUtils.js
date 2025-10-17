import authApi from '../api/authApi'
import router from '../routes/mainRoute'
import Swal from 'sweetalert2'

export const setupAuthInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response ?.status === 401) {
                const errorMessage = error.response ?.data ?.message || ''

                if (errorMessage.includes('expired') || errorMessage.includes('tidak valid')) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')

                    Swal.fire({
                        icon: 'warning',
                        title: 'Session Expired',
                        text: 'Your session has expired. Please login again.',
                        confirmButtonColor: '#2563eb'
                    }).then(() => {
                        router.push('/signin')
                    })
                }
            }

            return Promise.reject(error)
        }
    )
}

export const hasPermission = (requiredRole) => {
    const user = authApi.getCurrentUser()
    if (!user) return false

    if (requiredRole) {
        return user.role === requiredRole
    }

    return true
}

export const redirectByRole = () => {
    const user = authApi.getCurrentUser()

    if (user ?.role === 'admin') {
        router.push('/private/admin/dashboard')
    } else {
        router.push('/')
    }
}
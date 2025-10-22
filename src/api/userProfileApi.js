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
    (error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response ?.status === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Session expired. Please login again.',
                confirmButtonText: 'OK'
            }).then(() => {
                localStorage.removeItem('token')
                window.location.href = '/login'
            })
        }
        return Promise.reject(error)
    }
)

export const getMyProfile = async () => {
    try {
        const response = await apiClient.get('/profile/me')
        console.log('Get My Profile response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching My Profile:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Profile'
        })
        throw error
    }
}

export const updateUserAvatar = async (avatarId) => {
    try {
        const response = await apiClient.put('/profile/avatar', {
            avatar_id: avatarId
        })
        console.log('Update Avatar response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Avatar updated successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error updating Avatar:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to update Avatar'
        })
        throw error
    }
}

export const removeUserAvatar = async () => {
    try {
        const response = await apiClient.delete('/profile/avatar')
        console.log('Remove Avatar response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Avatar removed successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error removing Avatar:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to remove Avatar'
        })
        throw error
    }
}

export const getPublicProfile = async (userId) => {
    try {
        const response = await apiClient.get(`/profile/public/${userId}`)
        console.log('Get Public Profile response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching Public Profile:', error)
        throw error
    }
}
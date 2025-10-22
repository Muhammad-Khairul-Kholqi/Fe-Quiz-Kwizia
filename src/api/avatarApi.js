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

export const getAvatar = async (params = {}) => {
    try {
        const response = await apiClient.get('/avatars', {
            params
        })
        console.log('Get Avatar response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching Avatar:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Avatar'
        })
        throw error
    }
}

export const getActiveAvatar = async () => {
    try {
        const response = await apiClient.get('/avatars/active')
        console.log('Get Active Avatar response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching Active Avatar:', error)
        throw error
    }
}

export const createAvatar = async (formData) => {
    try {
        const response = await apiClient.post('/avatars', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('Create Avatar response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Avatar created successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error creating Avatar:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to create Avatar'
        })
        throw error
    }
}

export const updateAvatar = async (id, formData) => {
    try {
        const response = await apiClient.put(`/avatars/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('Update Avatar response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Avatar updated successfully',
            timer: 2000
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

export const deleteAvatar = async (id) => {
    try {
        const response = await apiClient.delete(`/avatars/${id}`)
        console.log('Delete Avatar response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Avatar deleted successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error deleting Avatar:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to delete Avatar'
        })
        throw error
    }
}
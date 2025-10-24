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
                localStorage.removeItem('user')
                window.location.href = '/admin/login'
            })
        } else if (error.response ?.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'You do not have permission to perform this action.',
                confirmButtonText: 'OK'
            })
        }
        return Promise.reject(error)
    }
)

export const getAllUsers = async (params = {}) => {
    try {
        const response = await apiClient.get('/api/admin/users', {
            params
        })
        console.log('Get All Users response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching Users:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to fetch Users'
        })
        throw error
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await apiClient.get(`/api/admin/users/${userId}`)
        console.log('Get User by ID response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching User:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to fetch User'
        })
        throw error
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`/api/admin/users/${userId}`)
        console.log('Delete User response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message || 'User deleted successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error deleting User:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to delete User'
        })
        throw error
    }
}

export const updateUserRole = async (userId, role) => {
    try {
        const response = await apiClient.put(`/api/admin/users/${userId}/role`, {
            role
        })
        console.log('Update User Role response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message || 'User role updated successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error updating User Role:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to update User Role'
        })
        throw error
    }
}
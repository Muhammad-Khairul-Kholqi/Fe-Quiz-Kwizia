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

export const getCategoryQuiz = async (params = {}) => {
    try {
        const response = await apiClient.get('/category-quiz', {
            params
        })
        console.log('Get Category Quiz response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching Category Quiz:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Category Quiz'
        })
        throw error
    }
}

export const createCategoryQuiz = async (data) => {
    try {
        const response = await apiClient.post('/category-quiz', data)
        console.log('Create Category Quiz response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Category Quiz created successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error creating Category Quiz:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to create Category Quiz'
        })
        throw error
    }
}

export const updateCategoryQuiz = async (id, data) => {
    try {
        const response = await apiClient.put(`/category-quiz/${id}`, data)
        console.log('Update Category Quiz response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Category Quiz updated successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error updating Category Quiz:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to update Category Quiz'
        })
        throw error
    }
}

export const deleteCategoryQuiz = async (id) => {
    try {
        const response = await apiClient.delete(`/category-quiz/${id}`)
        console.log('Delete Category Quiz response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Category Quiz deleted successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error deleting Category Quiz:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to delete Category Quiz'
        })
        throw error
    }
}
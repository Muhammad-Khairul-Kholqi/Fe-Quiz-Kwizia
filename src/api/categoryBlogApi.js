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

export const getCategoryBlog = async (params = {}) => {
    try {
        const response = await apiClient.get('/category-blog', {
            params
        })
        console.log('Get Category Blog response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching Category Blog:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Category Blog'
        })
        throw error
    }
}

export const createCategoryBlog = async (data) => {
    try {
        const response = await apiClient.post('/category-blog', data)
        console.log('Create Category Blog response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Category Blog created successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error creating Category Blog:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to create Category Blog'
        })
        throw error
    }
}

export const updateCategoryBlog = async (id, data) => {
    try {
        const response = await apiClient.put(`/category-blog/${id}`, data)
        console.log('Update Category Blog response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Category Blog updated successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error updating Category Blog:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to update Category Blog'
        })
        throw error
    }
}

export const deleteCategoryBlog = async (id) => {
    try {
        const response = await apiClient.delete(`/category-blog/${id}`)
        console.log('Delete Category Blog response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Category Blog deleted successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error deleting Category Blog:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to delete Category Blog'
        })
        throw error
    }
}
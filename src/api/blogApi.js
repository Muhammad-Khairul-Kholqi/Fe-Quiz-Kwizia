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

export const getBlogs = async (params = {}) => {
    try {
        const response = await apiClient.get('/blog', {
            params
        })
        console.log('Get Blogs response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching Blogs:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Blogs'
        })
        throw error
    }
}

export const getBlogById = async (id) => {
    try {
        const response = await apiClient.get(`/blog/${id}`)
        console.log('Get Blog by ID response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching Blog:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Blog'
        })
        throw error
    }
}

export const getBlogsByCategory = async (categoryId) => {
    try {
        const response = await apiClient.get(`/blog/category/${categoryId}`)
        console.log('Get Blogs by Category response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching Blogs by Category:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Blogs by Category'
        })
        throw error
    }
}

export const createBlog = async (formData) => {
    try {
        const response = await apiClient.post('/blog', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('Create Blog response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Blog created successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error creating Blog:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to create Blog'
        })
        throw error
    }
}

export const updateBlog = async (id, formData) => {
    try {
        const response = await apiClient.put(`/blog/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('Update Blog response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Blog updated successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error updating Blog:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to update Blog'
        })
        throw error
    }
}

export const deleteBlog = async (id) => {
    try {
        const response = await apiClient.delete(`/blog/${id}`)
        console.log('Delete Blog response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Blog deleted successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error deleting Blog:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to delete Blog'
        })
        throw error
    }
}
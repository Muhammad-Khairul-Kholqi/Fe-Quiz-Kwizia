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

export const getFaq = async (params = {}) => {
    try {
        const response = await apiClient.get('/faq', {
            params
        })
        console.log('Get FAQS response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching FAQS:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch FAQs'
        })
        throw error
    }
}

export const createFaq = async (data) => {
    try {
        const response = await apiClient.post('/faq', data)
        console.log('Create FAQ response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'FAQ created successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error creating FAQ:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to create FAQ'
        })
        throw error
    }
}

export const updateFaq = async (id, data) => {
    try {
        const response = await apiClient.put(`/faq/${id}`, data)
        console.log('Update FAQ response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'FAQ updated successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error updating FAQ:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to update FAQ'
        })
        throw error
    }
}

export const deleteFaq = async (id) => {
    try {
        const response = await apiClient.delete(`/faq/${id}`)
        console.log('Delete FAQ response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'FAQ deleted successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error deleting FAQ:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to delete FAQ'
        })
        throw error
    }
}
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

export const submitContact = async (data) => {
    try {
        const response = await apiClient.post('/contact/submit', data)
        console.log('Submit Contact response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your message has been sent successfully! We will contact you soon.',
            timer: 3000
        })
        return response.data
    } catch (error) {
        console.error('Error submitting contact:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to send message'
        })
        throw error
    }
}

export const getAllContacts = async (params = {}) => {
    try {
        const response = await apiClient.get('/contact', {
            params
        })
        console.log('Get All Contacts response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching contacts:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch contacts'
        })
        throw error
    }
}

export const getUnreadContacts = async () => {
    try {
        const response = await apiClient.get('/contact/unread')
        console.log('Get Unread Contacts response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching unread contacts:', error)
        throw error
    }
}

export const getUnreadCount = async () => {
    try {
        const response = await apiClient.get('/contact/unread-count')
        console.log('Get Unread Count response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching unread count:', error)
        throw error
    }
}

export const getContactById = async (id) => {
    try {
        const response = await apiClient.get(`/contact/${id}`)
        console.log('Get Contact By ID response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching contact:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to fetch contact'
        })
        throw error
    }
}

export const markAsRead = async (id) => {
    try {
        const response = await apiClient.put(`/contact/${id}/read`)
        console.log('Mark as Read response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error marking as read:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to mark as read'
        })
        throw error
    }
}

export const markAsUnread = async (id) => {
    try {
        const response = await apiClient.put(`/contact/${id}/unread`)
        console.log('Mark as Unread response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error marking as unread:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to mark as unread'
        })
        throw error
    }
}

export const deleteContact = async (id) => {
    try {
        const response = await apiClient.delete(`/contact/${id}`)
        console.log('Delete Contact response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Contact message deleted successfully',
            timer: 2000
        })
        return response.data
    } catch (error) {
        console.error('Error deleting contact:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to delete contact'
        })
        throw error
    }
}
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

export const getAllQuizzes = async (params = {}) => {
    try {
        const response = await apiClient.get('/quiz', {
            params
        })
        console.log('Get All Quizzes response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching quizzes:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch quizzes'
        })
        throw error
    }
}

export const getQuizById = async (id) => {
    try {
        const response = await apiClient.get(`/quiz/${id}`)
        console.log('Get Quiz by ID response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching quiz:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch quiz'
        })
        throw error
    }
}

export const getQuizzesByCategory = async (categoryId) => {
    try {
        const response = await apiClient.get(`/quiz/category/${categoryId}`)
        console.log('Get Quizzes by Category response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching quizzes by category:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch quizzes by category'
        })
        throw error
    }
}

export const createQuiz = async (formData) => {
    try {
        const response = await apiClient.post('/quiz', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('Create Quiz response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Quiz created successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error creating quiz:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to create quiz'
        })
        throw error
    }
}

export const updateQuiz = async (id, formData) => {
    try {
        const response = await apiClient.put(`/quiz/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('Update Quiz response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Quiz updated successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error updating quiz:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to update quiz'
        })
        throw error
    }
}

export const deleteQuiz = async (id) => {
    try {
        const response = await apiClient.delete(`/quiz/${id}`)
        console.log('Delete Quiz response:', response.data)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Quiz deleted successfully',
            timer: 2000,
            showConfirmButton: false
        })
        return response.data
    } catch (error) {
        console.error('Error deleting quiz:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to delete quiz'
        })
        throw error
    }
}

export const getQuizForPlay = async (quizId) => {
    try {
        const response = await apiClient.get(`/attempt/play/${quizId}`)
        console.log('Get Quiz for Play response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching quiz for play:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response ?.data ?.message || 'Failed to fetch quiz'
        })
        throw error
    }
}

export const submitQuizAnswers = async (quizId, answers, startedAt) => {
    try {
        const response = await apiClient.post(`/attempt/submit/${quizId}`, {
            answers,
            started_at: startedAt
        })
        console.log('Submit Quiz response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error submitting quiz:', error)
        const errorMessage = error.response ?.data ?.message || 'Failed to submit quiz'
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage
        })
        throw error
    }
}

export const checkQuizCompletion = async (quizId) => {
    try {
        const response = await apiClient.get(`/attempt/check/${quizId}`)
        console.log('Check Quiz Completion response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error checking quiz completion:', error)
        throw error
    }
}

export const getMyQuizHistory = async (limit = 10) => {
    try {
        const response = await apiClient.get('/attempt/my-history', {
            params: {
                limit
            }
        })
        console.log('Get My History response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching quiz history:', error)
        throw error
    }
}
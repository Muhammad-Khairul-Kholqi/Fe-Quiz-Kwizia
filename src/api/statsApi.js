import axios from 'axios'

const API_BASE_URL =
    import.meta.env.VITE_URL_API

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const getPublicStats = async () => {
    try {
        const response = await apiClient.get('/stats/public')
        console.log('Get Public Stats response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching public stats:', error)
        return {
            success: false,
            data: {
                total_users: 0,
                total_quizzes: 0,
                total_blogs: 0
            }
        }
    }
}

import axios from 'axios'

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

export const getLeaderboard = async (limit = 10) => {
    try {
        const response = await apiClient.get('/leaderboard', {
            params: {
                limit
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const getMyRank = async () => {
    try {
        const response = await apiClient.get('/leaderboard/me')
        return response.data
    } catch (error) {
        throw error
    }
}

export const getLeaderboardWithMe = async (limit = 10) => {
    try {
        const response = await apiClient.get('/leaderboard/with-me', {
            params: {
                limit
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}
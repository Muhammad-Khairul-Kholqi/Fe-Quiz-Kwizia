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

export const getFaq = async (params = {}) => {
    try {
        const response = await apiClient.get('/faq', {
            params
        })
        console.log('Get FAQS response:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching FAQS:', error)
        throw error
    }
}
import axios from 'axios';

// Base API URL configuration corresponding to backend `/api/v1/` prefix
const API_BASE_URL = 'http://127.0.0.1:5000/api/v1';

// Shared instance configurable with headers
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Service to execute pricing API calls
 */
export const getPricing = async (productId = '123') => {
    try {
        const response = await apiClient.get(`/pricing/?product_id=${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pricing data:', error);
        throw error;
    }
};

/**
 * Service to fetch user recommendations
 */
export const getRecommendations = async (userId = 'user_1') => {
    try {
        const response = await apiClient.get(`/recommendations/?user_id=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};

export default apiClient;

import axios from 'axios'

const BASE = 'http://127.0.0.1:5000/api/v1'

const client = axios.create({
    baseURL: BASE,
    headers: { 'Content-Type': 'application/json' },
    timeout: 4000,
})

// ── DUMMY FALLBACK (works without backend) ─────────────────────────
const dummyPricing = (id = '101') => ({
    product_id: id,
    base_price: 100.0,
    dynamic_price: 118.5,
    demand_multiplier: 1.185,
    currency: 'USD',
})

const dummyRecs = {
    recommendations: [
        { item_id: 'R1', name: 'AI Analytics Pro', match_score: 0.96, price: 49.99, category: 'Analytics' },
        { item_id: 'R2', name: 'Data Pipeline Kit', match_score: 0.88, price: 29.99, category: 'Data' },
        { item_id: 'R3', name: 'ML Model API Bundle', match_score: 0.79, price: 89.99, category: 'ML' },
        { item_id: 'R4', name: 'Team Insights Suite', match_score: 0.71, price: 59.99, category: 'Teams' },
    ],
}

export const getPricing = async (productId = '123') => {
    try {
        const res = await client.get(`/pricing/?product_id=${productId}`)
        return res.data
    } catch {
        return dummyPricing(productId)
    }
}

export const getRecommendations = async (userId = 'user_1') => {
    try {
        const res = await client.get(`/recommendations/?user_id=${userId}`)
        return res.data
    } catch {
        return dummyRecs
    }
}

export default client

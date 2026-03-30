import { useState, useCallback } from 'react'
import { getRecommendations } from '../services/api'

export function useRecommendations() {
    const [recs, setRecs] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchRecs = useCallback(async (userId = 'user_1') => {
        setLoading(true)
        const data = await getRecommendations(userId)
        setRecs(data.recommendations || [])
        setLoading(false)
    }, [])

    return { recs, loading, fetchRecs }
}

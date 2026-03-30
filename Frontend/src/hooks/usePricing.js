import { useState, useCallback } from 'react'
import { getPricing } from '../services/api'

export function usePricing() {
    const [pricing, setPricing] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchPricing = useCallback(async (productId = '123') => {
        setLoading(true)
        const data = await getPricing(productId)
        setPricing(data)
        setLoading(false)
    }, [])

    return { pricing, loading, fetchPricing }
}

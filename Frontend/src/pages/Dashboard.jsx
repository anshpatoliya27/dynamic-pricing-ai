import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePricing } from '../hooks/usePricing'
import { useRecommendations } from '../hooks/useRecommendations'
import PricingCard from '../components/PricingCard'
import ProductCard from '../components/ProductCard'
import SimulationControls from '../components/SimulationControls'
import ChartComponent from '../components/ChartComponent'
import GlassCard from '../components/GlassCard'

// ── PRODUCT CATALOG ────────────────────────────────────────────────
const PRODUCTS = [
    { id: '101', name: 'Pro Analytics Suite', icon: '📊', category: 'Analytics', base: 99 },
    { id: '102', name: 'ML Model API Access', icon: '🤖', category: 'ML', base: 149 },
    { id: '103', name: 'Real-Time Data Pipeline', icon: '🔄', category: 'Data', base: 79 },
    { id: '104', name: 'Team Collaboration Hub', icon: '👥', category: 'Teams', base: 59 },
]

// ── A/B STRATEGIES ──────────────────────────────────────────────────
const AB = {
    A: { label: 'Strategy A', desc: 'Aggressive — max price × demand surge', conv: 6.8, rev: 142, color: '#c084fc', winner: false },
    B: { label: 'Strategy B', desc: 'Conservative — steady volume, low churn', conv: 8.2, rev: 118, color: '#34d399', winner: true },
}

// ── METRICS ─────────────────────────────────────────────────────────
const IMPACT = {
    view: { engagement: 15, purchaseProb: 10, affinity: 8 },
    cart: { engagement: 25, purchaseProb: 28, affinity: 15 },
    purchase: { engagement: 40, purchaseProb: 60, affinity: 30 },
    abandon: { engagement: -10, purchaseProb: -20, affinity: -5 },
}
const clamp = (v) => Math.max(0, Math.min(100, v))

export default function Dashboard() {
    const { pricing, loading: pLoading, fetchPricing } = usePricing()
    const { recs, fetchRecs } = useRecommendations()

    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0])
    const [lastAction, setLastAction] = useState(null)
    const [metrics, setMetrics] = useState({ engagement: 20, purchaseProb: 12, affinity: 35 })
    const [pricingHistory, setPricingHistory] = useState([])
    const [activeStrategy, setActiveStrategy] = useState('B')
    const [toast, setToast] = useState('')

    // Initial data load
    useEffect(() => {
        fetchPricing(PRODUCTS[0].id)
        fetchRecs('user_1')
    }, [])

    // Track pricing snapshots for charts
    useEffect(() => {
        if (pricing) setPricingHistory((h) => [...h.slice(-9), pricing])
    }, [pricing])

    const handleProductSelect = useCallback((product) => {
        setSelectedProduct(product)
        fetchPricing(product.id)
        setToast(`✓ Pricing recalculated for ${product.name}`)
        setTimeout(() => setToast(''), 2000)
    }, [fetchPricing])

    const handleAction = useCallback((actionId) => {
        setLastAction(actionId)
        const impact = IMPACT[actionId] || {}
        setMetrics((prev) => ({
            engagement: clamp(prev.engagement + (impact.engagement || 0)),
            purchaseProb: clamp(prev.purchaseProb + (impact.purchaseProb || 0)),
            affinity: clamp(prev.affinity + (impact.affinity || 0)),
        }))
        if (actionId === 'cart' || actionId === 'purchase') {
            fetchRecs(`user_${actionId}_${Date.now()}`)
            fetchPricing(selectedProduct.id)
        }
    }, [fetchPricing, fetchRecs, selectedProduct])

    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            {/* ── PAGE HEADER ── */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                    <span className="grad-text">⚡ Live Pricing Dashboard</span>
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Real-time behavioural signals · ML-powered pricing · Personalised recommendations
                </p>
            </motion.div>

            {/* ── TOAST ── */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="fixed top-20 right-6 z-50 px-5 py-3 rounded-xl text-sm font-semibold text-emerald-300"
                        style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', backdropFilter: 'blur(16px)' }}
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── 3-COLUMN MAIN LAYOUT ── */}
            <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr_280px] gap-5 mb-5">

                {/* LEFT: Simulation */}
                <GlassCard>
                    <p className="text-panel mb-4">User Simulation</p>

                    {/* Product selector */}
                    <p className="text-xs font-bold text-purple-300 mb-3 flex items-center gap-1">🛍️ Select Product</p>
                    <div className="flex flex-col gap-2 mb-5">
                        {PRODUCTS.map((p) => {
                            const active = selectedProduct.id === p.id
                            return (
                                <motion.div
                                    key={p.id}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleProductSelect(p)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
                                    style={{
                                        background: active ? 'rgba(168,85,247,0.12)' : 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${active ? 'rgba(168,85,247,0.45)' : 'rgba(255,255,255,0.07)'}`,
                                        boxShadow: active ? '0 0 16px rgba(168,85,247,0.25)' : 'none',
                                    }}
                                >
                                    <span className="text-xl">{p.icon}</span>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-200">{p.name}</p>
                                        <p className="text-xs text-gray-500">${p.base} base</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className="border-t border-white/5 mb-5" />
                    <SimulationControls onAction={handleAction} lastAction={lastAction} metrics={metrics} />
                </GlassCard>

                {/* CENTER: Pricing */}
                <div className="flex flex-col gap-4">
                    {/* Selected product heading */}
                    <GlassCard className="flex items-center gap-3 py-3">
                        <span className="text-2xl">{selectedProduct.icon}</span>
                        <div className="flex-1">
                            <p className="font-bold text-white text-sm">{selectedProduct.name}</p>
                            <p className="text-xs text-gray-500">Category: {selectedProduct.category}</p>
                        </div>
                        {pLoading && (
                            <div className="w-5 h-5 rounded-full border-2 border-purple-500/30 border-t-purple-500"
                                style={{ animation: 'spin 0.7s linear infinite' }} />
                        )}
                    </GlassCard>
                    <PricingCard pricing={pricing} />
                </div>

                {/* RIGHT: Recommendations */}
                <GlassCard>
                    <p className="text-panel mb-4">AI Recommendations</p>
                    <p className="text-xs font-bold text-pink-300 mb-3 flex items-center gap-1">🎯 Personalised For You</p>
                    <div className="flex flex-col gap-3">
                        {recs.map((item) => (
                            <ProductCard
                                key={item.item_id}
                                item={{ ...item, price: item.price || (item.match_score * 80 + 10) }}
                                onClick={(rec) => handleProductSelect({ id: rec.item_id, name: rec.name, icon: '📦', category: rec.category || 'SaaS', base: rec.price })}
                            />
                        ))}
                        {recs.length === 0 && (
                            <p className="text-gray-600 text-xs text-center py-6">Interact to generate recommendations</p>
                        )}
                    </div>
                    <div className="mt-4 p-3 rounded-xl text-xs text-purple-400"
                        style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}>
                        💡 Updates on cart &amp; purchase events
                    </div>
                </GlassCard>
            </div>

            {/* ── A/B TESTING ── */}
            <GlassCard className="mb-5">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-panel mb-1">A/B Pricing Strategy Test</p>
                        <p className="text-base font-bold text-white">🔬 Compare Strategies</p>
                    </div>
                    <span className="badge badge-green">👑 Strategy B Wins</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(AB).map(([key, s]) => (
                        <motion.div
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveStrategy(key)}
                            className="p-5 rounded-2xl cursor-pointer transition-all duration-300"
                            style={{
                                background: activeStrategy === key ? `${s.color}12` : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${activeStrategy === key ? s.color + '50' : 'rgba(255,255,255,0.08)'}`,
                                boxShadow: activeStrategy === key ? `0 0 25px ${s.color}30` : 'none',
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="badge" style={{ background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40` }}>
                                    {s.winner ? '👑 ' : ''}{s.label}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-4">{s.desc}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
                                    <p className="text-3xl font-black" style={{ color: s.color }}>{s.conv}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Revenue / Session</p>
                                    <p className="text-3xl font-black" style={{ color: s.color }}>${s.rev}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </GlassCard>

            {/* ── ANALYTICS CHARTS ── */}
            <GlassCard>
                <p className="text-panel mb-2">Analytics Overview</p>
                <p className="text-base font-bold text-white mb-5">📈 Real-Time Charts</p>
                <ChartComponent liveData={pricingHistory} />
            </GlassCard>
        </div>
    )
}

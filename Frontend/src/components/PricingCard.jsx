import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from './GlassCard'

function FactorBar({ icon, label, value, pct, color }) {
    return (
        <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <span>{icon}</span>{label}
                </span>
                <span className="text-xs font-bold" style={{ color }}>{value}</span>
            </div>
            <div className="prog-bar">
                <motion.div
                    className="prog-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}80)`, boxShadow: `0 0 6px ${color}60` }}
                />
            </div>
        </div>
    )
}

export default function PricingCard({ pricing }) {
    const priceRef = useRef(null)

    useEffect(() => {
        if (priceRef.current) {
            priceRef.current.classList.remove('animate-price-pop')
            void priceRef.current.offsetWidth
            priceRef.current.classList.add('animate-price-pop')
        }
    }, [pricing?.dynamic_price])

    if (!pricing) return (
        <GlassCard className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-3 animate-float">📡</div>
            <p className="text-gray-500 text-sm">Select a product to activate pricing engine</p>
        </GlassCard>
    )

    const uplift = (((pricing.dynamic_price - pricing.base_price) / pricing.base_price) * 100).toFixed(1)
    const demandPct = Math.min(Math.round((pricing.demand_multiplier - 0.9) * 250), 100)

    return (
        <GlassCard>
            {/* Header */}
            <div className="text-panel mb-3">Dynamic Price Engine</div>

            {/* Base price */}
            <p className="text-sm text-gray-500 line-through mb-1">
                ${pricing.base_price?.toFixed(2)} base
            </p>

            {/* Dynamic price — the hero element */}
            <div className="flex items-end gap-3 mb-2">
                <motion.div
                    key={pricing.dynamic_price}
                    ref={priceRef}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="font-black leading-none"
                    style={{
                        fontSize: 56,
                        background: 'linear-gradient(135deg,#c084fc,#f472b6,#fb923c)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 20px rgba(192,132,252,0.5))',
                    }}
                >
                    ${pricing.dynamic_price?.toFixed(2)}
                </motion.div>
                <AnimatePresence>
                    <motion.span
                        key={uplift}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="badge badge-orange mb-2 text-sm"
                    >
                        ▲ {uplift}%
                    </motion.span>
                </AnimatePresence>
            </div>

            <div className="border-t border-white/5 my-4" />

            {/* Factors */}
            <p className="text-panel mb-3">Pricing Factors</p>
            <FactorBar icon="🔥" label="Demand Level" value="HIGH" pct={demandPct} color="#f97316" />
            <FactorBar icon="📦" label="Inventory" value="LOW  35%" pct={35} color="#ef4444" />
            <FactorBar icon="🏷️" label="vs Competitor" value={`$${(pricing.dynamic_price * 0.96).toFixed(2)}`} pct={62} color="#22d3ee" />

            {/* Why this price? */}
            <div
                className="mt-4 p-3 rounded-xl"
                style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}
            >
                <p className="text-xs font-bold text-purple-400 mb-1.5">💡 WHY THIS PRICE?</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                    Demand surge of +{uplift}% detected. Low inventory (35%) prevents over-promotion.
                    Our AI prices 4% below competitors to win conversions while maximising margin.
                </p>
            </div>
        </GlassCard>
    )
}

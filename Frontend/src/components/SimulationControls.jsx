import React from 'react'
import { motion } from 'framer-motion'

const ACTIONS = [
    { id: 'view', label: 'View Product', icon: '👁️', color: '#818cf8', ring: 'rgba(129,140,248,0.4)' },
    { id: 'cart', label: 'Add to Cart', icon: '🛒', color: '#c084fc', ring: 'rgba(192,132,252,0.4)' },
    { id: 'purchase', label: 'Purchase', icon: '💳', color: '#34d399', ring: 'rgba(52,211,153,0.4)' },
    { id: 'abandon', label: 'Abandon', icon: '🚪', color: '#f87171', ring: 'rgba(248,113,113,0.4)' },
]

export default function SimulationControls({ onAction, lastAction, metrics }) {
    return (
        <div>
            {/* Action Buttons */}
            <p className="text-panel mb-3">Simulate User Actions</p>
            <div className="flex flex-col gap-2 mb-5">
                {ACTIONS.map((a) => {
                    const active = lastAction === a.id
                    return (
                        <motion.button
                            key={a.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onAction(a.id)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-left w-full transition-all duration-200 cursor-pointer"
                            style={{
                                background: active ? `${a.color}18` : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${active ? a.color + '60' : 'rgba(255,255,255,0.07)'}`,
                                boxShadow: active ? `0 0 15px ${a.ring}` : 'none',
                            }}
                        >
                            <span className="text-xl w-7 text-center">{a.icon}</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold" style={{ color: active ? a.color : '#d1d5db' }}>{a.label}</p>
                            </div>
                            {active && (
                                <motion.div
                                    layoutId="activeDot"
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: a.color, boxShadow: `0 0 8px ${a.color}` }}
                                />
                            )}
                        </motion.button>
                    )
                })}
            </div>

            {/* Session Metrics */}
            <p className="text-panel mb-3">Session Metrics</p>
            {[
                { key: 'engagement', label: 'Engagement Score', color: '#818cf8', g1: '#818cf8', g2: '#c084fc' },
                { key: 'purchaseProb', label: 'Purchase Probability', color: '#34d399', g1: '#34d399', g2: '#06b6d4' },
                { key: 'affinity', label: 'Category Affinity', color: '#f472b6', g1: '#f472b6', g2: '#fb923c' },
            ].map((m) => (
                <div key={m.key} className="mb-3.5">
                    <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-400">{m.label}</span>
                        <span className="text-xs font-bold" style={{ color: m.color }}>{metrics[m.key]}%</span>
                    </div>
                    <div className="prog-bar">
                        <motion.div
                            className="prog-fill"
                            animate={{ width: `${metrics[m.key]}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            style={{ background: `linear-gradient(90deg, ${m.g1}, ${m.g2})`, boxShadow: `0 0 8px ${m.color}50` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

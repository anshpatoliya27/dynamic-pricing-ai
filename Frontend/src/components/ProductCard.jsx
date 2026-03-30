import React from 'react'
import { motion } from 'framer-motion'

const CATEGORY_STYLES = {
    Analytics: { badge: 'badge-purple', icon: '📊' },
    Data: { badge: 'badge-cyan', icon: '🗂️' },
    ML: { badge: 'badge-pink', icon: '🤖' },
    Teams: { badge: 'badge-green', icon: '👥' },
    SaaS: { badge: 'badge-orange', icon: '🚀' },
}

export default function ProductCard({ item, onClick }) {
    const style = CATEGORY_STYLES[item.category] || { badge: 'badge-purple', icon: '📦' }

    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick?.(item)}
            className="glass p-4 card-hover cursor-pointer"
            style={{ border: '1px solid rgba(168,85,247,0.12)' }}
        >
            <div className="flex items-start gap-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.2),rgba(236,72,153,0.2))' }}
                >
                    {style.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <span className={`badge ${style.badge} mb-1.5`}>{item.category}</span>
                    <p className="text-sm font-semibold text-gray-200 leading-snug truncate">{item.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-black grad-text-cyan">${item.price?.toFixed(2)}</span>
                <span className="text-xs font-bold text-emerald-400">
                    ↑ {(item.match_score * 100).toFixed(0)}% match
                </span>
            </div>
        </motion.div>
    )
}

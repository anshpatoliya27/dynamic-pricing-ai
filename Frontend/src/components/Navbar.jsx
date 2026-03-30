import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
    const { pathname } = useLocation()

    return (
        <motion.nav
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 flex items-center justify-between px-8 h-16"
            style={{
                background: 'rgba(8,1,15,0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(168,85,247,0.15)',
            }}
        >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 no-underline">
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black animate-glow-pulse"
                    style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899,#f97316)' }}
                >
                    ⚡
                </div>
                <div>
                    <span className="grad-text text-lg font-black tracking-tight">PriceAI</span>
                    <div className="text-panel" style={{ marginTop: -2 }}>DYNAMIC ENGINE</div>
                </div>
            </Link>

            {/* Links */}
            <div className="flex items-center gap-2">
                {[
                    { to: '/', label: 'Home' },
                    { to: '/dashboard', label: 'Dashboard' },
                ].map(({ to, label }) => {
                    const active = pathname === to
                    return (
                        <Link
                            key={to}
                            to={to}
                            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 no-underline"
                            style={{
                                color: active ? '#e879f9' : '#9ca3af',
                                background: active ? 'rgba(168,85,247,0.15)' : 'transparent',
                                border: active ? '1px solid rgba(168,85,247,0.35)' : '1px solid transparent',
                            }}
                        >
                            {label}
                        </Link>
                    )
                })}
                {/* Live dot */}
                <div className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-full badge-green">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: 'pulse 1.5s infinite' }} />
                    <span className="text-xs font-bold">LIVE</span>
                </div>
            </div>
        </motion.nav>
    )
}

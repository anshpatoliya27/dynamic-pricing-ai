import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FEATURES = [
    {
        icon: '⚡', title: 'Dynamic Pricing AI',
        desc: 'ML models recalculate prices in ~12ms using demand, inventory, seasonality, and competitor signals.',
        color: '#c084fc', shadow: 'rgba(192,132,252,0.25)',
    },
    {
        icon: '🎯', title: 'Personalized Recommendations',
        desc: 'Behavioral AI surfaces the right product to the right user at the perfect moment.',
        color: '#f472b6', shadow: 'rgba(244,114,182,0.25)',
    },
    {
        icon: '📊', title: 'Real-Time Analytics',
        desc: 'Live charts track demand curves, conversion rates, and revenue impact across every session.',
        color: '#34d399', shadow: 'rgba(52,211,153,0.25)',
    },
    {
        icon: '🔬', title: 'A/B Strategy Testing',
        desc: 'Compare aggressive vs conservative pricing strategies side-by-side with live performance metrics.',
        color: '#fb923c', shadow: 'rgba(251,146,60,0.25)',
    },
]

const STATS = [
    { num: '18.4%', label: 'Avg Revenue Lift' },
    { num: '~12ms', label: 'Price Recalc Speed' },
    { num: '94%', label: 'Recommendation Match' },
    { num: '3.2×', label: 'Conversion Gain' },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

export default function Home() {
    return (
        <div style={{ background: '#08010f' }}>
            {/* Hero */}
            <section className="relative flex flex-col items-center text-center px-6 pt-24 pb-20 overflow-hidden">
                {/* Background orbs */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden>
                    <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl animate-spin-slow"
                        style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
                    <div className="absolute top-20 right-1/4 w-56 h-56 rounded-full opacity-15 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #ec4899, transparent)', animationDelay: '1.5s' }} />
                    <div className="absolute bottom-0 left-1/2 w-96 h-40 -translate-x-1/2 opacity-10 blur-3xl"
                        style={{ background: 'radial-gradient(ellipse, #f97316, transparent)' }} />
                </div>

                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    {/* Live pill */}
                    <div className="inline-flex items-center gap-2 badge-purple px-4 py-1.5 rounded-full mb-8">
                        <div className="w-2 h-2 rounded-full bg-purple-400" style={{ animation: 'pulse 1.5s infinite' }} />
                        <span className="text-xs font-bold tracking-wider">REAL-TIME AI PRICING ENGINE</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6 max-w-4xl mx-auto">
                        <span className="grad-text">AI Dynamic Pricing</span>
                        <br />
                        <span className="text-white">&amp; Personalization</span>
                    </h1>

                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        ML-powered pricing that maximises revenue, adapts to demand in milliseconds,
                        and delivers hyper-personalised recommendations to every user.
                    </p>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(168,85,247,0.7)' }}
                                whileTap={{ scale: 0.97 }}
                                className="btn-glow text-base px-8 py-4"
                            >
                                🚀 Launch Dashboard
                            </motion.button>
                        </Link>
                        <a href="#features">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                className="btn-outline text-base px-8 py-4"
                            >
                                Learn More ↓
                            </motion.button>
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Stats bar */}
            <section
                className="flex justify-center gap-12 flex-wrap py-10 px-8"
                style={{ borderTop: '1px solid rgba(168,85,247,0.1)', borderBottom: '1px solid rgba(168,85,247,0.1)' }}
            >
                {STATS.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.4 }}
                        className="text-center"
                    >
                        <div className="text-4xl font-black mb-1 grad-text">{s.num}</div>
                        <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                    </motion.div>
                ))}
            </section>

            {/* Features */}
            <section id="features" className="max-w-6xl mx-auto px-8 py-20">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-black text-center mb-12 text-white"
                >
                    Everything you need to{' '}
                    <span className="grad-text">maximise revenue</span>
                </motion.h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {FEATURES.map((f) => (
                        <motion.div
                            key={f.title}
                            variants={item}
                            whileHover={{ scale: 1.02, y: -4, boxShadow: `0 20px 50px ${f.shadow}` }}
                            className="glass p-8 card-hover"
                            style={{ border: '1px solid rgba(168,85,247,0.12)' }}
                        >
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                                style={{ background: `${f.color}20`, boxShadow: `0 0 20px ${f.color}30` }}
                            >
                                {f.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    )
}

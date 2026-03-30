import React from 'react'
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import GlassCard from './GlassCard'

const TOOLTIP_STYLE = {
    background: 'rgba(17,10,30,0.95)',
    border: '1px solid rgba(168,85,247,0.25)',
    borderRadius: 10,
    fontSize: 12,
    color: '#e2e8f0',
}

const AXIS = { fill: '#6b7280', fontSize: 11 }

const DEMAND_DATA = [
    { t: '09:00', price: 95, demand: 42 },
    { t: '10:00', price: 101, demand: 57 },
    { t: '11:00', price: 108, demand: 73 },
    { t: '12:00', price: 117, demand: 89 },
    { t: '13:00', price: 112, demand: 81 },
    { t: '14:00', price: 121, demand: 95 },
    { t: '15:00', price: 118, demand: 87 },
]

const CONV_DATA = [
    { day: 'Mon', rate: 3.1 }, { day: 'Tue', rate: 4.0 },
    { day: 'Wed', rate: 3.9 }, { day: 'Thu', rate: 5.4 },
    { day: 'Fri', rate: 6.2 }, { day: 'Sat', rate: 7.8 },
    { day: 'Sun', rate: 6.1 },
]

const REV_DATA = [
    { week: 'Wk1', revenue: 12800 }, { week: 'Wk2', revenue: 16200 },
    { week: 'Wk3', revenue: 14900 }, { week: 'Wk4', revenue: 19700 },
    { week: 'Wk5', revenue: 22400 }, { week: 'Wk6', revenue: 26100 },
]

function ChartTitle({ children, sub }) {
    return (
        <div className="mb-4">
            <p className="text-sm font-bold text-gray-200">{children}</p>
            {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
        </div>
    )
}

export default function ChartComponent({ liveData = [] }) {
    // Append any live pricing snapshots to demand data
    const demandData = [
        ...DEMAND_DATA,
        ...liveData.slice(-3).map((p, i) => ({
            t: `+${i + 1}`,
            price: p.dynamic_price * 1,
            demand: Math.round(p.demand_multiplier * 75),
        })),
    ]

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Demand vs Price – spans 2 cols */}
            <GlassCard className="xl:col-span-2">
                <ChartTitle sub="Real-time correlation — live data appended on price changes">
                    📈 Demand vs Dynamic Price
                </ChartTitle>
                <ResponsiveContainer width="100%" height={210}>
                    <LineChart data={demandData}>
                        <defs>
                            <linearGradient id="priceGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#c084fc" />
                                <stop offset="100%" stopColor="#f472b6" />
                            </linearGradient>
                            <linearGradient id="demandGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#fb923c" />
                                <stop offset="100%" stopColor="#fbbf24" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="t" tick={AXIS} axisLine={false} tickLine={false} />
                        <YAxis tick={AXIS} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Legend wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} />
                        <Line type="monotone" dataKey="price" stroke="url(#priceGrad)" strokeWidth={2.5} dot={false} name="Price ($)" />
                        <Line type="monotone" dataKey="demand" stroke="url(#demandGrad)" strokeWidth={2.5} dot={false} name="Demand Index" />
                    </LineChart>
                </ResponsiveContainer>
            </GlassCard>

            {/* Conversion Rate */}
            <GlassCard>
                <ChartTitle sub="Sessions converting to purchases">
                    📊 Conversion Rate %
                </ChartTitle>
                <ResponsiveContainer width="100%" height={210}>
                    <BarChart data={CONV_DATA}>
                        <defs>
                            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="day" tick={AXIS} axisLine={false} tickLine={false} />
                        <YAxis tick={AXIS} axisLine={false} tickLine={false} unit="%" />
                        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`${v}%`, 'Conv. Rate']} />
                        <Bar dataKey="rate" fill="url(#barGrad)" radius={[5, 5, 0, 0]} name="Conversion" />
                    </BarChart>
                </ResponsiveContainer>
            </GlassCard>

            {/* Revenue Trend – full width */}
            <GlassCard className="xl:col-span-3">
                <ChartTitle sub="Weekly cumulative revenue with dynamic pricing applied">
                    💰 Revenue Trend
                </ChartTitle>
                <ResponsiveContainer width="100%" height={175}>
                    <AreaChart data={REV_DATA}>
                        <defs>
                            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="week" tick={AXIS} axisLine={false} tickLine={false} />
                        <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
                        <Area type="monotone" dataKey="revenue" stroke="#34d399" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue" />
                    </AreaChart>
                </ResponsiveContainer>
            </GlassCard>
        </div>
    )
}

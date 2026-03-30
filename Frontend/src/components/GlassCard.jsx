import React from 'react'

export default function GlassCard({ children, className = '', style = {} }) {
    return (
        <div
            className={`glass p-5 ${className}`}
            style={{ border: '1px solid rgba(168,85,247,0.15)', ...style }}
        >
            {children}
        </div>
    )
}

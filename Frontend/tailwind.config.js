/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                dark: {
                    900: '#08010f',
                    800: '#100820',
                    700: '#17102d',
                    600: '#1e1538',
                }
            },
            animation: {
                'price-pop': 'pricePop 0.5s ease',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'float': 'float 4s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'spin-slow': 'spin 4s linear infinite',
            },
            keyframes: {
                pricePop: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.12)', filter: 'brightness(1.4)' },
                    '100%': { transform: 'scale(1)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 15px rgba(168,85,247,0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(168,85,247,0.8)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}

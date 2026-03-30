import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <h1>Dynamic Pricing & Personalization Engine</h1>
            <p>Welcome to the ML-powered recommendation and dynamic pricing system.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/dashboard" className="btn-primary">
                    Open Target Dashboard
                </Link>
            </div>
        </div>
    );
}

export default Home;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css';

/**
 * Main Application Component showcasing clean route separation
 * utilizing 'react-router-dom'.
 */
function App() {
  return (
    <Router>
      <div className="App">
        {/* Persistent Components */}
        <Navbar />

        {/* Routed Views Container */}
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

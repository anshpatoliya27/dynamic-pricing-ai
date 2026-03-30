import React, { useEffect, useState } from "react";
import { getPricing, getRecommendations } from "../services/api";

const Dashboard = () => {
  const [pricing, setPricing] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    getPricing().then(res => setPricing(res.data));
    getRecommendations().then(res => setRecommendations(res.data.recommended_products));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {pricing && (
        <div>
          <h3>Pricing</h3>
          <p>Product: {pricing.product}</p>
          <p>Price: ₹{pricing.price}</p>
          <p>Demand Score: {pricing.demand_score}</p>
        </div>
      )}

      <div>
        <h3>Recommendations</h3>
        <ul>
          {recommendations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
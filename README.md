<div align="center">

# 🛒 SmartCommerceAI: Dynamic Pricing & Personalization Engine

**AI-powered pricing & recommendation engine for next-gen e-commerce**

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Scikit--Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)


</div>

---

## 📌 Overview

In the modern e-commerce landscape, static pricing models and "one-size-fits-all" product displays lead to missed revenue opportunities and high customer churn. 🛒  

**SmartCommerceAI** is an end-to-end intelligence layer designed to transform static storefronts into high-performance, adaptive ecosystems.

By leveraging real-time data streams and advanced Machine Learning, the engine optimizes the two most critical drivers of e-commerce success:

- 💰 **Profit Margins**
- 🎯 **User Engagement**

---

## 🎯 Core Objectives

### 💵 Price Optimization
Move beyond fixed costs to **Value-Based Pricing** by analyzing real-time market signals.

### 🧠 Hyper-Personalization
Shift from generic catalogs to **curated experiences** based on individual user behavior.

### 🛡️ Revenue Protection
Balance competitive discounting with automated **price floors** to ensure sustainable margins.

---

## ⚙️ How It Works

<details>
<summary>Click to expand</summary>

### 🔍 Demand-Sensing Intelligence
- Uses **Gradient Boosting Regressor**
- Analyzes:
  - Traffic spikes
  - Conversion rates
  - Cart-addition ratios  
- Detects "viral" demand and adjusts prices dynamically for maximum profit.

---

### 👤 Behavioral Segmentation
- Performs real-time **RFM (Recency, Frequency, Monetary) analysis**
- Classifies users into:
  - 💎 High Spenders (loyalty-focused)
  - 💸 Low Spenders (price-sensitive)
- Applies **targeted discounts** only where needed.

---

### 🛍️ Discovery Engine
- Uses **Apriori Algorithm**
- Identifies:
  - Frequently Bought Together products
  - Hidden purchase patterns  
- Recommends **Next-Best-Offers** to increase **Average Order Value (AOV)**.

</details>

---

## 📈 Business Impact

<details>
<summary>Click to expand</summary>

### 🏪 For the Seller
- Maximize **inventory turnover**
- Capture **customer willingness to pay**
- Increase revenue during peak demand

---

### 🛒 For the Buyer
- Personalized shopping experience
- Relevant product recommendations
- Smarter and faster discovery

---

### 🌐 For the Platform
- Reduce manual pricing effort
- Enable **autonomous decision-making**
- Improve overall system efficiency

</details>

---

## 🚀 Key Benefits

- 📊 Real-time data-driven decisions  
- 🤖 Fully automated pricing engine  
- 🎯 Precision-targeted marketing  
- 📈 Increased conversion rates & AOV  

---

## ⚙️ 3. FEATURES

* **🔥 Real-time dynamic pricing**: Prices update automatically based on market demand and user interaction.
* **🤖 AI-based recommendations**: Powered by the Apriori algorithm for intelligent, real-time cross-selling.
* **⚡ Fast API backend**: Built on FastAPI for high-performance, asynchronous data processing.
* **🎨 Modern UI**: An interactive, responsive, and visually stunning frontend built with React, Vite, and Tailwind CSS.
* **📊 Behavioral data processing**: Captures user events instantly to inform AI models.
* **🔍 Explainable recommendations**: Transparent rule generation to explain *why* products are recommended together.

---

## 🏗️ 4. TECH STACK

<div align="center">

| **Frontend** 🎨 | **Backend** ⚙️ | **Machine Learning** 🤖 |
|:---:|:---:|:---:|
| React | FastAPI | Apriori Algorithm |
| Vite | Python 3 | Pandas |
| Tailwind CSS | REST APIs | mlxtend |

</div>

---

## 📊 5. SYSTEM ARCHITECTURE

```mermaid
flowchart LR
    A([👤 User]) -->|Interacts| B[🎨 Frontend]
    B -->|Sends Event| C{⚡ Backend API}
    C -->|Processes| D[(🤖 ML Model)]
    D -->|Rule Mining| E[💡 Recommendation]
    E -->|JSON Response| C
    C -->|Renders Data| B
```

---

## 📈 6. WORKFLOW / PIPELINE

1. **👤 User Interaction**: The user clicks on or views a product on the frontend.
2. **📡 Data Capture**: The backend immediately captures this event via REST API.
3. **🧠 AI Processing**: The ML model analyzes current transaction data and user history.
4. **🎯 Generation**: The system evaluates association rules and predicts the best related items.
5. **✨ Real-time Update**: The UI instantly repopulates with perfectly tuned prices and personalized suggestions.

---

## 📸 7. SCREENSHOTS

<div align="center">

### 🛒 Dashboard UI
![Dashboard](./screenshots/dashboard.png)

### 📦 Product View
![Product View](./screenshots/product.png)

### 💡 Recommendations Section
![Recommendations](./screenshots/recommendations.png)

</div>

*Note: Replace placeholders with actual mockups/screenshots before submission.*

---

## 🤖 8. AI MODEL DETAILS

This engine uses the **Apriori Algorithm**, an extensively proven technique for Association Rule Mining.

* **What it is**: It discovers interesting relationships (or "rules") hidden in massive transaction datasets.
* **How it works**: By calculating metrics like *support*, *confidence*, and *lift*, the engine identifies products that are frequently bought together.
* **Example Output**: If a user is viewing an **`iPhone`**, the engine recognizes high confidence that they will also purchase **`AirPods`**, automatically surfacing those products.

---

## 📉 9. PERFORMANCE

```mermaid
graph LR
    A[User Click] -->|~50ms| B[Backend API]
    B -->|~100ms| C[Apriori Model]
    C -->|<10ms| D[Recommendations]
    D -->|~40ms| E[Frontend UI]
```

* **⚡ Ultra-low latency**: Pipeline resolution in **<200ms**.
* **🔄 Real-time adaptation**: Price scaling and behavioral mapping applied instantaneously.
* **🚀 Efficient Compute**: Lean ML processing optimized by Pandas and backend concurrency.

---

## 👨‍💻 10. TEAM MEMBERS

### 👥 Team

* **Ansh** — ML & Backend Integration
* **Het** — Frontend Development
* **Harsh** — API & Backend Logic
* **Anuj** — UI/UX & Testing

---

## 🚀 11. HOW TO RUN

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python run.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔥 12. FUTURE IMPROVEMENTS

* **🧠 Deep Learning Integration**: Upgrade to neural collaborative filtering models for complex sequence prediction.
* **📡 Real-time Data Streaming**: Integrate Apache Kafka for processing millions of user events per second.
* **🎯 Hyper-Personalization**: Add demographic factors, regional clustering, and seasonal trend analytics.

---
<div align="center">
<i>Built with passion for the Hackathon</i> 💡
</div>

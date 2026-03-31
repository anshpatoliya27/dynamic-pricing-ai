import joblib
import numpy as np
import pandas as pd
import os

# =========================
# LOAD DATA (CORRECT PATH)
# =========================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_path = os.path.join(BASE_DIR, "data", "catrecommandprocessed_data.csv")

data = pd.read_csv(data_path)


# =========================
# CATEGORY
# =========================
def recommend_category(category):
    temp = data[data['category_code'] == category]
    temp = temp.sort_values(by='final_score', ascending=False)
    return temp.head(5)


# =========================
# PRODUCT
# =========================
def recommend_product(product_id):
    product = data[data['product_id'] == product_id]

    if product.empty:
        return pd.DataFrame()

    category = product.iloc[0]['category_code']

    temp = data[data['category_code'] == category]
    temp = temp[temp['product_id'] != product_id]
    temp = temp.sort_values(by='final_score', ascending=False)

    return temp.head(5)


# =========================
# EXPLAIN
# =========================
def recommend_explain(product_id):
    product = data[data['product_id'] == product_id]

    if product.empty:
        return {"error": "Product not found"}

    category = product.iloc[0]['category_code']

    return {
        "reason": f"Based on your interest in {category}",
        "products": recommend_product(product_id).to_dict(orient="records")
    }
    
def get_trending_products(top_n=5):
    temp = data.sort_values(by='popularity', ascending=False)

    temp = temp.drop_duplicates(subset=['product_id'])

    return temp.head(top_n)[
        ['product_id', 'category_code', 'brand', 'price', 'final_score']
    ]
 
 
 
model = joblib.load(os.path.join(BASE_DIR,"data", "model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "data", "scaler.pkl"))
features_list = joblib.load(os.path.join(BASE_DIR, "data", "features.pkl"))

agg_df = pd.read_csv(os.path.join(BASE_DIR, "data", "pricing_data.csv"))
raw_events_df = pd.read_csv(os.path.join(BASE_DIR, "data", "Dataset.csv"))

# 🔥 IMPORTANT: Fix datatype mismatch
agg_df['product_id'] = agg_df['product_id'].astype(int)
raw_events_df['product_id'] = raw_events_df['product_id'].astype(int)
raw_events_df['user_id'] = raw_events_df['user_id'].astype(int)


# =========================
# USER CLASSIFICATION
# =========================
def classify_user_dynamically(user_id):

    user_data = raw_events_df[raw_events_df['user_id'] == user_id]

    if user_data.empty:
        return None   # user not found

    user_purchases = user_data[user_data['event_type'] == 'purchase']

    if user_purchases.empty:
        return "low_spender"

    total_spent = user_purchases['price'].sum()
    order_count = len(user_purchases)

    aov = total_spent / order_count

    return "low_spender" if aov < 50 else "high_spender"


# =========================
# CORE PRICING FUNCTION
# =========================
def get_dynamic_price(product_id, user_id):

    # -------- PRODUCT CHECK --------
    product_row = agg_df[agg_df['product_id'] == product_id]

    if product_row.empty:
        return None, "Product not found", None

    row = product_row.iloc[0]
    base_price = row['price']

    # -------- USER CHECK --------
    user_type = classify_user_dynamically(user_id)

    if user_type is None:
        return None, "User not found", None

    # -------- ML PREDICTION --------
    input_data = np.array([[row[f] for f in features_list]])
    input_scaled = scaler.transform(input_data)

    factor = np.expm1(model.predict(input_scaled))[0]
    price = base_price * factor

    # -------- BUSINESS RULES --------
    demand = row['demand']
    reason = "Normal demand"

    if demand > 100:
        price *= 1.1
        reason = "Very high demand"
    elif demand > 50:
        price *= 1.05
        reason = "High demand"
    elif demand < 10:
        price *= 0.9
        reason = "Low demand"

    # -------- USER PERSONALIZATION --------
    if user_type == "low_spender":
        price *= 0.9

    # -------- SAFETY RULE --------
    price = max(price, base_price * 0.7)

    return round(price, 2), reason, user_type
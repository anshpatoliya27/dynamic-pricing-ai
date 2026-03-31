# =========================================
# 1. IMPORT LIBRARIES
# =========================================
import pandas as pd
import numpy as np
import joblib
import os
import warnings

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

warnings.filterwarnings('ignore')

# =========================================
# 2. LOAD DATA
# =========================================
print("🚀 Loading Dataset...")
# Ensure Dataset.csv is in the same directory
if not os.path.exists("Dataset.csv"):
    raise FileNotFoundError("Dataset.csv not found! Please place it in the root folder.")

df = pd.read_csv("Dataset.csv")

# =========================================
# 3. FEATURE ENGINEERING
# =========================================
print("🛠 Performing Feature Engineering...")

# Standardize column types
df['product_id'] = df['product_id'].astype(str)

# Event signals
df['views'] = (df['event_type'] == 'view').astype(int)
df['purchases'] = (df['event_type'] == 'purchase').astype(int)
df['cart'] = (df['event_type'] == 'cart').astype(int)

# Aggregate per product
agg_df = df.groupby('product_id').agg({
    'views': 'sum',
    'purchases': 'sum',
    'cart': 'sum',
    'price': 'mean',
    'category_code': 'first',
    'brand': 'first'
}).reset_index()

# Demand Metrics
agg_df['demand'] = agg_df['views'] + agg_df['purchases'] + agg_df['cart']
agg_df['conversion_rate'] = agg_df['purchases'] / (agg_df['views'] + 1)
agg_df['cart_ratio'] = agg_df['cart'] / (agg_df['views'] + 1)
agg_df['log_demand'] = np.log1p(agg_df['demand'])

# =========================================
# 4. TARGET (PRICE FACTOR)
# =========================================
# Logic: 1.0 is base. Conversion/Cart intent adds premium.
agg_df['price_factor'] = (
    1
    + 0.5 * agg_df['conversion_rate']
    + 0.3 * agg_df['cart_ratio']
)

# Clip to keep price changes realistic (between -30% and +50%)
agg_df['price_factor'] = agg_df['price_factor'].clip(0.7, 1.5)

# Log transform the target for the Regressor
agg_df['target'] = np.log1p(agg_df['price_factor'])

# =========================================
# 5. FEATURES SELECTION
# =========================================
features = [
    'views',
    'purchases',
    'cart',
    'log_demand',
    'conversion_rate',
    'cart_ratio'
]

X = agg_df[features]
y = agg_df['target']

# =========================================
# 6. SPLIT + SCALING
# =========================================
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# =========================================
# 7. MODEL TRAINING
# =========================================
print("🧠 Training Gradient Boosting Regressor...")
model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=4, random_state=42)
model.fit(X_train_scaled, y_train)

# =========================================
# 8. EVALUATION
# =========================================
preds = model.predict(X_test_scaled)
y_test_real = np.expm1(y_test)
preds_real = np.expm1(preds)

print("\n📈 Model Performance (on Price Factor):")
print(f"MAE: {mean_absolute_error(y_test_real, preds_real):.4f}")
print(f"R2 Score: {r2_score(y_test_real, preds_real):.4f}")

# =========================================
# 9. SAVE ARTIFACTS (CRITICAL FOR FLASK)
# =========================================
print("\n💾 Saving Model and Data...")

if not os.path.exists('data'):
    os.makedirs('data')

# Save the trained model
joblib.dump(model, "data/pricing_model.pkl")
# Save the scaler (API needs this to scale new inputs)
joblib.dump(scaler, "data/pricing_scaler.pkl")
# Save the aggregated data so the API knows the "Base Price" and "Demand" per product
agg_df.to_csv("data/pricing_processed_data.csv", index=False)

print("✅ Saved: data/pricing_model.pkl")
print("✅ Saved: data/pricing_scaler.pkl")
print("✅ Saved: data/pricing_processed_data.csv")

# =========================================
# 10. VERIFICATION TEST
# =========================================
def test_output(product_id):
    row = agg_df[agg_df['product_id'] == product_id].iloc[0]
    
    # Feature vector for model
    input_data = np.array([row[features].values])
    input_scaled = scaler.transform(input_data)
    
    # Predicted factor
    predicted_factor = np.expm1(model.predict(input_scaled))[0]
    final_price = row['price'] * predicted_factor
    
    print(f"\nVerification for Product {product_id}:")
    print(f"Base Price: ${row['price']:.2f}")
    print(f"Predicted Factor: {predicted_factor:.2f}x")
    print(f"Dynamic Price: ${final_price:.2f}")

# Run one test
test_output(agg_df['product_id'].iloc[0])
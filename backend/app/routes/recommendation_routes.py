from flask import Blueprint, jsonify, request
from app.services.recommendation_service import (
    recommend_category,      # Matches service function name
    recommend_product,       # Matches service function name
    recommend_explain,       # Matches service function name
    get_trending_products,    # Matches service function name
    get_dynamic_price
)

recommendation_bp = Blueprint("recommendation", __name__)

@recommendation_bp.route("/recommend/category/<category>", methods=["GET"])
def category_api(category):
    result = recommend_category(category) 
    return jsonify(result.to_dict(orient="records"))

@recommendation_bp.route("/recommend/product/<int:product_id>", methods=["GET"])
def product_api(product_id):
    result = recommend_product(product_id)
    return jsonify(result.to_dict(orient="records"))


@recommendation_bp.route("/recommend/explain/<int:product_id>", methods=["GET"])
def explain_api(product_id):
    result = recommend_explain(product_id)
    return jsonify(result)

@recommendation_bp.route("/recommend/trending", methods=["GET"])
def trending_api():
    result = get_trending_products()
    return jsonify(result.to_dict(orient="records"))

# @recommendation_bp.route("/recommend/fbt/<int:product_id>", methods=["GET"])
# def frequently_bought(product_id):
#     result = recommend_frequently_bought(product_id)
#     return jsonify(result.to_dict(orient="records"))

@recommendation_bp.route("/pricing/<int:product_id>", methods=["GET"])
def pricing_api(product_id):

    user_id = request.args.get("user_id", type=int)

    if user_id is None:
        return jsonify({"error": "Missing user_id parameter"}), 400

    final_price, reason, user_type = get_dynamic_price(product_id, user_id)

    if final_price is None:
        if reason == "Product not found":
            return jsonify({"error": "Product not found"}), 404
        elif reason == "User not found":
            return jsonify({"error": "User not found"}), 404

    return jsonify({
        "product_id": product_id,
        "user_id": user_id,
        "user_segment": user_type,
        "suggested_price": final_price,
        "logic": reason
    }), 200
def get_personalized_recommendations(user_id: str):
    """
    Business logic to fetch user-specific recommendations.
    Serves as an abstraction layer over future ML pipelines.
    """
    return [
        {"item_id": "A1", "name": "Premium Tier Subscription", "match_score": 0.95},
        {"item_id": "B2", "name": "Add-on Analytics Pack", "match_score": 0.82}
    ]

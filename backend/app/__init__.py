from flask import Flask
from flask_cors import CORS

def create_app():
    # Flask app initialization 
    app = Flask(__name__)
    
    # Enable CORS for cross-origin frontend-backend communication
    CORS(app)
    
    # Register Blueprints (Routes) to separate logical parts
    from .routes.pricing import pricing_bp
    from .routes.recommendation import recommendation_bp
    
    # Use API Versioning
    app.register_blueprint(pricing_bp, url_prefix='/api/v1/pricing')
    app.register_blueprint(recommendation_bp, url_prefix='/api/v1/recommendations')
    
    # General health check endpoint
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'message': 'API is running'}
        
    return app

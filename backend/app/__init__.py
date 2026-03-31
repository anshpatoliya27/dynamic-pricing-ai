from flask import Flask
from app.routes.recommendation_routes import recommendation_bp

def create_app():
    app = Flask(__name__)

    app.register_blueprint(recommendation_bp)

    return app
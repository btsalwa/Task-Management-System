from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import Config
from flask_cors import CORS

db = SQLAlchemy()

def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)
    db.init_app(app)

    with app.app_context():
        from app import routes, models
        db.create_all()

    return app
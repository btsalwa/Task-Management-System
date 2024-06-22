import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    ENVIRONMENT = os.getenv('APP_ENV', 'development')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

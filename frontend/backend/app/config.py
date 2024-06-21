import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL','default_url')
    ENVIRONMENT = os.getenv('APP_ENV', 'development')
    SECRET_KEY = 'bY\xf1Xz\x00\xad|eQ\x80t\xca\x1a\x10K'
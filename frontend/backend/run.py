from flask import current_app
from app import create_app, db
from app.models import User, Task, Review
from app.config import Config
import os

app = create_app(Config)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
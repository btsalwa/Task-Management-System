from app import app
from models import db, User, Task
from datetime import datetime

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()

        user1 = User(name="Michael J. Fox", email="michael@gmail.com", phone="0724508205")
        user2 = User(name="Jane Doe", email="jane@example.com", phone="0712345678")
        
        db.session.add_all([user1, user2])
        db.session.commit()

        task1 = Task(
            title="Task 1", 
            description="Assignments", 
            start_date=datetime.strptime("2024-06-18", "%Y-%m-%d"), 
            end_date=datetime.strptime("2024-06-19", "%Y-%m-%d")
        )
        task2 = Task(
            title="Task 2", 
            description="Final Project ", 
            start_date=datetime.strptime("2024-06-20", "%Y-%m-%d"), 
            end_date=datetime.strptime("2024-06-21", "%Y-%m-%d")
        )

        db.session.add_all([task1, task2])
        db.session.commit()
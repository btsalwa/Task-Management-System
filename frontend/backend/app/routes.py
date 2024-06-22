from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, session, make_response, jsonify, current_app as app
from app import db
from app.models import User, Task, Review

@app.route('/api/users', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        users = User.query.all()
        users_data = [user.to_dict() for user in users]
        return jsonify({
            "status": "success",
            "message": "Retrieve users successfully",
            "data": users_data
        }), 200
        
    elif request.method == 'POST':
        data = request.get_json()
        hashed_password = generate_password_hash(data['password'], method='scrypt', salt_length=16)
        
        user = User(
            firstName=data['firstName'],
            lastName=data['lastName'],
            userName=data['userName'],
            phone=data['phone'],
            email=data['email'],
            password=hashed_password
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "User created successfully",
            "data": user.to_dict()
        }), 201

@app.route('/user/<id>', methods=['GET', 'DELETE'])
def user(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404

    if request.method == 'GET':
        return jsonify({
            "status": "success",
            "message": "Retrieve user successfully",
            "data": user.to_dict()
        }), 200

    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({"status": "success", "message": "User deleted successfully"}), 200

@app.route('/api/login', methods=['POST'])
def check_password():
    data = request.get_json()
    user = User.query.filter(User.userName == data['userName']).first()
    
    if user and check_password_hash(user.password, data['password']):
        user_dict = user.to_dict()
        session['user_id'] = user_dict['id']
        current_user = {key: value for key, value in user_dict.items() if key != 'password'}
        return jsonify({
            "status": "success",
            "message": "Successfully logged in",
            "current_user": current_user
        }), 200
    else:
        return jsonify({"status": "error", "message": "Invalid username or password"}), 401

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        tasks = Task.query.all()
        tasks_data = [task.to_dict() for task in tasks]
        return jsonify({
            "status": "success",
            "message": "Retrieve tasks successfully",
            "data": tasks_data
        }), 200

    elif request.method == 'POST':
        data = request.get_json()
        new_task = Task(
            title=data.get('title'),
            description=data.get('description'),
            start_date=data.get('start_date'),
            end_date=data.get('end_date'),
            status=data.get('status', 'incomplete'), 
            user_id=data.get('user_id')
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.to_dict()), 201

@app.route('/reviews', methods=['GET', 'POST'])
def reviews():
    if request.method == 'GET':
        reviews = Review.query.all()
        reviews_data = [review.to_dict() for review in reviews]
        return jsonify({
            "status": "success",
            "message": "Retrieve reviews successfully",
            "data": reviews_data
        }), 200

    elif request.method == 'POST':
        data = request.get_json()
        new_review = Review(
            content=data.get('content'),
            rating=data.get('rating'),
            task_id=data.get('task_id')
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict()), 201

@app.route('/reviews/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({"status": "error", "message": "Review not found"}), 404

    if request.method == 'GET':
        return jsonify({
            "status": "success",
            "message": "Retrieve review successfully",
            "data": review.to_dict()
        }), 200

    elif request.method == 'PUT':
        data = request.get_json()
        review.content = data.get('content', review.content)
        review.rating = data.get('rating', review.rating)
        db.session.commit()
        return jsonify({
            "status": "success",
            "message": "Review updated successfully",
            "data": review.to_dict()
        }), 200

    elif request.method == 'DELETE':
        db.session.delete(review)
        db.session.commit()
        return jsonify({"status": "success", "message": "Review deleted successfully"}), 200

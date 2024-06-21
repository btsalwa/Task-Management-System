from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, session, jsonify, current_app as app
from app import db
from app.models import User, Task

@app.route('/api/users', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        users = User.query.all()
        users_data = [user.to_dict() for user in users]
        return jsonify({
            "status": "success",
            "message": "Retrive users successfully",
            "data" : users_data
        }), 200
        
    elif request.method == 'POST':
        data = request.get_json()
        print(data)
        hashed_password = generate_password_hash(data['password'], method='scrypt', salt_length=16)
        
        firstName=data['firstName'],
        lastName=data['lastName'],
        userName=data['userName'],
        phone=data['phone'],
        email=data['email'],
        password = hashed_password
        

        user = User(
            firstName = firstName,
            lastName = lastName,
            userName = userName,
            phone = phone,
            email = email,
            password = password
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "User successfully",
            "data" : user.to_dict()
        }), 201

@app.route('/user/<id>', methods=['GET', 'DELETE'])
def user(id):
    user = User.query.filter_by(id=id).first()
    if request.method == 'GET':
        print(user)
        return jsonify({
            "status": "success",
            "message": "Retrive users successfully",
            "data" : user
        }), 201

@app.route('/api/login', methods = ['POST'])
def check_password():
    user = User.query.filter(User.userName == request.get_json()['userName']).first()
    is_correct = check_password_hash(user.password, request.get_json()['password'])

    if is_correct:
        user_dict = user.to_dict()
        session['user_id'] = user_dict['id']
        current_user = {key: value for key, value in user_dict.items() if key != 'password'}
        return jsonify({
            "status": "success",
            "message": "successfully logged in",
            "current_user" : current_user
        }), 200
        
    else:
        return jsonify({
            "status": "error",
            "message": "Invalid password"
        }), 401

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        tasks_to_dict = []
        tasks = Task.query.all()
        tasks_data = [task.to_dict() for task in tasks]
        return jsonify({
            "status": "success",
            "message": "Retrive tasks successfully",
            "data" : tasks_data
        }), 201

    if request.method == 'POST':
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
        response = make_response(
            jsonify({
                'id': new_task.id,
                'title': new_task.title,
                'description': new_task.description,
                'start_date': new_task.start_date,
                'end_date': new_task.end_date,
                'status': new_task.status,
                'user_id': new_task.user_id
            }),
            201,
        )


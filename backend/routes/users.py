from flask import Blueprint, jsonify, request, redirect, url_for, session
from backend.models.user import User
from backend.__init__ import db


users = Blueprint('users', __name__)


@users.post("/create-account", strict_slashes=False)
def create_account():
    """
    create a user to the database
    json expects name, email, password, pic_url. The fields below are compulsory
    [name || email || password]
    """
    data = request.json
    if 'name' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Mising data [name || email || password]'}), 403
    
    name = data.get('name').lower()
    email = data.get('email').lower()
    password = data.get('password')
    pic_url = data.get('pic_url')


    if not name or not email or not password:
        return jsonify({'error': 'Mising data [name || email || password]'}), 403

    usr = db.session.query(User).filter_by(email=email).first()
    if usr:
        return jsonify({'error': 'User exists!'}), 403

    user = User(name, email, password, pic_url)

    db.session.add(user)
    db.session.commit()

    return jsonify({'user': {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role,
        'pic_url': user.pic_url
    }})




@users.get('/profile', strict_slashes=False)
def profile_page():
    if 'user' in session:
        return jsonify({'msg': f"Welcome {session['user']['name']}"})
    else:
        return jsonify({'msg': 'not logged in'})



@users.post('/login', strict_slashes=False)
def login():
    if not session.get('user'):
        data = request.json
        email = data.get('email')
        password = data.get('password')

        obj = db.session.query(User).filter_by(email=email).first()
        if not obj or obj.password != password:
            return jsonify({'error': 'Invalid credential'}), 401
        
        session['user'] = \
            {
            'name': obj.name,
            'role': obj.role
            }   

        return jsonify({"msg": "Logged in successfully"})
    else:
        return jsonify({"error": "User already logged in"}), 400



@users.get('/logout', strict_slashes=False)
def logout():
    if session.get('user'):
        del session['user']
        return jsonify({'msg': 'logged out!'})
    else:
        return jsonify({"error": "no user logged in"})

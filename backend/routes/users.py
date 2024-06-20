from flask import Blueprint, jsonify, request
from models.user import User
from __init__ import db


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
    return jsonify({'msg': 'profile page'})

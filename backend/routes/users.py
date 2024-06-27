from flask import Blueprint, jsonify, request, session
from backend.models.user import User, TokenBlockList
from backend.__init__ import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt

users = Blueprint('users', __name__)


@users.post("/register", strict_slashes=False)
def register_user():
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
    
    # hash password before creating a user object
    hashedPass = generate_password_hash(password)

    user = User(name, email, hashedPass, pic_url)

    db.session.add(user)
    db.session.commit()

    return jsonify({'user': {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role,
        'pic_url': user.pic_url
    }})




# @users.get('/profile', strict_slashes=False)
# def profile_page():
#     if 'user' in session:
#         return jsonify({'msg': f"Welcome {session['user']['name']}"})
#     else:
#         return jsonify({'msg': 'not logged in'})



# @users.post('/login', strict_slashes=False)
# def login():
#     if not session.get('user'):
#         data = request.json
#         email = data.get('email')
#         password = data.get('password')

#         obj = db.session.query(User).filter_by(email=email).first()
#         # if not obj or obj.password != password:
#         if not obj or not check_password_hash(obj.password, password):
#             return jsonify({'error': 'Invalid credential'}), 401
        
#         session['user'] = \
#             {
#             'name': obj.name,
#             'role': obj.role
#             }   

#         return jsonify({"msg": "Logged in successfully"})
#     else:
#         return jsonify({"error": "User already logged in"}), 400



@users.post('/login', strict_slashes=False)
def login():
    """login endpoint"""
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = db.session.query(User).filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid credential', 'status':401}), 401
    
    identity_obj = {
        'id': user.id,
        'name': user.name,
        'role': user.role
    }
    
    access = create_access_token(identity=identity_obj)
    refresh = create_refresh_token(identity=identity_obj)
    
    return jsonify(
        {
            "status": 200,
            "msg": "Logged in successfully",
            "tokens": {
                "access": access,
                "refresh": refresh
            }
        }
    )



@users.get('/profile', strict_slashes=False)
@jwt_required()
def profile_page():
    claims = get_jwt()
    # print(request.authorization.token)
    return jsonify({"msg": f"Welcome {claims['sub']['name']}"})


# @users.get('/logout', strict_slashes=False)
# @jwt_required()
# def logout():
#     request.authorization
#     if session.get('user'):
#         del session['user']
#         return jsonify({'msg': 'logged out!'})
#     else:
#         return jsonify({"error": "no user logged in"})


@users.get('/logout', strict_slashes=False)
@jwt_required()
def logout():
    jwt = get_jwt()
    jti = jwt['jti']

    token = TokenBlockList(jti=jti)

    db.session.add(token)
    db.session.commit()

    return jsonify({'msg': 'User logged out successfully!'})

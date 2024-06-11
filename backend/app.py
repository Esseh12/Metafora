from models.company import Company
from models.park import Park
from models.user import User
from models.route import Route
from models.base_model import Base
from flask import Flask, jsonify, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite"

db = SQLAlchemy(app, model_class=Base)



with app.app_context():
    db.create_all()


@app.route("/")
def index():
    # __init__(self, name: str, email: str, tagline: str, description: str, display_pic_url: str) -> None:
    dt = db.session.query(Company).all()
    # print(dt)
    if dt:
        lis = [obj.to_dict() for obj in dt]
        # print(lis)

        return jsonify({'msg': "lis"})
    return jsonify({'msg': "wellcome"})

@app.route('/add-company', methods=['POST'], strict_slashes=False)
def add_company():
    data = request.json
    name = data['name']
    email = data['email']
    tagline = data['tagline']
    description = data['description']
    pic_url = data['pic_url']

    
    comp = Company(name, email, tagline, description, display_pic_url=pic_url)

    db.session.add(comp)
    db.session.commit()

    print(data)
    return jsonify({"msg": "Company created"})
    ...


if __name__ == "__main__":
    # db.create_all()
    app.run("0.0.0.0", 5000)

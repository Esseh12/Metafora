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
    comps = db.session.query(Company).all()
    parks = db.session.query(Park).all()

    all_ccomp = [obj.to_dict() for obj in comps]
    all_parks = [obj.to_dict() for obj in parks]
    res = {
        'companies': all_ccomp,
        'parks': all_parks
    }
    return jsonify({'data': res})

@app.route('/add-company', methods=['POST'], strict_slashes=False)
def add_company():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    tagline = data.get('tagline', 'no tagline')
    description = data.get('description', 'no discription')
    pic_url = data.get('pic_url','nopic')

    
    comp = Company(name, email, tagline, description, display_pic_url=pic_url)

    db.session.add(comp)
    db.session.commit()

    return jsonify({"msg": "Company created"}), 201

@app.post('/add-park', strict_slashes=False)
def add_park():
    data = request.json
    name = data.get('name', 'no name')
    state = data.get('state', 'no state')
    city = data.get('city', 'no city')
    area = data.get('area', 'no area')
    address = data.get('address', 'no address')
    company_id = data.get('company_id', 'no company_id')

    park = Park(name, state, city, area, address,company_id)
    db.session.add(park)
    db.session.commit()
    return jsonify({"msg": "Park created"}), 201


if __name__ == "__main__":
    app.run("0.0.0.0", 5000)

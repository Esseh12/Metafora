from models.company import Company
from models.park import Park
from models.user import User
from models.route import Route
from models.base_model import Base
from flask import Flask, jsonify, request, redirect
from flask_sqlalchemy import SQLAlchemy
from markupsafe import escape


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite"

db = SQLAlchemy(app, model_class=Base)


with app.app_context():
    db.create_all()


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": str(error)}), 404


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


@app.get('/companies', strict_slashes=False)
def get_all_companies():
    companies = db.session.query(Company).all()
    serializable_companies = [company.to_dict() for company in companies]
    data = {"companies": serializable_companies}
    response = jsonify({"data": data})
    return response


@app.get('/company/<id>', strict_slashes=False)
def get_company(id):
    company = db.session.query(Company).get(escape(id))
    if company:            
        serializable_company = company.to_dict()

        if company.parks:
            parks = [cp.to_dict() for cp in company.parks]
            serializable_company.update({"parks" : parks})

        return jsonify({"data": serializable_company})
    else:
        return jsonify({"msg": "Company Not Found"}), 404


@app.post('/companies', strict_slashes=False)
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

    new_comp = db.session.query(Company).get(comp.id).to_dict()   
    return jsonify(new_comp), 201

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


@app.route('/parks/<park_id>', methods=['GET'], strict_slashes=False)
def get_park(park_id):
    obj = db.session.query(Park).get(escape(park_id))
    if obj:
        new_obj  = obj.to_dict()
        new_obj.update({"company" : obj.company.to_dict()})
        data = {
            "Park" : new_obj
        }

        return jsonify({"data": data})
    return jsonify({"msg": 'not found'}), 404


@app.post('/add-route', strict_slashes=False)
def add_route():
    data = request.json

    name = data.get('name')
    from_park_id = data.get('from_park_id')
    to_park_id = data.get('to_park_id')
    price = data.get('price')
    time = data.get('time')
    company_id = data.get('company_id')

    if not from_park_id or not to_park_id or not time or not company_id:
        return jsonify({"msg": "missing data [name, from_park_id, to_park_id, time or company_id]"}), 400
    
    if time not in ["morning", "noon", "night"]:
        return jsonify({"msg": "time must be morning || noon || night"}), 400
        
    route = Route(name, from_park_id, to_park_id, price, time, company_id)
    db.session.add(route)
    db.session.commit()
    return jsonify({"msg": "Route created"}), 201


if __name__ == "__main__":
    app.run("0.0.0.0", 5000)

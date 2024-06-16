from models.company import Company
from models.park import Park
from models.user import User
from models.journey import Journey
from models.base_model import Base
from flask import Flask, jsonify, request, redirect
from flask_sqlalchemy import SQLAlchemy
from markupsafe import escape
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_, and_


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db2.sqlite"

db = SQLAlchemy(app, model_class=Base)


with app.app_context():
    db.create_all()




@app.errorhandler(404)
def not_found(error):
    """This Handles any 404 error"""
    return jsonify({"error": str(error.name)}), 404




@app.route("/")
def index():
    """
    This returns all companies, parks and journeys
    """
    companies = db.session.query(Company).all()
    parks = db.session.query(Park).all()
    journeys = db.session.query(Journey).all()

    all_comps = [obj.to_dict() for obj in companies]
    all_parks = [obj.to_dict() for obj in parks]
    all_journeys = [obj.to_dict() for obj in journeys]
    res = {
        'companies': all_comps,
        'parks': all_parks,
        'journeys': all_journeys
    }
    return jsonify({'data': res})


@app.get('/companies', strict_slashes=False)
def get_all_companies():
    """
    this returns companies in our database
    """
    companies = db.session.query(Company).all()
    serializable_companies = [company.to_dict() for company in companies]
    data = {"companies": serializable_companies}
    response = jsonify({"data": data})
    return response


@app.get('/company/<id>', strict_slashes=False)
def get_company(id):
    """
    this returns a company
        - all information about a company
        and the parks associated with the company
    """
    company = db.session.get(Company, escape(id))
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
    """
    the endpoint to add a company
    the json expects the following args:
        name, email, tagline, description, pic_url
        whereby name and email are compulsory
    """
    data = request.json

    name = data.get('name')
    email = data.get('email')
    tagline = data.get('tagline', 'no tagline')
    description = data.get('description', 'no discription')
    pic_url = data.get('pic_url','no pic')

    if not name or not email:
        return jsonify({"error": "Missing data [name || email]"}), 400
    
    try:
        comp = Company(name, email, tagline, description, display_pic_url=pic_url)
        db.session.add(comp)
        db.session.commit()
    except IntegrityError:
        return jsonify({"error": "email exists"}), 400

    new_comp = db.session.get(Company, comp.id).to_dict() 
    return jsonify({"data": new_comp}), 201

@app.post('/add-park', strict_slashes=False)
def add_park():
    """
    the endpoint to add a park
    the json expects the following args:
        name, state, lga(local gov area), town, address, company_id
        whereby [name, state, lga, address] are compulsory
    """
    data = request.json

    name = data.get('name')
    state = data.get('state')
    lga = data.get('lga')
    town = data.get('town', None)
    address = data.get('address')
    company_id = data.get('company_id', None)

    if not name or not state or not lga or not address:
        return jsonify({"error": "Missing data [name, state, lga, address]"}), 400

    park = Park(name, state, lga, town, address, company_id)

    db.session.add(park)
    db.session.commit()

    new_park = db.session.get(Park, park.id).to_dict() 
    return jsonify({"data": new_park}), 201


@app.get('/parks/<park_id>', strict_slashes=False)
def get_park(park_id):
    """
    returns a park
    """
    obj = db.session.get(Park, escape(park_id))
    if obj:
        new_obj  = obj.to_dict()
        new_obj.update({"company" : obj.company.to_dict()})
        data = {
            "Park" : new_obj
        }

        return jsonify({"data": data})
    return jsonify({"error": 'Not found'}), 404


@app.post('/add-journey', strict_slashes=False)
def add_journey():
    """
    the endpoint to add a journey
    the json expects the following args:
        name, from_park_id, to_park_id, price, time (morning || noon || night), company_id
        whereby [name, from_park_id, to_park_id, time, company_id] are compulsory
    """
    data = request.json

    name = data.get('name')
    from_park_id = data.get('from_park_id')
    to_park_id = data.get('to_park_id')
    price = data.get('price', 0)
    time = data.get('time')
    company_id = data.get('company_id')


    if not name or not from_park_id or not to_park_id or not time or not company_id:
        return jsonify({"msg": "missing data [name, from_park_id, to_park_id, time, company_id]"}), 400

    if time not in ["morning", "noon", "night"]:
        return jsonify({"msg": "time must be morning || noon || night"}), 400

    journey = Journey(name, from_park_id, to_park_id, price, time, company_id)

    db.session.add(journey)
    db.session.commit()

    new_journey = db.session.get(Journey, journey.id).to_dict()
    return jsonify({"data": new_journey}), 201

@app.get("/journey/<journey_id>")
def get_journey(journey_id):
    """
    returs all details about a journey
    """
    journey = db.session.get(Journey, escape(journey_id))
    if journey:
        response = journey.to_dict()
        return jsonify({"data": response})
    else:
        return jsonify({"msg": "Journey Not Found"}), 404


@app.get("/journeys_search")
def get_journeys_based_on_query():
    """
    returns all journeys that meet the search criteria
    json expects [from_state, from_lga, from_town, to_state]
    where only [from_state, to_state] are compulsory
    """
    data = request.json

    from_state = data.get('from_state')
    from_lga = data.get('from_lga', 'nothing')
    from_town = data.get('from_town', 'nothing')
    to_state = data.get('to_state')

    if not from_state or not to_state:
        return jsonify({"error": "Missing data [from_state, to_state]"}), 400
    

    journeys = db.session.query(Journey).join(Park, Journey.from_park_id == Park.id).filter(
        or_(
            and_(
                Journey.from_park.has(Park.town == from_town.lower()),
                Journey.to_park.has(Park.state == to_state.lower())
            ),
            and_(
                Journey.from_park.has(Park.lga == from_lga.lower()),
                Journey.to_park.has(Park.state == to_state.lower())
            ),
            and_(
                Journey.from_park.has(Park.state == from_state.lower()),
                Journey.to_park.has(Park.state == to_state.lower())
            )
        )
    ).all()
    if not journeys:
        return {"msg": "No journey for your current location at the moment"}

    all_journs = []

    for journey in journeys:
        journ_dict = journey.to_dict()
        park_obj = {
            'from': {
                'park_id': journey.from_park_id,
                'address': journey.from_park.address,
                'name': journey.from_park.name,
                'lga': journey.from_park.lga,
                'town': journey.from_park.town
            },
            'to': {
                'park_id': journey.to_park_id,
                'address': journey.to_park.address,
                'name': journey.to_park.name,
                'lga': journey.to_park.lga,
                'town': journey.to_park.town
            }
        }

        journ_dict['parks_info'] = park_obj
        del journ_dict['from_park_id']
        del journ_dict['to_park_id']

        comp_obj = {
            'name': journey.company.name,
            'id': journey.company_id
        }
        journ_dict['company_info'] = comp_obj
        del journ_dict['company_id']

        all_journs.append(journ_dict)
        
    return jsonify({"data": all_journs})


if __name__ == "__main__":
    app.run("0.0.0.0", 5000)
